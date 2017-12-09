'use strict';

import Base from './base.js';
import fs from 'fs';
import path from 'path';


export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async uploadAction() {
        //这里的 key 需要和 form 表单里的 name 值保持一致
        let file = this.file('file');
        if (file.size > 10485760) {
            return this.fail(404, '文件太大');
        }
        let filepath = file.path;

        //文件上传后，需要将文件移动到项目其他地方，否则会在请求结束时删除掉该文件
        let uploadPath = think.RESOURCE_PATH + '/static/upload';
        think.mkdir(uploadPath);
        let basename = path.basename(filepath);
        fs.renameSync(filepath, uploadPath + '/' + basename);

        file.path = uploadPath + '/' + basename;

        if (think.isFile(file.path)) {
            console.log('is file')
        } else {
            console.log('not exist')
        }
        file.src = 'static/upload/' + basename;
        file.time = new Date();
        file.type = this.post().type;
        let insertId = await this.model('file').add(file);
        let data = await this.model('file').where({ _id: insertId }).find();
        return this.success(data);
    }
    async downloadAction() {
        let data;
        if (!this.get()._id) {
            return this.fail(404, "参数错误", data);
        }
        data = await this.model('file').getfile({ _id: this.get()._id });
        if (!data || data.length == 0) {
            return this.fail(404, "没有该文件", data);
        }
        return this.download(data[0].path);
        // return this.success(data)
    }
    async getAction() {
        let data;
        data = await this.model('file').getfile(this.get());
        return this.success(data);
    };
    async deleteAction() {
        let data;
        if (!this.get()._id) {
            return this.fail(404, "参数错误", data);
        }
        data = await this.model('file').deletefile(this.get());
        // if (!data || data.length == 0) {
        //     return this.fail(404, "没有该文件", data);
        // }
        return this.success(data);
    }
}