import * as Joi from 'joi';
import Validation from '../validation';
import { IRoleModel } from './model';

/**
 * @export
 * @class RoleValidation
 * @extends Validation
 */
class RoleValidation extends Validation {

    /**
     * Creates an instance of RoleValidation.
     * @memberof RoleValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {IRoleModel} params
     * @returns {Joi.ValidationResult<IRoleModel >}
     * @memberof RoleValidation
     */
    create(
        params: IRoleModel
    ): Joi.ValidationResult < IRoleModel > {
        const schema: Joi.Schema = Joi.object().keys({
            name: Joi.string().required(),
            desctription: Joi.string().allow(),
            isActive: Joi.string().allow(),
            permissions: Joi.string().allow()

        });

        return Joi.validate(params, schema);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof RoleValidation
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
     * @memberof RoleValidation
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

export default new RoleValidation();
