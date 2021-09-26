import { FormBase } from './base';
import { update } from '../../services/data';


export class UpdateForm extends FormBase {

    FOR_UPDATE = true;

    _callService(values) {
        return update(this.props.register_name, this.props.pk, values);
    }
}
