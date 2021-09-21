import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardDateTimePicker, KeyboardTimePicker
} from '@material-ui/pickers';
import { BaseControl } from '../base/base';
import { AutoCompleteEnum } from '../globals/enumerations';
import { INPUT_MARGIN, INPUT_VARIANT } from '../globals/constants';
import {
    INPUT_DATE_FORMAT, INPUT_DATETIME_FORMAT, INPUT_PICKER_VARIANT, INPUT_TIME_FORMAT,
    INVALID_DATE_MESSAGE, INVALID_DATETIME_MESSAGE, INVALID_TIME_MESSAGE, MAX_DATE_MESSAGE,
    MAX_DATETIME_MESSAGE, MAX_TIME_MESSAGE, MIN_DATE_MESSAGE, MIN_DATETIME_MESSAGE,
    MIN_TIME_MESSAGE, TODAY_NAME
} from './constants';
import '../globals/styles/inputs.css';


export class DatePicker extends BaseControl {

    state = {
        selectedDate: null
    }

    _render() {
        return (
            <div style={{width: this.state.length}} className='input-container'>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        clearable={true}
                        margin={INPUT_MARGIN}
                        format={INPUT_DATE_FORMAT}
                        id={this.props.info.field}
                        label={this.props.info.title}
                        showTodayButton={true}
                        variant={INPUT_PICKER_VARIANT}
                        animateYearScrolling={true}
                        inputVariant={INPUT_VARIANT}
                        todayLabel={TODAY_NAME}
                        invalidDateMessage={INVALID_DATE_MESSAGE}
                        maxDateMessage={MAX_DATE_MESSAGE}
                        minDateMessage={MIN_DATE_MESSAGE}
                        InputLabelProps={{
                            required: this.props.info.required
                        }}
                        InputProps={{
                            required: this.props.info.required,
                            autoComplete: AutoCompleteEnum.OFF
                        }}
                        disabled={this.props.info.read_only}
                        name={this.props.info.field}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        error={this.props.error}
                        helperText={this.props.helperText}
                    />
                </MuiPickersUtilsProvider>
            </div>
        )
    }
}

export class TimePicker extends BaseControl {

    state = {
        selectedTime: null
    }

    _render() {
        return (
            <div style={{width: this.state.length}} className='input-container'>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                        clearable={true}
                        ampm={false}
                        margin={INPUT_MARGIN}
                        format={INPUT_TIME_FORMAT}
                        id={this.props.info.field}
                        label={this.props.info.title}
                        showTodayButton={true}
                        variant={INPUT_PICKER_VARIANT}
                        animateYearScrolling={true}
                        inputVariant={INPUT_VARIANT}
                        todayLabel={TODAY_NAME}
                        invalidDateMessage={INVALID_TIME_MESSAGE}
                        maxDateMessage={MAX_TIME_MESSAGE}
                        minDateMessage={MIN_TIME_MESSAGE}
                        InputLabelProps={{
                            required: this.props.info.required
                        }}
                        InputProps={{
                            required: this.props.info.required,
                            autoComplete: AutoCompleteEnum.OFF
                        }}
                        disabled={this.props.info.read_only}
                        name={this.props.info.field}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        error={this.props.error}
                        helperText={this.props.helperText}
                    />
                </MuiPickersUtilsProvider>
            </div>
        )
    }
}

export class DateTimePicker extends BaseControl {

    state = {
        selectedDateTime: null
    }

    _render() {
        return (
            <div style={{width: this.state.length}} className='input-container'>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                        clearable={true}
                        ampm={false}
                        margin={INPUT_MARGIN}
                        format={INPUT_DATETIME_FORMAT}
                        id={this.props.info.field}
                        label={this.props.info.title}
                        showTodayButton={true}
                        variant={INPUT_PICKER_VARIANT}
                        animateYearScrolling={true}
                        inputVariant={INPUT_VARIANT}
                        todayLabel={TODAY_NAME}
                        invalidDateMessage={INVALID_DATETIME_MESSAGE}
                        maxDateMessage={MAX_DATETIME_MESSAGE}
                        minDateMessage={MIN_DATETIME_MESSAGE}
                        InputLabelProps={{
                            required: this.props.info.required
                        }}
                        InputProps={{
                            required: this.props.info.required,
                            autoComplete: AutoCompleteEnum.OFF
                        }}
                        disabled={this.props.info.read_only}
                        name={this.props.info.field}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        error={this.props.error}
                        helperText={this.props.helperText}
                    />
                </MuiPickersUtilsProvider>
            </div>
        )
    }
}
