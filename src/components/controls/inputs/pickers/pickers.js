import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Schedule } from '@material-ui/icons';
import {
    MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardDateTimePicker, KeyboardTimePicker
} from '@material-ui/pickers';
import { BaseInput } from '../base/base';
import { AutoCompleteEnum } from '../globals/enumerations';
import { INPUT_MARGIN, INPUT_VARIANT } from '../globals/constants';
import { HELPER_TEXT_STYLE } from '../globals/styles/inputs';
import {
    INPUT_DATE_FORMAT, INPUT_DATETIME_FORMAT, INPUT_PICKER_VARIANT, INPUT_TIME_FORMAT,
    INVALID_DATE_MESSAGE, INVALID_DATETIME_MESSAGE, INVALID_TIME_MESSAGE, MAX_DATE_MESSAGE,
    MAX_DATETIME_MESSAGE, MAX_TIME_MESSAGE, MIN_DATE_MESSAGE, MIN_DATETIME_MESSAGE,
    MIN_TIME_MESSAGE, TODAY_NAME
} from './constants';
import '../globals/styles/inputs.css';


class BasePicker extends BaseInput {

    _getValue() {
        return this.props.value || null;
    }
}

export class DatePicker extends BasePicker {

    _renderControl() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    key={this._getFieldName()}
                    clearable={true}
                    margin={INPUT_MARGIN}
                    format={INPUT_DATE_FORMAT}
                    id={this._getFieldName()}
                    label={this._getFieldTitle()}
                    showTodayButton={true}
                    variant={INPUT_PICKER_VARIANT}
                    animateYearScrolling={true}
                    inputVariant={INPUT_VARIANT}
                    todayLabel={TODAY_NAME}
                    invalidDateMessage={INVALID_DATE_MESSAGE}
                    maxDateMessage={MAX_DATE_MESSAGE}
                    minDateMessage={MIN_DATE_MESSAGE}
                    InputProps={{
                        autoComplete: AutoCompleteEnum.OFF
                    }}
                    InputLabelProps={{
                        shrink: this._getValue() ? true : undefined,
                    }}
                    disabled={this._isReadOnly()}
                    name={this._getFieldName()}
                    value={this._getValue()}
                    onChange={(date, string) => {
                        this.props.setFieldValue(this._getFieldName(), date);
                    }}
                    error={this.props.error}
                    helperText={this.props.helperText}
                    FormHelperTextProps={{style: HELPER_TEXT_STYLE, margin: 'dense'}}
                />
            </MuiPickersUtilsProvider>
        );
    }
}

export class TimePicker extends BasePicker {

    _renderControl() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                    key={this._getFieldName()}
                    clearable={true}
                    ampm={false}
                    margin={INPUT_MARGIN}
                    format={INPUT_TIME_FORMAT}
                    id={this._getFieldName()}
                    label={this._getFieldTitle()}
                    showTodayButton={true}
                    variant={INPUT_PICKER_VARIANT}
                    animateYearScrolling={true}
                    inputVariant={INPUT_VARIANT}
                    todayLabel={TODAY_NAME}
                    invalidDateMessage={INVALID_TIME_MESSAGE}
                    maxDateMessage={MAX_TIME_MESSAGE}
                    minDateMessage={MIN_TIME_MESSAGE}
                    InputProps={{
                        autoComplete: AutoCompleteEnum.OFF
                    }}
                    InputLabelProps={{
                        shrink: this._getValue() ? true : undefined,
                    }}
                    disabled={this._isReadOnly()}
                    name={this._getFieldName()}
                    value={this._getValue()}
                    onChange={(time, string) => {
                        this.props.setFieldValue(this._getFieldName(), time);
                    }}
                    error={this.props.error}
                    helperText={this.props.helperText}
                    FormHelperTextProps={{style: HELPER_TEXT_STYLE, margin: 'dense'}}
                    keyboardIcon={<Schedule fontSize={'medium'}/>}
                />
            </MuiPickersUtilsProvider>
        );
    }
}

export class DateTimePicker extends BasePicker {

    _renderControl() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                    key={this._getFieldName()}
                    clearable={true}
                    ampm={false}
                    margin={INPUT_MARGIN}
                    format={INPUT_DATETIME_FORMAT}
                    id={this._getFieldName()}
                    label={this._getFieldTitle()}
                    showTodayButton={true}
                    variant={INPUT_PICKER_VARIANT}
                    animateYearScrolling={true}
                    inputVariant={INPUT_VARIANT}
                    todayLabel={TODAY_NAME}
                    invalidDateMessage={INVALID_DATETIME_MESSAGE}
                    maxDateMessage={MAX_DATETIME_MESSAGE}
                    minDateMessage={MIN_DATETIME_MESSAGE}
                    InputProps={{
                        autoComplete: AutoCompleteEnum.OFF
                    }}
                    InputLabelProps={{
                        shrink: this._getValue() ? true : undefined,
                    }}
                    disabled={this._isReadOnly()}
                    name={this._getFieldName()}
                    value={this._getValue()}
                    onChange={(datetime, string) => {
                        this.props.setFieldValue(this._getFieldName(), datetime);
                    }}
                    error={this.props.error}
                    helperText={this.props.helperText}
                    FormHelperTextProps={{style: HELPER_TEXT_STYLE, margin: 'dense'}}
                />
            </MuiPickersUtilsProvider>
        );
    }
}
