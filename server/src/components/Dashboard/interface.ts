import { IDashboardModel } from './model';

/**
 * @export
 * @interface IDashboardModel
 */
export interface IDashboardService {

      /**
     * @returns {Promise<IDashboardModel[]>}
     * @memberof IDashboardService
     */
    findAll(): Promise<IDashboardModel[]>;

    /**
     * @param {string} code
     * @returns {Promise<IDashboardModel>}
     * @memberof IDashboardService
     */
    findOne(code: string): Promise<IDashboardModel>;

    /**
     * @param {IDashboardModel} IDashboardModel
     * @returns {Promise<IDashboardModel>}
     * @memberof IDashboardService
     */
    insert(IDashboardModel: IDashboardModel): Promise<IDashboardModel>;

    /**
     * @param {string} id
     * @returns {Promise<IDashboardModel>}
     * @memberof IDashboardService
     */
    remove(id: string): Promise<IDashboardModel>;

}