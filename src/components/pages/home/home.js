import React from 'react';
import { IconButton, ListItemSecondaryAction, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import { v4 as uuidv4 } from 'uuid'
import { getMainMetadata } from '../../../services/metadata';
import { getListPage, getCreatePage } from '../../../services/url';
import { BaseComplexPage, BasePage } from '../base/base';
import './home.css';


class PageComponent extends BasePage {

    _render() {
        return (
            <div className='page'>
                <Link color='textPrimary' component='a'
                      href={getListPage(this.props.page.register_name)} underline='none'>
                    <Tooltip title={`View ${this.props.page.plural_name}`} placement='right'>
                        <ListItem button divider className='item'>
                            <ListItemText primary={this.props.page.plural_name}/>
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


class PagesComponent extends BasePage {

    _render() {
        return (
            this.props.pages.map(category => {
                let category_name = Object.keys(category)[0];
                return (
                    <div className='pages' key={uuidv4()}>
                        <div className='category'>{category_name}</div>
                        <List component='nav' dense={true}>
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


export class HomeComponent extends BaseComplexPage {

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

    _render() {
        return <PagesComponent pages={this.state.metadata}/>
    }
}
