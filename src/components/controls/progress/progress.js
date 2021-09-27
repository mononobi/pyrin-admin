import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { BaseComponent } from '../../base/base/base';
import './progress.css'


export class ProgressBar extends BaseComponent {

    _render() {
        return (
            <div className='loading'>
                <LinearProgress color='primary'/>
            </div>
        )
    }
}
