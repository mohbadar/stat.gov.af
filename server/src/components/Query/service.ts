import * as Joi from 'joi';
import QueryModel, { IQueryModel } from './model';
import QueryValidation from './validation';
import { IQueryService } from './interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IQueryModelService}
 */
const QueryService: IQueryService = {
    /**
     * @returns {Promise < IQueryModel[] >}
     * @memberof QueryService
     */
    async findAll(): Promise < IQueryModel[] > {
        try {
            return await QueryModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IQueryModel >}
     * @memberof QueryService
     */
    async findOne(id: string): Promise < IQueryModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = QueryValidation.getQuery({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await QueryModel.findOne({
                _id: Types.ObjectId(id)
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IQueryModel} query
     * @returns {Promise < IQueryModel >}
     * @memberof QueryService
     */
    async insert(body: IQueryModel): Promise < IQueryModel > {
        try {
            const validate: Joi.ValidationResult < IQueryModel > = QueryValidation.createQuery(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const query: IQueryModel = await QueryModel.create(body);

            return query;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IQueryModel >}
     * @memberof QueryService
     */
    async remove(id: string): Promise < IQueryModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = QueryValidation.removeQuery({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const query: IQueryModel = await QueryModel.findOneAndRemove({
                _id: Types.ObjectId(id)
            });

            return query;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default QueryService;
