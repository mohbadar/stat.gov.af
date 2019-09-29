import * as bcrypt from 'bcrypt';
import * as connections from '../../config/connection/connection';
import * as crypto from 'crypto';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import app from '../../config/server/server';

/**
 * @export
 * @interface IRoleModel
 * @extends {Document}
 */
export interface IRoleModel extends Document {
    name: string;
    description: string;
    isActive: boolean;
    permissions: [[Object]]
}

const RoleSchema: Schema = new Schema({
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
    },
    permissions: { 
        type: [[Object]], 
        required: true, 
        trim: false, 
        index: false 
    },
}, {
    collection: 'RoleCollection',
    versionKey: false
}).pre('save', async function (next: NextFunction): Promise < void > {
    const role: any = this; // tslint:disable-line

    try {
        next();
    } catch (error) {
        return next(error);
    }
});


export default connections.db.model < IRoleModel > ('RoleModel', RoleSchema);
