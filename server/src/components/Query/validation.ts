import * as Joi from 'joi';
import Validation from '../validation';
import { IQueryModel } from './model';

/**
 * @export
 * @class QueryValidation
 * @extends Validation
 */
class QueryValidation extends Validation {

    /**
     * Creates an instance of QueryValidation.
     * @memberof QueryValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {IQueryModel} params
     * @returns {Joi.ValidationResult<IQueryModel >}
     * @memberof QueryValidation
     */
    createQuery(
        params: IQueryModel
    ): Joi.ValidationResult < IQueryModel > {
        const schema: Joi.Schema = Joi.object().keys({
            name: Joi.string().required(),
            data: Joi.string().required(),
            config: Joi.string().allow(),
            user: Joi.string().allow(),
            uuid: Joi.string().allow()

        });

        return Joi.validate(params, schema);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof QueryValidation
     */
    getQuery(
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
     * @memberof QueryValidation
     */
    removeQuery(
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

export default new QueryValidation();
