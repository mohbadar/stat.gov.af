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
    layout: Object;
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

    layout: {
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
    versionKey: true
}).pre('save', async function (next: NextFunction): Promise < void > {
    const widget: any = this;

    try {
        const configJSON = JSON.parse(widget.config);
        const layoutJSON  = JSON.parse(widget.layout);
        const dataJSON = JSON.parse(widget.data)
        widget.config = configJSON;
        widget.data = dataJSON;
        widget.layout = layoutJSON;
        next();
    } catch (error) {
        return next(error);
    }
});


export default connections.db.model < IWidgetModel > ('WidgetModel', WidgetSchema);
