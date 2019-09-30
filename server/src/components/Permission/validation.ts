import * as Joi from 'joi';
import Validation from '../validation';
import { IPermissionModel } from './model';

/**
 * @export
 * @class PermissionValidation
 * @extends Validation
 */
class PermissionValidation extends Validation {

    /**
     * Creates an instance of PermissionValidation.
     * @memberof PermissionValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {IPermissionModel} params
     * @returns {Joi.ValidationResult<IPermissionModel >}
     * @memberof PermissionValidation
     */
    create(
        params: IPermissionModel
    ): Joi.ValidationResult < IPermissionModel > {
        const schema: Joi.Schema = Joi.object().keys({
            name: Joi.string().required(),
            description: Joi.string().allow(),
            isActive: Joi.string().allow(),

        });

        return Joi.validate(params, schema);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof PermissionValidation
     */
    get(
        body: {
            id: string
        }
    ): Joi.ValidationResult < {
        id: string
    } > {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof PermissionValidation
     */
    remove(
        body: {
            id: string
        }
    ): Joi.ValidationResult < {
        id: string
    } > {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }
}

export default new PermissionValidation();
