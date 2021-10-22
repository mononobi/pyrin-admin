import React from 'react';
import { IconButton, ListItemSecondaryAction, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import { getMainMetadata } from '../../../services/metadata';
import { getListPage, getCreatePage } from '../../../services/url';
import { BaseComplexPage, BasePage } from '../base/base';
import { AlertSeverityEnum } from '../../../core/enumerations';
import './home.css';


class PageItemComponent extends BasePage {

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


class PageListComponent extends BasePage {

    _render() {
        return (
            this.props.pages.map((category, index) => {
                let category_name = Object.keys(category)[0];
                return (
                    <div className='pages' key={index}>
                        <div className='category'>{category_name}</div>
                        <List component='nav' dense={true}>
                            {
                                category[category_name].map(page => {
                                    return <PageItemComponent key={page.register_name} page={page}/>
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

    _fetchMetadata()
    {
        return getMainMetadata();
    }

    _prepareMetadata(metadata) {
        if (metadata.pages.length <= 0) {
            this._setBannerNotification('No admin pages are registered on the server!',
                AlertSeverityEnum.INFO)
        }
    }

    _getPageTitle() {
        return `Home`;
    }

    _finalRender() {
        return (
            <div className='pages-container'>
                <PageListComponent pages={this.state.metadata.pages}/>
            </div>
        )
    }
}
