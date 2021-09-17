import React from 'react';
import 'date-fns';
import {
    MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardDateTimePicker, KeyboardTimePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { BaseComponent } from '../../base/base/base';
import { INPUT_CONTAINER_MARGIN, INPUT_FILL, INPUT_LENGTH, INPUT_MARGIN, INPUT_VARIANT
} from '../globals/constants';
import {
    INPUT_DATE_FORMAT, INPUT_DATETIME_FORMAT, INPUT_PICKER_VARIANT, INPUT_TIME_FORMAT,
    INVALID_DATE_MESSAGE, INVALID_DATETIME_MESSAGE, INVALID_TIME_MESSAGE, MAX_DATE_MESSAGE,
    MAX_DATETIME_MESSAGE, MAX_TIME_MESSAGE, MIN_DATE_MESSAGE, MIN_DATETIME_MESSAGE,
    MIN_TIME_MESSAGE, TODAY_NAME
} from './constants';
import './pickers.css';


export class DatePicker extends BaseComponent {

    state = {
        selectedDate: null
    }

    _render() {
        return (
            <div style={{width: INPUT_LENGTH, margin: INPUT_CONTAINER_MARGIN}}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        clearable={true}
                        margin={INPUT_MARGIN}
                        format={INPUT_DATE_FORMAT}
                        id={this.props.info.field}
                        label={this.props.info.title}
                        showTodayButton={true}
                        value={this.state.selectedDate}
                        variant={INPUT_PICKER_VARIANT}
                        animateYearScrolling={true}
                        inputVariant={INPUT_VARIANT}
                        style={{width: INPUT_FILL}}
                        todayLabel={TODAY_NAME}
                        invalidDateMessage={INVALID_DATE_MESSAGE}
                        maxDateMessage={MAX_DATE_MESSAGE}
                        minDateMessage={MIN_DATE_MESSAGE}
                        InputLabelProps={{ required: this.props.info.required }}
                        InputProps={{ required: this.props.info.required }}
                        onChange={value => {
                            this.setState({
                                selectedDate: value
                            })
                        }}
                    />
                </MuiPickersUtilsProvider>
            </div>
        )
    }
}

export class TimePicker extends BaseComponent {

    state = {
        selectedTime: null
    }

    _render() {
        return (
            <div style={{width: INPUT_LENGTH, margin: INPUT_CONTAINER_MARGIN}}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                        clearable={true}
                        ampm={false}
                        margin={INPUT_MARGIN}
                        format={INPUT_TIME_FORMAT}
                        id={this.props.info.field}
                        label={this.props.info.title}
                        showTodayButton={true}
                        value={this.state.selectedTime}
                        variant={INPUT_PICKER_VARIANT}
                        animateYearScrolling={true}
                        inputVariant={INPUT_VARIANT}
                        style={{width: INPUT_FILL}}
                        todayLabel={TODAY_NAME}
                        invalidDateMessage={INVALID_TIME_MESSAGE}
                        maxDateMessage={MAX_TIME_MESSAGE}
                        minDateMessage={MIN_TIME_MESSAGE}
                        InputLabelProps={{ required: this.props.info.required }}
                        InputProps={{ required: this.props.info.required }}
                        onChange={value => {
                            this.setState({
                                selectedTime: value
                            })
                        }}
                    />
                </MuiPickersUtilsProvider>
            </div>
        )
    }
}

export class DateTimePicker extends BaseComponent {

    state = {
        selectedDateTime: null
    }

    _render() {
        return (
            <div style={{width: INPUT_LENGTH, margin: INPUT_CONTAINER_MARGIN}}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                        clearable={true}
                        ampm={false}
                        margin={INPUT_MARGIN}
                        format={INPUT_DATETIME_FORMAT}
                        id={this.props.info.field}
                        label={this.props.info.title}
                        showTodayButton={true}
                        value={this.state.selectedDateTime}
                        variant={INPUT_PICKER_VARIANT}
                        animateYearScrolling={true}
                        inputVariant={INPUT_VARIANT}
                        style={{width: INPUT_FILL}}
                        todayLabel={TODAY_NAME}
                        invalidDateMessage={INVALID_DATETIME_MESSAGE}
                        maxDateMessage={MAX_DATETIME_MESSAGE}
                        minDateMessage={MIN_DATETIME_MESSAGE}
                        InputLabelProps={{ required: this.props.info.required }}
                        InputProps={{ required: this.props.info.required }}
                        onChange={value => {
                            this.setState({
                                selectedDateTime: value
                            })
                        }}
                    />
                </MuiPickersUtilsProvider>
            </div>
        )
    }
}
