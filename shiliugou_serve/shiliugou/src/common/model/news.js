'use strict';

/**
 * model
 */
export default class extends think.model.mongo {
    async getnews(value) {
        let data;

        if (value._id) {
            data = await this.where(value).select();
            return data;
        } else {
            if (value.newspage) {
                return data = await this.where({}).order('news_date DESC').field('_id,news_title,news_img,news_date,news_status,news_author').page(value.newspage, 6).countSelect();
            } else {
                return data = await this.where({}).order('news_date DESC').field('_id,news_title,news_img,news_date,news_status,news_author').select();
            }
        }
    }

}