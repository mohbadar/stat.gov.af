import DashboardService from './service';
import { HttpError } from '../../config/error';
import { IDashboardModel } from './model';
import { NextFunction, Request, Response } from 'express';
import WidgetService from '../Widget/service';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const queries: IDashboardModel[] = await DashboardService.findAll();

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
        const query: IDashboardModel = await DashboardService.findOne(req.params.id);

        const widgetIds = query.widgets;
        console.log('Widget IDs: ', widgetIds);

        // Fetch widgets for the current dashboard
        const widgets = await WidgetService.findAllByIds(widgetIds);

        console.log('widgets are: ', widgets);




        res.status(200).json({
            id: query.id,
            user: query.user,
            name: query.name,
            layout: query.layout,
            createdAt: query.createdAt,
            widgets
        });
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
    console.log("DATA", req.body);

    try {
        const query: IDashboardModel = await DashboardService.insert(req.body);

        res.status(201).json(query);
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
        const query: IDashboardModel = await DashboardService.remove(req.params.id);

        res.status(200).json(query);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

