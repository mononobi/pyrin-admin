import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { BaseControl } from '../base/base';
import './progress.css';


export class ProgressBar extends BaseControl {

    _render() {
        return (
            <div className='loading'>
                <LinearProgress color='primary'/>
            </div>
        )
    }
}
