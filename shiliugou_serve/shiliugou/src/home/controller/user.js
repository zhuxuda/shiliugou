'use strict';
import Base from './base.js';
let moment = require('moment');
let jwt = require('jwt-simple');
/**
 * rest controller
 * @type {Class}
 */
export default class extends Base {
    createJWT(user) {
        let payload = {
            sub: user._id,
            iat: moment().unix(),
            exp: moment().add(14, 'days').unix()
        };
        return jwt.encode(payload, this.config('TOKEN_SECRET'));
    }
    async indexAction() {
        //auto render template file index_index.html
        let userInfo = await this.session('userInfo');
        if (userInfo) {
            this.redirect('/admin');
        } else {
            return this.display();
        }
    };
    //登录
    async loginAction() {
        let { username, password } = this.post();
        if (username && password) {
            console.log(username, think.md5(password));
            let model = this.model('site_conf');
            let user = await model.where({ username: username }).find();
            console.log(user)
            if (user.username === username && user.password === think.md5(password)) {
                //console.log('login');
                await this.session('userInfo', user);
                return this.success({ token: this.createJWT(user) })
            } else {
                return this.fail('失败。');
            }
        }
        return this.fail('失败.');
    }

    async registerAction() {
        let { username, password } = this.post();
        let user = await this.model('site_conf').add({
            username: username,
            password: think.md5(password),
        });
        return this.success(user)
    }
    async checkAction() {
        if (!this.http.req.payload) {
            return this.fail("错误//");
        }
        let user = await this.model('site_conf').where({ _id: this.http.req.payload._id }).find();
        if (!user) {
            return this.fail('错误。');
        }
        return this.success('成功');
    }
    async editAction() {

        let { username, oldpwd, newpwd } = this.post();
        console.log(username, oldpwd, newpwd)
        let user = await this.model('site_conf').where({ username: username, password: think.md5(oldpwd) }).update({ password: think.md5(newpwd) });
        return this.success(user)

    }
    __before() {
        console.log(this.http.action)
        if (this.http.action != "login") {
            let token = this.header('token');
            if (!this.header('token')) {
                return this.fail('Please make sure your request has an Authorization header');
            }
            let payload = null;
            try {
                payload = jwt.decode(token, this.config('TOKEN_SECRET'));
            } catch (err) {
                return this.fail("Please make sure your Authorization is ok");
            }
            if (payload.exp <= moment().unix()) {
                return this.fail('Token has expired');
            }
            this.http.req.payload = payload;
        }

        // console.log(this.http)
    }
}