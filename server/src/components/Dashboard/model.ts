import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';
import app from '../../config/server/server';


/**
 * @export
 * @interface IDashboardModel
 * @extends {Document}
 */
export interface IDashboardModel extends Document {
    name: string;
    user: string;
    data: string;
    config: string;
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
    collection: 'DashboardCollection',
    versionKey: false
});


export default connections.db.model < IDashboardModel > ('DashboardModel', WidgetSchema);
