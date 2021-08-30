import React, { Component }  from 'react';
import {IconButton, ListItemSecondaryAction, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import {v4 as uuidv4} from 'uuid'
import { getMainMetadata } from '../../../services/metadata';
import { getListPage, getCreatePage } from '../../../services/url';
import { BaseComponent } from '../../base';
import './home.css';


class PageComponent extends Component {

    render() {
        return (
            <div className='page'>
                <Link color='textPrimary' component='a'
                      href={getListPage(this.props.page.register_name)} underline='none'>
                    <Tooltip title={`View ${this.props.page.plural_name}`} placement='right'>
                        <ListItem button divider>
                            <ListItemText primary={this.props.page.plural_name} className='item'/>
                            {
                                this.props.page.has_create_permission &&
                                <ListItemSecondaryAction>
                                    <Link href={getCreatePage(this.props.page.register_name)}>
                                        <Tooltip title={`Add ${this.props.page.name}`} placement='right'>
                                            <IconButton edge='end'>
                                                <AddIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Link>
                                </ListItemSecondaryAction>
                            }
                        </ListItem>
                    </Tooltip>
                </Link>
            </div>
        )
    }
}


class PagesComponent extends Component {

    render() {
        return(
            this.props.pages.map(category => {
                let category_name = Object.keys(category)[0];
                return (
                    <div className='pages' key={uuidv4()}>
                        <div className='category'>{category_name}</div>
                        <List component='nav' dense={true} className='list'>
                            {
                                category[category_name].map(page => {
                                    return <PageComponent key={page.register_name} page={page}/>
                                })
                            }
                        </List>
                    </div>
                )
            })
        )
    }
}


export class HomeComponent extends BaseComponent {

    state = {
        metadata: [],
        isMetadataLoaded: false
    }

    _fetchMetadata()
    {
        return getMainMetadata();
    }

    _getMetadata(json)
    {
        return json.results;
    }

    render() {
        if (this.state.isMetadataLoaded)
        {
            return (
                <PagesComponent pages={this.state.metadata}/>
            )
        }
        else {
            return (
                <div> LOADING... </div>
            )
        }
    }
}
