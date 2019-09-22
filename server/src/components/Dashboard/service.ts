import * as Joi from 'joi';
import DashboardModel, { IDashboardModel } from './model';
import WidgetValidation from './validation';
import { IDashboardService } from './interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IDashboardModelService}
 */
const DashboardService: IDashboardService = {
    /**
     * @returns {Promise < IDashboardModel[] >}
     * @memberof DashboardService
     */
    async findAll(): Promise < IDashboardModel[] > {
        try {
            return await DashboardModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IDashboardModel >}
     * @memberof DashboardService
     */
    async findOne(id: string): Promise < IDashboardModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = WidgetValidation.get({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await DashboardModel.findOne({
                _id: Types.ObjectId(id)
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IDashboardModel} query
     * @returns {Promise < IDashboardModel >}
     * @memberof DashboardService
     */
    async insert(body: IDashboardModel): Promise < IDashboardModel > {
        try {
            const validate: Joi.ValidationResult < IDashboardModel > = WidgetValidation.create(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const query: IDashboardModel = await DashboardModel.create(body);

            return query;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IDashboardModel >}
     * @memberof DashboardService
     */
    async remove(id: string): Promise < IDashboardModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = WidgetValidation.remove({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const query: IDashboardModel = await DashboardModel.findOneAndRemove({
                _id: Types.ObjectId(id)
            });

            return query;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default DashboardService;
