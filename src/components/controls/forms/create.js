import { FormBase } from './base';
import { create } from '../../../services/data';


export class CreateForm extends FormBase {

    _callService(values) {
        return create(this.props.register_name, values);
    }

    _getInitialValues(initialValues) {
        let result = {};
        for (let i = 0; i < this.props.dataFields.length; i++) {
            result[this.props.dataFields[i].field] = '';
        }
        return result;
    }
}
