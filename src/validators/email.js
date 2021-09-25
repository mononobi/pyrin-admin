import { StringValidator } from './string';


export class EmailValidator extends StringValidator {

    INCORRECT_TYPE_MESSAGE = 'Enter a valid email address';
}
