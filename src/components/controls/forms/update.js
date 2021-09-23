import { FormBase } from './base';
import { update } from '../../../services/data';


export class UpdateForm extends FormBase {

    FOR_UPDATE = true;

    _callService(values) {
        return update(this.props.register_name, this.props.pk, values);
    }

    _getInitialValues(initialValues) {
        for (let i = 0; i < this.props.dataFields.length; i++) {
            if (!initialValues.hasOwnProperty(this.props.dataFields[i].field)) {
                initialValues[this.props.dataFields[i].field] = '';
            }
        }
        return super._getInitialValues(initialValues);
    }
}
