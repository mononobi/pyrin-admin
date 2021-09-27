import React from 'react';
import { Formik, Form } from 'formik';
import { Button } from '@material-ui/core';
import { createControl } from '../controls/provider';
import { BaseComponent } from '../base/base/base';
import { getValidator } from '../../validators/provider';
import { NotImplementedError } from '../../core/exceptions';
import { getListPage } from '../../services/url';
import { TargetEnum } from '../../core/enumerations';
import './base.css'


export class FormBase extends BaseComponent {

    FOR_UPDATE = false;

    state = {
        initialValues: this._getInitialValues(this.props.initialValues)
    }

    _callService(values) {
        throw new NotImplementedError();
    }

    _isReadOnly(name) {
        let info = this.props.dataFieldsDict[name];
        return info.read_only;
    }

    _isEmpty(value) {
        return value === '' || value === '""' || value === "''";
    }

    _isDirty(name, value) {
        if (!this.FOR_UPDATE) {
            return true;
        }
        let oldValue = this.state.initialValues[name];
        return oldValue !== value;
    }

    _getFilledValues(values) {
        let result = {};
        for (const [name, value] of Object.entries(values)) {
            if (!this._isEmpty(value) && !this._isReadOnly(name) &&
                this._isDirty(name, value)) {
                result[name] = value;
            }
        }
        return result;
    }

    _isAnythingChanged(values) {
        return Object.keys(values).length > 0;
    }

    _getInitialValues(initialValues) {
        for (const [key, value] of Object.entries(initialValues)) {
            if (value === null || value === undefined) {
                initialValues[key] = '';
            }
        }
        return initialValues;
    }

    _render() {
        return (
            <Formik
                initialValues={this.state.initialValues}
                validate={values => {
                    let result = {};
                    for (const [name, value] of Object.entries(values)) {
                        let info = this.props.dataFieldsDict[name];
                        if (info) {
                            let error = null;
                            let validator = getValidator(info, this.FOR_UPDATE);
                            if (validator) {
                                error = validator.validate(value);
                            }
                            if (error) {
                                result[name] = error;
                            }
                        }
                    }
                    return result;
                }}
                enableReinitialize={true}
                onSubmit={(values, {setSubmitting, setFieldError, resetForm}) => {
                    this._removeAlerts();
                    values = this._getFilledValues(values);
                    if (!this._isAnythingChanged(values)) {
                        this.setState({
                            info: 'No changes have been made.'
                        })
                        setSubmitting(false);
                        return;
                    }
                    let result = this._callService(values);
                    result.then(([json, ok]) => {
                        if (ok) {
                            window.open(getListPage(this.props.register_name), TargetEnum.SAME_TAB);
                            return null;
                        }
                        else {
                            if (json.data && Object.keys(json.data).length > 0) {
                                for (const [name, message] of Object.entries(json.data)) {
                                    setFieldError(name, message);
                                }
                            }
                            else {
                                this.setState({
                                    error: json
                                })
                            }
                        }
                    })
                    setSubmitting(false);
                }}
            >
                {(props) => (
                    <Form onSubmit={props.handleSubmit}>
                        {
                            this.props.dataFields.map(info => {
                                return (
                                    <div key={`${info.field}-form-field`}>
                                        {
                                            createControl(
                                                info,
                                                props.values[info.field],
                                                props.handleChange,
                                                props.touched[info.field] && Boolean(props.errors[info.field]),
                                                props.touched[info.field] && props.errors[info.field],
                                                props.isSubmitting || !this.props.hasSavePermission,
                                                this.FOR_UPDATE)
                                        }
                                    </div>
                                )
                            })
                        }
                        <Button
                            className='save-button'
                            variant='contained'
                            color='primary'
                            type='submit'
                            disabled={props.isSubmitting || !this.props.hasSavePermission}
                            size='large'
                        >
                            Save
                        </Button>
                    </Form>
                )}
            </Formik>
        )
    }
}
