import React, { Component }  from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, ListItemSecondaryAction} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import { getMainMetadata } from '../services/metadata';
import { getListPage, getCreatePage } from '../services/url';
import { BaseComponent } from './base';


const pageStyle = theme => ({
    root: {
        width: '100%',
        maxWidth: 700,
        color: '#2f2d2d',
        // backgroundColor: 'inherit',
        // textAlign: 'center'
    },
});


class PageComponent extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Link component='a' href={getListPage(this.props.page.register_name)}>
                    <ListItem button>
                        <ListItemText primary={this.props.page.plural_name} />
                        { this.props.page.has_create_permission &&
                            <ListItemSecondaryAction>
                                <Link component='a' href={getCreatePage(this.props.page.register_name)}>
                                    <IconButton edge='end'>
                                        <AddIcon/>
                                    </IconButton>
                                </Link>
                            </ListItemSecondaryAction>
                        }
                    </ListItem>
                </Link>
                <Divider/>
            </div>
        )
    }
}

const MaterialPageComponent = withStyles(pageStyle, { withTheme: true })(PageComponent)


const pagesStyle = theme => ({
    root2: {
        width: '100%',
        maxWidth: 700,
        color: '#2f2d2d',
        // backgroundColor: '#405998',
        textAlign: 'left'
    },
});


class PagesComponent extends Component {

    render() {
        const { classes } = this.props;
        return(
            this.props.pages.map(category => {
                let category_name = Object.keys(category)[0];
                return (
                    <div className={classes.root2}>
                        <h4>{category_name}</h4>
                        <Divider/>
                        <List component='nav'>
                            {
                                category[category_name].map(page => {
                                    return <MaterialPageComponent key={page.register_name} page={page}/>
                                })
                            }
                        </List>
                    </div>
                )
            })
        )
    }
}

const MaterialPagesComponent = withStyles(pagesStyle, { withTheme: true })(PagesComponent)


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
                <MaterialPagesComponent pages={this.state.metadata}/>
            )
        }
        else {
            return (
                <div> LOADING... </div>
            )
        }
    }
}
