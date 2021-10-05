import React from 'react';
import { Formik, Form } from 'formik';
import { Button } from '@material-ui/core';
import { Stack } from '@mui/material';
import { createControl } from '../controls/inputs/provider';
import { BaseComponent } from '../base/base/base';
import { getValidator } from '../../validators/provider';
import { NotImplementedError } from '../../core/exceptions';
import { getListPage } from '../../services/url';
import { AlertSeverityEnum } from '../../core/enumerations';
import { DELETE_BUTTON_COLOR, DELETE_TEXT_COLOR } from '../controls/inputs/globals/constants';
import { ServerFormFieldTypeEnum } from '../controls/inputs/globals/enumerations';
import { fillWithDate, getDateTimeString, getTimeString, isValidDate } from '../../core/datetime';
import { delete_ } from '../../services/data';
import { setGlobalState } from '../../core/state';
import { JSTypeEnum } from '../../validators/enumerations';
import './base.css';


export class FormBase extends BaseComponent {

    FOR_UPDATE = false;
    CHECKBOX_DEFAULT = false;

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
        if (typeof oldValue === JSTypeEnum.NUMBER && typeof value === JSTypeEnum.STRING) {
            return oldValue.toString() !== value;
        }
        return oldValue !== value;
    }

    _isNull(value) {
        return value === null || value === undefined;
    }

    _isNullOrEmpty(value) {
        return this._isNull(value) || this._isEmpty(value);
    }

    _getFixedValue(value, form_field_type) {
        if (form_field_type === ServerFormFieldTypeEnum.DATETIME &&
            typeof value === JSTypeEnum.STRING && !this._isNullOrEmpty(value)) {
            let datetime = new Date(value);
            if (isValidDate(datetime)) {
                return getDateTimeString(datetime);
            }
        }
        else if (form_field_type === ServerFormFieldTypeEnum.TIME &&
            typeof value === JSTypeEnum.STRING && !this._isNullOrEmpty(value)) {
            let datetime = fillWithDate(value);
            if (isValidDate(new Date(datetime))) {
                return datetime;
            }
        }
        return value;
    }

    _getFilledValues(values) {
        let result = {};
        for (const [name, value] of Object.entries(values)) {
            let info = this.props.dataFieldsDict[name];
            if (!this._isEmpty(value) &&
                !this._isReadOnly(name) && this._isDirty(name, value)) {
                if (info && info.form_field_type === ServerFormFieldTypeEnum.TIME) {
                    if (!this._isNull(value)) {
                        result[name] = getTimeString(new Date(value));
                    }
                }
                else if (info && (info.form_field_type === ServerFormFieldTypeEnum.DATETIME ||
                    info.form_field_type === ServerFormFieldTypeEnum.DATE)) {
                    if (!this._isNull(value)) {
                        result[name] = value;
                    }
                }
                else {
                    result[name] = value;
                }
            }
        }
        return result;
    }

    _isAnythingChanged(values) {
        return Object.keys(values).length > 0;
    }

    _getInitialValues(initialValues) {
        for (const [name, value] of Object.entries(initialValues)) {
            let info = this.props.dataFieldsDict[name]
            let fixedValue = value;
            if (info) {
                fixedValue = this._getFixedValue(value, info.form_field_type);
            }

            if (info && info.form_field_type === ServerFormFieldTypeEnum.BOOLEAN &&
                this._isNullOrEmpty(fixedValue)) {
                initialValues[name] = this.CHECKBOX_DEFAULT;
            }
            else if (this._isNull(fixedValue)) {
                initialValues[name] = '';
            }
            else {
                initialValues[name] = fixedValue;
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
                    if(Object.keys(result).length > 0) {
                        this._setToastNotification('Please correct the specified values.',
                            AlertSeverityEnum.ERROR);
                    }
                    return result;
                }}
                enableReinitialize={false}
                validateOnChange={false}
                validateOnBlur={false}
                validateOnMount={false}
                onSubmit={(values, {setSubmitting, setFieldError}) => {
                    values = this._getFilledValues(values);
                    if (!this._isAnythingChanged(values)) {
                        setSubmitting(false);
                        this._setToastNotification('No changes have been made.', AlertSeverityEnum.INFO);
                        return;
                    }
                    let result = this._callService(values);
                    setSubmitting(false);
                    result.then(([json, ok]) => {
                        if (ok) {
                            let message = null;
                            if (this.FOR_UPDATE) {
                                message = `${this.props.name} [${this.props.pk}] has been updated successfully.`;
                            }
                            else {
                                message = `A new ${this.props.name} has been added successfully.`;
                            }
                            let key = setGlobalState(message);
                            this.props.history.push(getListPage(this.props.registerName, key));
                        }
                        else {
                            if (json.data && Object.keys(json.data).length > 0) {
                                for (const [name, message] of Object.entries(json.data)) {
                                    setFieldError(name, message);
                                }
                                this._setToastNotification('Please correct the specified values.',
                                    AlertSeverityEnum.ERROR);
                            }
                            else {
                                this._setToastNotification(json, AlertSeverityEnum.ERROR);
                            }
                        }
                    });
                }}
            >
                {(props) => (
                    <Form onSubmit={props.handleSubmit}>
                        <div className='form-controls-container'>
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
                                                this.FOR_UPDATE, props.setFieldValue)
                                        }
                                    </div>
                                )
                            })
                        }
                        </div>
                        <Stack direction='row' spacing={2} className='button-container'>
                            {
                                this.FOR_UPDATE && this.props.hasDeletePermission && (
                                    <Button
                                        className='button'
                                        style={{backgroundColor: DELETE_BUTTON_COLOR, color: DELETE_TEXT_COLOR}}
                                        variant='contained'
                                        type='button'
                                        onClick={() => {
                                            this._setConfirmDeleteDialog(
                                                `Delete ${this.props.name} with primary key [${this.props.pk}]?`,
                                                () => {
                                                    let result = delete_(this.props.registerName, this.props.pk);
                                                    result.then(([json, ok]) => {
                                                        if (ok) {
                                                            let key =
                                                                setGlobalState(
                                                                    `${this.props.name} [${this.props.pk}] has been deleted successfully.`);
                                                            this.props.history.replace(
                                                                getListPage(this.props.registerName, key),
                                                                this.props.location.pathname);
                                                        }
                                                        else {
                                                            this._setToastNotification(json, AlertSeverityEnum.ERROR);
                                                        }
                                                    });
                                                });
                                        }}
                                        disabled={props.isSubmitting || !this.props.hasDeletePermission}
                                        size='large'>
                                        Delete
                                    </Button>
                                )
                            }
                            <Button
                                className='button'
                                variant='contained'
                                color='primary'
                                type='submit'
                                disabled={props.isSubmitting || !this.props.hasSavePermission}
                                size='large'>
                                Save
                            </Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        )
    }
}
