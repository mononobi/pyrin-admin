import { Component } from 'react';
import { NotImplementedError } from '../../../core/exceptions';


export class BaseComponent extends Component {

    _render() {
        throw new NotImplementedError();
    }

    _prepareRendering() {}

    _componentDidMount() {}

    componentDidMount() {
        this._componentDidMount();
    }

    render() {
        this._prepareRendering();
        return this._render();
    }
}
