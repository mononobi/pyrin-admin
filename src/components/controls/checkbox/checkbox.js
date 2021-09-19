import React from 'react';
import { FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { BaseControl } from '../base/base';
import '../globals/styles/inputs.css';


export class CheckBox extends BaseControl {

    _render() {
        return (
            <div style={{width: this.state.length}} className='input-container'>
                <FormControlLabel
                    labelPlacement='end'
                    label={this.props.info.title}
                    control={
                        <Checkbox
                            id={this.props.info.field}
                            size={'medium'}
                            required={this.props.info.required}
                        />
                    }
                />
            </div>
        )
    }
}
