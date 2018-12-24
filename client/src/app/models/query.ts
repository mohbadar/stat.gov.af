import { each } from 'lodash';

export class Query {

    constructor(data) {
        // Copy properties
        each(data, (v, k) => {
            this[k] = v;
        });
    }
}
