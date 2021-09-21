import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { Button } from '@material-ui/core';
import { createControl } from '../provider';
import { BaseComponent } from '../../base/base/base';
import { NotImplementedError } from '../../../core/exceptions';
import './base.css'


export class FormBase extends BaseComponent {

    _callService(values) {
        throw new NotImplementedError();
    }

    _getFilledValues(values) {
        let result = {};
        for (const [key, value] of Object.entries(values)) {
            if (value !== '') {
                result[key] = value;
            }
        }
        return result;
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
                initialValues={this._getInitialValues(this.props.initialValues)}
                validate={values => {
                    return {};
                }}
                enableReinitialize={true}
                onSubmit={(values, {setSubmitting}) => {
                    values = this._getFilledValues(values);
                    setSubmitting(false);
                    return this._callService(values);
                }}
            >
                {(props) => (
                    <Form onSubmit={props.handleSubmit}>
                        {
                            this.props.dataFields.map(info => {
                                return (
                                    <>
                                        {
                                            createControl(info, props.values[info.field],
                                                props.handleChange,
                                                props.touched[info.field] &&
                                                Boolean(props.errors[info.field]),
                                                props.touched[info.field] && props.errors[info.field],
                                                props.isSubmitting)
                                        }
                                        <ErrorMessage name={info.field}/>
                                    </>
                                )
                            })
                        }
                        <Button
                            className='save-button'
                            variant='contained'
                            color='primary'
                            type='submit'
                            disabled={props.isSubmitting}
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
