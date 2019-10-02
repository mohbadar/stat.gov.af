import * as Joi from 'joi';
import WidgetModel, { IWidgetModel } from './model';
import WidgetValidation from './validation';
import { IWidgetService } from './interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IWidgetModelService}
 */
const WidgetService: IWidgetService = {
    /**
     * @returns {Promise < IWidgetModel[] >}
     * @memberof WidgetService
     */
    async findAll(): Promise < IWidgetModel[] > {
        try {
            return await WidgetModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IWidgetModel >}
     * @memberof WidgetService
     */
    async findOne(id: string): Promise < IWidgetModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = WidgetValidation.get({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await WidgetModel.findOne({
                _id: Types.ObjectId(id)
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IWidgetModel} query
     * @returns {Promise < IWidgetModel >}
     * @memberof WidgetService
     */
    async insert(body: IWidgetModel): Promise < IWidgetModel > {
        try {
            const validate: Joi.ValidationResult < IWidgetModel > = WidgetValidation.create(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const query: IWidgetModel = await WidgetModel.create(body);

            return query;
        } catch (error) {
            throw new Error(error.message);
        }
    },


        /**
     * @param {IRoleModel} user
     * @returns {Promise < IRoleModel >}
     * @memberof PermissionService
     */
    async update(code: string, body: IWidgetModel): Promise < IWidgetModel > {
        try {
            const validate: Joi.ValidationResult < IWidgetModel > = WidgetValidation.create(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IWidgetModel = await WidgetModel.update({_id: Types.ObjectId(code)}, body);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IWidgetModel >}
     * @memberof WidgetService
     */
    async remove(id: string): Promise < IWidgetModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = WidgetValidation.remove({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const query: IWidgetModel = await WidgetModel.findOneAndRemove({
                _id: Types.ObjectId(id)
            });

            return query;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default WidgetService;
