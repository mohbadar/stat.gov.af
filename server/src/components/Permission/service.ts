import * as Joi from 'joi';
import PermissionModel, { IPermissionModel } from './model';
import PermissionValidation from './validation';
import { IPermissionService } from './interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IPermissionModelService}
 */
const PermissionService: IPermissionService = {
    /**
     * @returns {Promise < IPermissionModel[] >}
     * @memberof PermissionService
     */
    async findAll(): Promise < IPermissionModel[] > {
        try {
            return await PermissionModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IPermissionModel >}
     * @memberof PermissionService
     */
    async findOne(id: string): Promise < IPermissionModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = PermissionValidation.get({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await PermissionModel.findOne({
                _id: Types.ObjectId(id)
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IPermissionModel} user
     * @returns {Promise < IPermissionModel >}
     * @memberof PermissionService
     */
    async insert(body: IPermissionModel): Promise < IPermissionModel > {
        try {
            const validate: Joi.ValidationResult < IPermissionModel > = PermissionValidation.create(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IPermissionModel = await PermissionModel.create(body);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IPermissionModel >}
     * @memberof PermissionService
     */
    async remove(id: string): Promise < IPermissionModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = PermissionValidation.remove({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IPermissionModel = await PermissionModel.findOneAndRemove({
                _id: Types.ObjectId(id)
            });

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default PermissionService;
