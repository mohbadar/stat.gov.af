import * as Joi from 'joi';
import Validation from '../validation';
import { IUserModel } from '../User/model';

/**
 * @export
 * @class AuthValidation
 * @extends Validation
 */
class AuthValidation extends Validation {

     /**
     * Creates an instance of AuthValidation.
     * @memberof AuthValidation
     */
    constructor() {
        super();
    }
    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult<IUserModel >}
     * @memberof UserValidation
     */
    signup(
        params: IUserModel
    ): Joi.ValidationResult < IUserModel > {
        const schema: Joi.Schema = Joi.object().keys({
            password: Joi.string().required(),
            email: Joi.string().email({
                minDomainAtoms: 2
            }),
            mobileNumber: Joi.string().required(),
            username: Joi.string().required(),
            fullName: Joi.string()
        });

        return Joi.validate(params, schema);
    }
    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult<IUserModel >}
     * @memberof UserValidation
     */
    login(
        params: IUserModel
    ): Joi.ValidationResult < IUserModel > {
        const schema: Joi.Schema = Joi.object().keys({
            username: Joi.string().required(),
            password: Joi.string().required()
        });

        return Joi.validate(params, schema);
    } 
}

export default new AuthValidation();
