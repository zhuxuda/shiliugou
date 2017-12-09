'use strict';
/**
 * model
 */
export default class extends think.model.mongo {
    async getcounter(value) {
        let data = await this.where(value).select();
        return data;
    }
}