import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';
import app from '../../config/server/server';
import { NextFunction } from 'express-serve-static-core';


/**
 * @export
 * @interface IDashboardModel
 * @extends {Document}
 */
export interface IDashboardModel extends Document {
    name: string;
    user: string;
    layout: Object;
    widgets: [[Object]];  // widgets
    createdAt: string; 
    // updated_at: string;


}


const DashboardSchema: Schema = new Schema({
    name: { 
        type: String, 
        lowercase: true, 
        required: true, 
        trim: true, 
        index: true ,
        unique: true
    },

    user: {
        ref: 'UserModel',
        type: Schema.Types.ObjectId,
        required: true
    },

    widgets: [{ 
        type: String, 
        required: false, 
        trim: false, 
        index: false 
    }],

    layout: { 
        type: Object, 
        lowercase: false, 
        required: false, 
        trim: false, 
        index: false 
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
}, {
    collection: 'DashboardCollection',
    versionKey: false
}).pre('save', async function (next: NextFunction): Promise < void > {
    const dash: any = this;

    try {
        const layoutJSON = JSON.parse(dash.layout);
        // const widgetsJSON = JSON.parse(dash.widgets);
        // dash.widgets = widgetsJSON;
        dash.config = layoutJSON;
        next();
    } catch (error) {
        return next(error);
    }
});
export default connections.db.model < IDashboardModel > ('DashboardModel', DashboardSchema);
