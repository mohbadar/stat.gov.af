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
    query: string;
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


    query: {
        ref: 'QueryModel',
        type: Schema.Types.ObjectId,
    },

    data: { 
        type: String, 
        lowercase: true, 
        required: true, 
        trim: false, 
        index: false 
    },

    config: { 
        type: Object, 
        lowercase: true, 
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
    versionKey: true
}).pre('save', async function (next: NextFunction): Promise < void > {
    const widget: any = this;

    try {
        const configJSON = JSON.parse(widget.config);
        widget.config = configJSON;
        next();
    } catch (error) {
        return next(error);
    }
});


export default connections.db.model < IWidgetModel > ('WidgetModel', WidgetSchema);
