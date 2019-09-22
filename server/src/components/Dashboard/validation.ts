import * as Joi from 'joi';
import Validation from '../validation';
import { IDashboardModel } from './model';

/**
 * @export
 * @class DashboardValidation
 * @extends Validation
 */
class DashboardValidation extends Validation {

    /**
     * Creates an instance of DashboardValidation.
     * @memberof DashboardValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {IDashboardModel} params
     * @returns {Joi.ValidationResult<IDashboardModel >}
     * @memberof DashboardValidation
     */
    create(
        params: IDashboardModel
    ): Joi.ValidationResult < IDashboardModel > {
        const schema: Joi.Schema = Joi.object().keys({
            name: Joi.string().required(),
            data: Joi.string().required(),
            config: Joi.string().allow(),
            user: Joi.string().required()

        });

        return Joi.validate(params, schema);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof DashboardValidation
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
     * @memberof DashboardValidation
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

export default new DashboardValidation();
