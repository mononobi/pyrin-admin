import React  from 'react';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import { BasePage } from '../base/base';
import './not_found.css';


export class NotFoundComponent extends BasePage {

    _render() {
        return (
            <>
                <div className='container'>
                    <h3> The requested page not found on the server! </h3>
                    <Chip className='home-button' component='a' href='/'
                          label='Home' icon={<HomeIcon fontSize='small' />} />
                </div>
            </>
        )
    }
}
