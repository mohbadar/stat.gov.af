import { IRoleModel } from './model';

/**
 * @export
 * @interface IRoleService
 */
export interface IRoleService {

    /**
     * @returns {Promise<IRoleModel[]>}
     * @memberof IRoleService
     */
    findAll(): Promise<IRoleModel[]>;

    /**
     * @param {string} code
     * @returns {Promise<IRoleModel>}
     * @memberof IRoleService
     */
    findOne(code: string): Promise<IRoleModel>;

    /**
     * @param {IRoleModel} IRoleModel
     * @returns {Promise<IRoleModel>}
     * @memberof IRoleService
     */
    insert(IRoleModel: IRoleModel): Promise<IRoleModel>;

    /**
     * @param {string} id
     * @returns {Promise<IRoleModel>}
     * @memberof IRoleService
     */
    remove(id: string): Promise<IRoleModel>;
}
