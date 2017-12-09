(function() {
    'use strict';
    angular
        .module('shiliugou', [
            'ngAnimate',
            'ngCookies',
            'ngSanitize',
            'ngMessages',
            'ngAria',
            'ui.router',
            'ngMaterial', //material
            'toastr', //提示框
            'leaflet-directive', //地图
            'md.data.table', //material样式的表格
            'smart-table', //bootstrap 样式的表格
            'angular-loading-bar', //网页顶部的进度条
            'textAngular', //富文本编辑器
            'satellizer', //认证模块
            'angular-timeline', //时间线
            'angular-scroll-animate', //时间线动画
            'angularFileUpload', //文件上传
            'lfNgMdFileInput'
        ]);
})();