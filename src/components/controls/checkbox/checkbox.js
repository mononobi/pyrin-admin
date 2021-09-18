import React from 'react';
import { FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { BaseControl } from '../base/base';
import { INPUT_CONTAINER_MARGIN } from '../globals/constants';


export class CheckBox extends BaseControl {

    _render() {
        return (
            <div style={{width: this.state.length, margin: INPUT_CONTAINER_MARGIN}}>
                <FormControlLabel
                    labelPlacement='end'
                    label={<span style={{ fontSize: '13px' }}>{this.props.info.title}</span>}
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
