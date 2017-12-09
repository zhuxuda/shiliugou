'use strict';
/**
 * model
 */
export default class extends think.model.mongo {
    async getsite_conf(value) {
        let data = await this.where(value).field('name,logo,First_title,img1,img2,img3,banquan,email,jingdu,weidu,phone,location,webabout,fupinabout').select();
        return data;
    }
}