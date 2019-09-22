import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';
import app from '../../config/server/server';


/**
 * @export
 * @interface IWidgetModel
 * @extends {Document}
 */
export interface IWidgetModel extends Document {
    name: string;
    user: string;
    data: string;
    config: string;
    query: string;
    dashboard: string;
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


    dashboard: {
        ref: 'DashboardModel',
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
        type: String, 
        lowercase: true, 
        required: false, 
        trim: false, 
        index: false 
    },
}, {
    collection: 'WidgetCollection',
    versionKey: false
});


export default connections.db.model < IWidgetModel > ('WidgetModel', WidgetSchema);
