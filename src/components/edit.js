import React, { Component } from 'react';


export class EditComponent extends Component {

    render() {
        return <div> EDIT {this.props.match.params.register_name} - {this.props.match.params.pk} </div>
    }

    componentDidMount() {}
}
