import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';
import app from '../../config/server/server';


/**
 * @export
 * @interface IQueryModel
 * @extends {Document}
 */
export interface IQueryModel extends Document {
    name: string;
    user: string;
    data: string;
    config: string;
}


const QuerySchema: Schema = new Schema({
    name: { 
        type: String, 
        lowercase: false, 
        required: true, 
        trim: true, 
        index: true 
    },

    user: {
        ref: 'UserModel',
        type: Schema.Types.ObjectId,
        // type:String
    },

    data: { 
        type: String, 
        lowercase: false, 
        required: false, 
        trim: false, 
        index: false 
    },

    config: { 
        type: String, 
        lowercase: false, 
        required: false, 
        trim: false, 
        index: false 
    },
}, {
    collection: 'QueryCollection',
    versionKey: false
});


export default connections.db.model < IQueryModel > ('QueryModel', QuerySchema);
