import { ComplexComponent } from '../../base/complex/complex';
import { BaseComponent } from '../../base/base/base';


export class BasePage extends BaseComponent {}

export class BaseComplexPage extends ComplexComponent {

    _getName() {
        return this.state.metadata.name;
    }

    _getInitialRegisterName() {
        if (this._isForSelect()) {
            return this.props.registerName;
        }
        return this.props.match.params.register_name;
    }

    _getRegisterName() {
        return this.state.metadata.register_name;
    }

    _getPluralName() {
        return this.state.metadata.plural_name;
    }

    _isForSelect() {
        return this.props.forSelect;
    }
}
