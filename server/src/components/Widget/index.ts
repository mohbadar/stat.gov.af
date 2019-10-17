import WidgetService from './service';
import { HttpError } from '../../config/error';
import { IWidgetModel } from './model';
import { NextFunction, Request, Response } from 'express';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const queries: IWidgetModel[] = await WidgetService.findAll();

        res.status(200).json(queries);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const widget: IWidgetModel = await WidgetService.findOne(req.params.id);

        res.status(200).json(widget);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        console.log(JSON.stringify(req.body));

        const widget: IWidgetModel = await WidgetService.insert(req.body);

        res.status(201).json(widget);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const widget: IWidgetModel = await WidgetService.remove(req.params.id);

        res.status(200).json(widget);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function bulkAdd(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        let passFlag: boolean = true;
        const ids: any = [];

        console.log('body: ', JSON.stringify(req.body));

        for (let i = 0; i < req.body.length; i++) {
            const widget: IWidgetModel = await WidgetService.insert(req.body[i]);

            if (!widget) {
                passFlag = false;

                return;
            }
            console.log(widget._id);

            ids.push(widget._id);
        }

        if (passFlag) {
            console.log('Array: ', ids);

            res.status(200).json({
                ids,
                message: 'charts successfully saved',
            });
        } else {
            res.status(500).json({
                message: 'some error has occured'
            });
        }

    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findByDashboardId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const dashboardId = req.params.id;
        
        console.log('req params: ', req.params.id);

        res.status(200).json({
            message: 'charts successfully fetched',
        });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

