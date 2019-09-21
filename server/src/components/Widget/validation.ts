import * as Joi from 'joi';
import Validation from '../validation';
import { IWidgetModel } from './model';

/**
 * @export
 * @class WidgetValidation
 * @extends Validation
 */
class WidgetValidation extends Validation {

    /**
     * Creates an instance of WidgetValidation.
     * @memberof WidgetValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {IWidgetModel} params
     * @returns {Joi.ValidationResult<IWidgetModel >}
     * @memberof WidgetValidation
     */
    create(
        params: IWidgetModel
    ): Joi.ValidationResult < IWidgetModel > {
        const schema: Joi.Schema = Joi.object().keys({
            name: Joi.string().required(),
            data: Joi.string().required(),

        });

        return Joi.validate(params, schema);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof WidgetValidation
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
     * @memberof WidgetValidation
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

export default new WidgetValidation();
