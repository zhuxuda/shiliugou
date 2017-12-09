'use strict';
/**
 * model
 */
export default class extends think.model.mongo {
    async getvillage_view(value) {
        let data;


        if (value._id) {
            data = await this.where(value).select();
            return data;
        } else {
            if (value.imgpage) {
                return data = await this.where({}).order('village_view_date DESC').page(value.imgpage, 6).countSelect();
            } else {
                return data = await this.where({}).order('village_view_date DESC').select();
            }
        }
    }
}