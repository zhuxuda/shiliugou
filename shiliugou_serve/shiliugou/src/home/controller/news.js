'use strict';
/**
 * rest controller
 * @type {Class}
 */
export default class extends think.controller.rest {
    /**
     * init
     * @param  {Object} http []
     * @return {}      []
     */
    init(http) {
        super.init(http);
    }
    async getAction() {
        let data;
        data = await this.model('news').getnews(this.get());
        return this.success(data);
    };

    /**
     * before magic method
     * @return {Promise} []
     */
    __before() {

    }
}