import { BaseComponent } from '../../base/base/base';
import { INPUT_LENGTH, LONG_INPUT_LENGTH, VERY_LONG_INPUT_LENGTH } from '../globals/constants';
import { NotImplementedError } from '../../../core/exceptions';


export class BaseControl extends BaseComponent {

    FIXED_LENGTH = null;
    CONTAINER_CLASS_NAME = 'input-container';

    state = {
        length: INPUT_LENGTH
    };

    _isRequired() {
        return this.props.info.required && !this.props.forUpdate;
    }

    _isReadOnly() {
        return this.props.info.read_only;
    }

    _getFieldTitle() {
        return this.props.info.title;
    }

    _getFieldName() {
        return this.props.info.field;
    }

    _getLength() {
        return this.state.length;
    }

    _getAutoLength() {
        let max_length = this.props.info.max_length;
        let min_length = this.props.info.min_length;
        let label_length = this.props.info.title.length;
        let chosen_label_length = INPUT_LENGTH;
        let chosen_max_value_length = INPUT_LENGTH;
        let chosen_min_value_length = INPUT_LENGTH;

        if (label_length > 25 && label_length < 45) {
            chosen_label_length = LONG_INPUT_LENGTH;
        }
        else if (label_length >= 45) {
            chosen_label_length = VERY_LONG_INPUT_LENGTH;
        }

        if (max_length) {
            if (max_length > 25 * 6 && max_length < 45 * 6) {
                chosen_max_value_length = LONG_INPUT_LENGTH;
            }
            else if (max_length >= 45 * 6) {
                chosen_max_value_length = VERY_LONG_INPUT_LENGTH;
            }
        }

        if (min_length) {
            if (min_length > 25 && min_length < 45) {
                chosen_min_value_length = LONG_INPUT_LENGTH;
            }
            else if (min_length >= 45) {
                chosen_min_value_length = VERY_LONG_INPUT_LENGTH;
            }
        }

        let array = [chosen_min_value_length, chosen_max_value_length, chosen_label_length];
        array.sort();
        return array[2];
    }

    _componentDidMount() {
        let length = null;
        if (this.props.fixed_length) {
            length = this.props.fixed_length
        }
        else if (this.FIXED_LENGTH) {
            length = this.FIXED_LENGTH
        }
        else {
            length = this._getAutoLength()
        }

        this.setState({
            length: length
        })
    }

    _renderControl() {
        throw new NotImplementedError()
    }

    _render() {
        return (
            <div key={`${this._getFieldName()}-container`}
                 style={{width: this._getLength()}}
                 className={this.CONTAINER_CLASS_NAME}>
                {
                    this._renderControl()
                }
            </div>
        )
    }
}
