import { FormBase } from './base';
import { create } from '../../services/data';
import { ServerFormFieldTypeEnum } from '../controls/globals/enumerations';


export class CreateForm extends FormBase {

    _callService(values) {
        return create(this.props.register_name, values);
    }

    _getInitialValues(initialValues) {
        let result = {};
        for (let i = 0; i < this.props.dataFields.length; i++) {
            let name = this.props.dataFields[i].field;
            let info = this.props.dataFieldsDict[name]
            if (info && info.form_field_type === ServerFormFieldTypeEnum.BOOLEAN &&
                info.required) {
                result[name] = false;
            }
            else {
                result[name] = '';
            }
        }
        return result;
    }
}
