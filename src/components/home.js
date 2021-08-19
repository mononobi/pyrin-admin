import React, { Component }  from 'react';
import { getMainMetadata } from '../services/metadata';
import { BaseComponent } from './base';


class PageComponent extends Component {

    render() {
        return (
            <>
                <h1>{this.props.page.category}</h1>
                <h2>{this.props.page.plural_name}</h2>
                <h3>{this.props.page.register_name}</h3>
            </>
        )
    }
}


class PagesComponent extends Component {

    render() {
        return this.props.pages.map(page => {
            return <PageComponent key={page.register_name} page={page} />
        })
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
