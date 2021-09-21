import React from "react";
import { Formik, Form, ErrorMessage } from 'formik';
import { Button } from '@material-ui/core';
import { createControl } from '../provider';
import { BaseComponent } from '../../base/base/base';
import './base.css'


export class FormBase extends BaseComponent {

    _render() {
        return (
            <Formik
                initialValues={this.props.initialValues}
                validate={values => {
                    return {};
                }}
                enableReinitialize={true}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        setSubmitting(false);
                        alert(JSON.stringify(values, null, 2));
                    }, 200);
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
