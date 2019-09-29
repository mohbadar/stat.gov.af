import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';
import app from '../../config/server/server';
import { NextFunction } from 'express-serve-static-core';
import { config } from 'dotenv';


/**
 * @export
 * @interface IQueryModel
 * @extends {Document}
 */
export interface IQueryModel extends Document {
    name: string;
    user: string;
    data: Object;
    config: Object;
    createdAt: String;
    uuid: Object;
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
        type: Object, 
        lowercase: false, 
        required: false, 
        trim: false, 
        index: false 
    },

    config: { 
        type: Object, 
        lowercase: false, 
        required: false, 
        trim: false, 
        index: false 
    },

    uuid: {
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
    collection: 'QueryCollection',
    versionKey: false
}).pre('save', async function (next: NextFunction): Promise < void > {
    const query: any = this;

    try {
//         const configJSON = JSON.parse(query.config));
//         const dataJSON = JSON.parse(query.data);
//         const uuidJson = JSON.parse(query.uuid);
//         query.config = configJSON;
//         query.data = dataJSON;
//         query.uuid = uuidJson;
//         console.log("JSON DATA: ", query.config);
        
        next();
    } catch (error) {
        return next(error);
    }
});



export default connections.db.model < IQueryModel > ('QueryModel', QuerySchema);
