import * as Joi from 'joi';
import RoleModel, { IRoleModel } from './model';
import RoleValidation from './validation';
import { IRoleService } from './interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IRoleModelService}
 */
const PermissionService: IRoleService = {
    /**
     * @returns {Promise < IRoleModel[] >}
     * @memberof PermissionService
     */
    async findAll(): Promise < IRoleModel[] > {
        try {
            return await RoleModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IRoleModel >}
     * @memberof PermissionService
     */
    async findOne(id: string): Promise < IRoleModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = RoleValidation.get({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await RoleModel.findOne({
                _id: Types.ObjectId(id)
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IRoleModel} user
     * @returns {Promise < IRoleModel >}
     * @memberof PermissionService
     */
    async insert(body: IRoleModel): Promise < IRoleModel > {
        try {
            const validate: Joi.ValidationResult < IRoleModel > = RoleValidation.create(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IRoleModel = await RoleModel.create(body);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },


    /**
     * @param {IRoleModel} user
     * @returns {Promise < IRoleModel >}
     * @memberof PermissionService
     */
    async update(code: string, body: IRoleModel): Promise < IRoleModel > {
        try {
            const validate: Joi.ValidationResult < IRoleModel > = RoleValidation.create(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IRoleModel = await RoleModel.update({'id': code}, body);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IRoleModel >}
     * @memberof PermissionService
     */
    async remove(id: string): Promise < IRoleModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = RoleValidation.remove({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IRoleModel = await RoleModel.findOneAndRemove({
                _id: Types.ObjectId(id)
            });

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default PermissionService;
