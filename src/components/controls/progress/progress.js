import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import './progress.css';


export const ProgressBar = (props) => {
    return (
        <div className='loading'>
            <LinearProgress color='primary'/>
        </div>
    )
};
