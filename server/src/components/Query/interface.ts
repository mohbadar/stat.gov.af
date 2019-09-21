import { IQueryModel } from './model';

/**
 * @export
 * @interface IQueryModel
 */
export interface IQueryService {

      /**
     * @returns {Promise<IQueryModel[]>}
     * @memberof IQueryService
     */
    findAll(): Promise<IQueryModel[]>;

    /**
     * @param {string} code
     * @returns {Promise<IQueryModel>}
     * @memberof IQueryService
     */
    findOne(code: string): Promise<IQueryModel>;

    /**
     * @param {IQueryModel} IQueryModel
     * @returns {Promise<IQueryModel>}
     * @memberof IQueryService
     */
    insert(IQueryModel: IQueryModel): Promise<IQueryModel>;

    /**
     * @param {string} id
     * @returns {Promise<IQueryModel>}
     * @memberof IQueryService
     */
    remove(id: string): Promise<IQueryModel>;

}