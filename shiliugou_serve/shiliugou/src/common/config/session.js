'use strict';

/**
 * session configs
 */
export default {
    name: 'shiliugou',
    type: 'file',
    secret: '7^3%PDUT',
    timeout: 24 * 3600,
    cookie: { // cookie options
        length: 32,
        httponly: true
    },
    adapter: {
        file: {
            path: think.RUNTIME_PATH + '/session',
        }
    }
};