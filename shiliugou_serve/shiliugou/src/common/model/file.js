'use strict';
/**
 * model
 */
export default class extends think.model.mongo {
    async getfile(value) {
        let data = await this.where(value).select();
        return data;
    }
    async deletefile(value) {
        let data = await this.where(value).delete();
        return data;
    }
}