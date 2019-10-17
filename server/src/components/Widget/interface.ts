import { IWidgetModel } from './model';

/**
 * @export
 * @interface IWidgetModel
 */
export interface IWidgetService {

      /**
     * @returns {Promise<IWidgetModel[]>}
     * @memberof IWidgetService
     */
    findAll(): Promise<IWidgetModel[]>;

    /**
     * @param {string} code
     * @returns {Promise<IWidgetModel>}
     * @memberof IWidgetService
     */
    findOne(code: string): Promise<IWidgetModel>;

    /**
     * @param {Object} widgetIds
     * @returns {Promise<IWidgetModel[]>}
     * @memberof IWidgetService
     */
    findAllByIds(widgetIds: [[object]]): Promise<IWidgetModel[]>;

    /**
     * @param {IWidgetModel} IWidgetModel
     * @returns {Promise<IWidgetModel>}
     * @memberof IWidgetService
     */
    insert(IWidgetModel: IWidgetModel): Promise<IWidgetModel>;

    update(code: string, IWidgetModel: IWidgetModel): Promise<IWidgetModel>

    /**
     * @param {string} id
     * @returns {Promise<IWidgetModel>}
     * @memberof IWidgetService
     */
    remove(id: string): Promise<IWidgetModel>;

}