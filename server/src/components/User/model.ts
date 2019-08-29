import * as bcrypt from 'bcrypt';
import * as connections from '../../config/connection/connection';
import * as crypto from 'crypto';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import app from '../../config/server/server';

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends Document {
    fullName: string;
    username: string;
    mobileNumber: string;
    email: string;
    password: string;
    lastLogin: Date;
    passwordResetToken: string;
    passwordResetExpires: Date;
    tokens: AuthToken[];

    comparePassword: (password: string) => Promise < boolean > ;
    gravatar: (size: number) => string;
}

export type AuthToken = {
    token: string,
    kind: string
};

const UserSchema: Schema = new Schema({
    fullName: { 
        type: String, 
        lowercase: true, 
        required: true, 
        trim: true, 
        index: true 
    },
    username: { 
        type: String, 
        lowercase: true, 
        required: true, 
        trim: true, 
        unique: true, 
        index: true 
    },
    mobileNumber: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 1
    },
    password: String,
    lastLogin: { 
        type: Date, 
        required: true, 
        default: Date.now() 
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    tokens: Array,
}, {
    collection: 'UserCollection',
    versionKey: false
}).pre('save', async function (next: NextFunction): Promise < void > {
    const user: any = this; // tslint:disable-line

    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt: string = await bcrypt.genSalt(10);

        const hash: string = await bcrypt.hash(user.password, salt);

        user.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

/**
 * Method for comparing passwords
 */
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise < boolean > {
    try {
        const match: boolean = await bcrypt.compare(candidatePassword, this.password);

        return match;
    } catch (error) {
        return error;
    }
};

/**
 * Helper method for getting user's gravatar.
 */
UserSchema.methods.gravatar = function (size: number): string {
    if (!size) {
        size = 200;
    }
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5: string = crypto.createHash('md5').update(this.email).digest('hex');

    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

export default connections.db.model < IUserModel > ('UserModel', UserSchema);
