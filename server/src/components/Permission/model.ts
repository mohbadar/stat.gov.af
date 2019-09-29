import * as bcrypt from 'bcrypt';
import * as connections from '../../config/connection/connection';
import * as crypto from 'crypto';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import app from '../../config/server/server';

/**
 * @export
 * @interface IPermissionModel
 * @extends {Document}
 */
export interface IPermissionModel extends Document {
    name: string;
    description: string;
    isActive: boolean;
}

const PermissionSchema: Schema = new Schema({
    name: { 
        type: String, 
        lowercase: true, 
        required: true, 
        trim: true, 
        index: true 
    },
    description: { 
        type: String, 
        lowercase: true, 
        required: true, 
        trim: true, 
        unique: true, 
        index: true 
    },
    isActive: {
        type: Boolean,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        index: true
    }
}, {
    collection: 'PermissionCollection',
    versionKey: false
}).pre('save', async function (next: NextFunction): Promise < void > {
    const perm: any = this; // tslint:disable-line

    try {
        next();
    } catch (error) {
        return next(error);
    }
});


export default connections.db.model < IPermissionModel > ('PermissionModel', PermissionSchema);
