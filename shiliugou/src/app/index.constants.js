/* global malarkey:false, moment:false */
// var websiteip = 'http://221.193.216.51:9001/';
var websiteip = 'http://127.0.0.1:8360/';
(function() {
    'use strict';

    angular
        .module('shiliugou')
        .constant('malarkey', malarkey)
        .constant('moment', moment)
})();