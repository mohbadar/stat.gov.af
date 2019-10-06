import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';
import app from '../../config/server/server';
import { NextFunction } from 'express-serve-static-core';


/**
 * @export
 * @interface IWidgetModel
 * @extends {Document}
 */
export interface IWidgetModel extends Document {
    name: string;
    user: string;
    config: Object;
    data: Object;
    createdAt: string;
}


const WidgetSchema: Schema = new Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        index: true
    },

    user: {
        ref: 'UserModel',
        type: Schema.Types.ObjectId,
        required:true
    },


    data: {
        type: String,
        required: true,
        trim: false,
        index: false
    },

    config: {
        type: Object,
        required: false,
        trim: false,
        index: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

}, {
    collection: 'WidgetCollection',
    versionKey: false
}).pre('save', async function (next: NextFunction): Promise<void> {
    const widget: any = this;

    try {
        const configJSON = JSON.parse(widget.config);
        const dataJSON = JSON.parse(widget.data)
        widget.config = configJSON;
        widget.data = dataJSON;

        next();
    } catch (error) {
        return next(error);
    }
});


export default connections.db.model<IWidgetModel>('WidgetModel', WidgetSchema);
