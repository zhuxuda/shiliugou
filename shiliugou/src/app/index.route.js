(function() {
    'use strict';

    angular.module('shiliugou')
        .config(routerConfig)
        .factory('sessionInteceptor', function($q, SatellizerShared, $location) {
            var myInterceptor = {};
            myInterceptor.request = function(requestConfig) {
                requestConfig["headers"]["token"] = SatellizerShared.getToken();
                // console.log('请求', requestConfig);
                return requestConfig;
            };
            myInterceptor.response = function(responseObject) {
                // console.log('响应', responseObject);
                if (responseObject.data.state == 999) {
                    $location.path('/login');
                }
                return responseObject;
            };
            return myInterceptor;
        })
        .config(function($stateProvider, $httpProvider) {
            $httpProvider.interceptors.push('sessionInteceptor');
        });

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        var skipIfLoggedIn = ['$q', '$auth', '$http', function($q, $auth, $http) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }];

        var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $location.path('/login');
            }
            return deferred.promise;
        }];
        $urlRouterProvider.otherwise('main/home');
        $stateProvider
            .state('base', { //base
                abstract: true,
                url: '',
                templateUrl: 'app/template/base.html'
            })
            .state('main', { //template
                url: '/main',
                templateUrl: 'app/template/main/main.html',
                parent: 'base',
                controller: 'MainController',
                controllerAs: 'vm'
            })
            .state('dashboard', { //dashboard
                url: '/dashboard',
                parent: 'base',
                templateUrl: 'app/template/dashboard/dash/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'vm',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('login', { //pages
                url: '/login',
                parent: 'base',
                templateUrl: 'app/pages/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm',
            })
            .state('home', { //home
                url: '/home',
                templateUrl: 'app/home/home/home.html',
                parent: 'main',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .state('tongzhidetail', { //home
                url: '/tongzhidetail/{id}',
                templateUrl: 'app/home/home/tongzhidetail.html',
                parent: 'main',
                controller: 'TongZhiDetailController',
                controllerAs: 'vm'
            })
            .state('newsdetail', { //home
                url: '/newsdetail/{id}',
                templateUrl: 'app/home/home/newsdetail.html',
                parent: 'main',
                controller: 'NewsDetailController',
                controllerAs: 'vm'
            })
            .state('xiangcun', { //home
                url: '/xiangcun',
                templateUrl: 'app/home/xiangcun/xiangcun.html',
                parent: 'main',
                controller: 'XiangcunController',
                controllerAs: 'vm'
            })
            .state('minsu', { //home
                url: '/minsu',
                templateUrl: 'app/home/xiangcun/minsu.html',
                parent: 'main',
                controller: 'minsunController',
                controllerAs: 'vm'
            })
            .state('minsudetail', { //home
                url: '/minsudetail/{id}',
                templateUrl: 'app/home/xiangcun/minsudetail.html',
                parent: 'main',
                controller: 'minsuDetailController',
                controllerAs: 'vm'
            })
            .state('xiangcundetail', { //home
                url: '/xiangcundetail/{type}',
                templateUrl: 'app/home/xiangcun/xiangcundetail.html',
                parent: 'main',
                controller: 'xiangcunDetailController',
                controllerAs: 'vm'
            })
            .state('fupin', { //home
                url: '/fupin',
                templateUrl: 'app/home/fupin/fupin.html',
                parent: 'main',
                controller: 'FupinController',
                controllerAs: 'vm'
            })
            .state('dang', { //home
                url: '/dang',
                templateUrl: 'app/home/dang/dang.html',
                parent: 'main',
                controller: 'DangController',
                controllerAs: 'vm'
            })
            .state('dangdetail', { //home
                url: '/dang/{id}',
                templateUrl: 'app/home/dang/dangdetail.html',
                parent: 'main',
                controller: 'DangdetailController',
                controllerAs: 'vm'
            })
            .state('zizhi', { //home
                url: '/zizhi',
                templateUrl: 'app/home/zizhi/zizhi.html',
                parent: 'main',
                controller: 'ZizhiController',
                controllerAs: 'vm'
            })
            .state('zizhidetail', { //home
                url: '/zizhi/{id}',
                templateUrl: 'app/home/zizhi/zizhidetail.html',
                parent: 'main',
                controller: 'zizhidetailController',
                controllerAs: 'vm'
            })
            .state('words', { //home
                url: '/words',
                templateUrl: 'app/home/words/words.html',
                parent: 'main',
                controller: 'WordsController',
                controllerAs: 'vm'
            })
            .state('systemmanage', { //dashboard
                url: '/systemmanage',
                templateUrl: 'app/dashboard/system/system.html',
                parent: 'dashboard',
                controller: 'SystemManageController',
                controllerAs: 'vm'
            })
            .state('fupinmanage', { //dashboard
                url: '/fupinmanage',
                templateUrl: 'app/dashboard/fupinmanage/fupinmanage.html',
                parent: 'dashboard',
                controller: 'FupinManageController',
                controllerAs: 'vm'
            })
            .state('editfupinmanage', { //dashboard
                url: '/editfupinmanage',
                templateUrl: 'app/dashboard/fupinmanage/editfupinmanage.html',
                parent: 'dashboard',
                controller: 'EditFupinManageController',
                controllerAs: 'vm'
            })
            .state('tongzhimanage', { //dashboard
                url: '/tongzhimanage',
                templateUrl: 'app/dashboard/tongzhimanage/tongzhimanage.html',
                parent: 'dashboard',
                controller: 'TongzhiManageController',
                controllerAs: 'vm'
            })
            .state('edittongzhi', {
                url: '/edittongzhi/{id}',
                templateUrl: 'app/dashboard/tongzhimanage/edittongzhi.html',
                parent: 'dashboard',
                controller: 'EditTongZhiController',
                controllerAs: 'vm'
            })
            .state('newsmanage', { //dashboard
                url: '/newsmanage',
                templateUrl: 'app/dashboard/newsmanage/newsmanage.html',
                parent: 'dashboard',
                controller: 'NewsManageController',
                controllerAs: 'vm'
            })
            .state('editnews', {
                url: '/editnews/{id}',
                templateUrl: 'app/dashboard/newsmanage/editnews.html',
                parent: 'dashboard',
                controller: 'EditNewsController',
                controllerAs: 'vm'
            })
            .state('shanxiangmanage', { //dashboard
                url: '/shanxiangmanage',
                templateUrl: 'app/dashboard/shanxiangmanage/shanxiangmanage.html',
                parent: 'dashboard',
                controller: 'ShanxiangManageController',
                controllerAs: 'vm'
            })
            .state('editshanxiang', {
                url: '/editshanxiang/{id}',
                templateUrl: 'app/dashboard/shanxiangmanage/editshanxiang.html',
                parent: 'dashboard',
                controller: 'EditShanxiangController',
                controllerAs: 'vm'
            })
            .state('xiangcunmanage', { //dashboard
                url: '/xiangcunmanage',
                templateUrl: 'app/dashboard/xiangcunmanage/xiangcunmanage.html',
                parent: 'dashboard',
                controller: 'XiangcunManageController',
                controllerAs: 'vm'
            })
            .state('editxiangcun', { //dashboard
                url: '/editxiangcun/{id}',
                templateUrl: 'app/dashboard/xiangcunmanage/editxiangcun.html',
                parent: 'dashboard',
                controller: 'EditXiangcunController',
                controllerAs: 'vm'
            })
            .state('dangmanage', { //dashboard
                url: '/dangmanage',
                templateUrl: 'app/dashboard/dangmanage/dangmanage.html',
                parent: 'dashboard',
                controller: 'DangManageController',
                controllerAs: 'vm'
            })
            .state('editdang', { //dashboard
                url: '/editdang/{id}',
                templateUrl: 'app/dashboard/dangmanage/editdang.html',
                parent: 'dashboard',
                controller: 'EditDangController',
                controllerAs: 'vm'
            })
            .state('zizhimanage', { //dashboard
                url: '/zizhimanage',
                templateUrl: 'app/dashboard/zizhimanage/zizhimanage.html',
                parent: 'dashboard',
                controller: 'ZizhiManageController',
                controllerAs: 'vm'
            })
            .state('editzizhi', { //dashboard
                url: '/editzizhi/{id}',
                templateUrl: 'app/dashboard/zizhimanage/editzizhi.html',
                parent: 'dashboard',
                controller: 'EditZizhiController',
                controllerAs: 'vm'
            })
            .state('filemanage', { //dashboard
                url: '/filemanage',
                templateUrl: 'app/dashboard/filemanage/filemanage.html',
                parent: 'dashboard',
                controller: 'filemanageController',
                controllerAs: 'vm'
            })
    }

})();