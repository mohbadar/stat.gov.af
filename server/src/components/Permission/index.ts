import PermissionService from './service';
import { HttpError } from '../../config/error';
import { IPermissionModel } from './model';
import { NextFunction, Request, Response } from 'express';
import { async } from 'rxjs/internal/scheduler/async';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const users: IPermissionModel[] = await PermissionService.findAll();

        res.status(200).json(users);
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
export async function findOne(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const user: IPermissionModel = await PermissionService.findOne(req.params.id);

        res.status(200).json(user);
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
export async function create(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const user: IPermissionModel = await PermissionService.insert(req.body);

        res.status(201).json(user);
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
export async function remove(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const user: IPermissionModel = await PermissionService.remove(req.params.id);

        res.status(200).json(user);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}


export async function init(req: Request, res: Response, next: NextFunction): Promise < void > 
{
    try {
        
        const createRolePerm = {
            name: 'CREATE_ROLE',
            description: 'Can Create a New Role',
            isActive: true,
        };
    
        await PermissionService.insert(<IPermissionModel>createRolePerm)
    
        const readRolePerm = {
            'name': 'READ_ROLE',
            'description': 'Can Create a New Role',
            'isActive': true,
        };
    
        await PermissionService.insert(<IPermissionModel>readRolePerm)
    
    
        const updateRolePerm = {
            'name': 'UPDATE_ROLE',
            'description': 'Can Create a New Role',
            'isActive': true,
        };
    
        await PermissionService.insert(<IPermissionModel>updateRolePerm)
    
    
    
        const deleteRolePerm = {
            'name': 'DELETE_ROLE',
            'description': 'Can Create a New Role',
            'isActive': true,
        };
    
        await PermissionService.insert(<IPermissionModel>deleteRolePerm)
    
    
    
        const userCreatePerm = {
            'name': 'CREATE_USER',
            'description': 'Can Create a New Role',
            'isActive': true,
        };
    
        await PermissionService.insert(<IPermissionModel>userCreatePerm)
    
    
    
        const deleteUserPerm = {
            'name': 'DELETE_USER',
            'description': 'Can Create a New Role',
            'isActive': true,
        };
    
        await PermissionService.insert(<IPermissionModel>deleteUserPerm)
    
    
        const readUserPerm = {
            'name': 'READ_USER',
            'description': 'Can Create a New Role',
            'isActive': true,
        };
    
        await PermissionService.insert(<IPermissionModel>readUserPerm)
    
    
    
        const updateUserPerm = {
            'name': 'UPDATE_USER',
            'description': 'Can Create a New Role',
            'isActive': true,
        };
    
        await PermissionService.insert(<IPermissionModel>updateUserPerm)

        
        
        res.status(201);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
