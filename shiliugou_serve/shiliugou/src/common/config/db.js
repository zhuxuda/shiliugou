'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
    type: 'mongo',
    log_sql: true,
    log_connect: true,
    adapter: {
        mongo: {
            host: '172.16.25.251',
            port: '27017',
            database: 'wugeek',
            user: '',
            password: '',
            prefix: 'think_',
            encoding: 'utf8'
        }
    }
};