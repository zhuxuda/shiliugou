'use strict';
/**
 * model
 */
export default class extends think.model.mongo {
    async getnotice(value) {
        console.log(value)
        let data
        if (value._id) {
            data = await this.where(value).select();
            return data;
        } else {
            if (value.noticepage) {
                return data = await this.where({}).order('notice_date DESC').field('_id,notice_title,notice_author,notice_date,notice_status,notice_author').page(value.noticepage, 4).countSelect();
            } else {
                return data = await this.where({}).order('notice_date DESC').field('_id,notice_title,notice_author,notice_date,notice_status,notice_author').select();
            }
        }

    }
}