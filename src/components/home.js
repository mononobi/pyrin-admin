import React, { Component }  from 'react';
import { getMainMetadata } from '../services/metadata';


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

export class HomeComponent extends Component {

    state = {
        pages: [],
        isLoaded: false
    }

    render() {
        if (this.state.isLoaded)
        {
            return (
                <PagesComponent pages={this.state.pages}/>
            )
        }
        else {
            return (
                <div> LOADING... </div>
            )
        }
    }

    componentDidMount() {
        let response = getMainMetadata();
        response.then((json) => {
            this.setState({
                pages: json.results,
                isLoaded: true})
        })
    }
}
