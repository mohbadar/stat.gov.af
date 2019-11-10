import AuthService from './service';
import HttpError from '../../config/error';
import { IUserModel } from '../User/model';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import app from '../../config/server/server';

/**
 * @export
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise < void >}
 */
export async function signup(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const user: IUserModel = await AuthService.createUser(req.body);
        const kind: string = 'admin';
        const token: string = jwt.sign({ _id: user._id }, app.get('secret'), {
            expiresIn: '1800m'
        });

        user.tokens.push({ token, kind });
        user.lastLogin = new Date();
        user.save().then(() => {
            res.json({
                token,
                status: 200,
                logged: true,
                message: 'Sign in successfull'
            });
        });
    } catch (error) {
        console.log(error);
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }
        res.json({
            status: 400,
            message: error.message
        });
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function login(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const user: IUserModel = await AuthService.getUser(req.body);
        const kind: string = 'admin';

        const token: string = jwt.sign({ _id: user._id }, app.get('secret'), {
            expiresIn: '1800m'
        });
        
        user.tokens.push({ token, kind });
        user.lastLogin = new Date();
        user.save().then(() => {
            res.json({
                token,
                data: user.roles,
                user_id: user._id,
                status: 200,
                logged: true,
                message: 'Sign in successfull'
            });
        });

    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }

        res.json({
            status: 400,
            message: error.message
        });
    }
}
