import { FormBase } from './base';
import { create } from '../../services/data';
import { ServerFormFieldTypeEnum } from '../controls/inputs/globals/enumerations';


export class CreateForm extends FormBase {

    _callService(values) {
        return create(this.props.registerName, values);
    }

    _getInitialValues(initialValues) {
        let result = {};
        for (let i = 0; i < this.props.dataFields.length; i++) {
            let name = this.props.dataFields[i].field;
            let info = this.props.dataFieldsDict[name]
            if (info && !this._isNull(info.default)) {
                result[name] = info.default;
            }
            else if (info && info.form_field_type === ServerFormFieldTypeEnum.BOOLEAN) {
                result[name] = this.CHECKBOX_DEFAULT;
            }
            else {
                result[name] = '';
            }
        }
        return result;
    }
}
