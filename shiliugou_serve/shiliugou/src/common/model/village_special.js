'use strict';
/**
 * model
 */
export default class extends think.model.mongo {
    async getvillage_special(value) {
        let data = await this.where(value).select();
        return data;
    }
}