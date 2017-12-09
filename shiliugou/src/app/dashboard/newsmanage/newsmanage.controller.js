(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('NewsManageController', NewsManageController);

    /** @ngInject */
    function NewsManageController($timeout, $log, $http, $scope) {
        var vm = this;
        vm.limitOptions = [5, 10, 15];
        vm.query = {
            order: '-news_date',
            limit: 5,
            page: 1
        };
        vm.news = [];
        vm.webip = websiteip;
        vm.getdata = function() {
            $http.get(websiteip + "home/news").success(function(data) {
                vm.news = data.data;
                console.log(vm.news)
            }).error(function() {});
        }
        vm.getdata();


        vm.delnews = function(item) {
            $http.delete(websiteip + "home/news/" + item._id).success(function() {
                vm.getdata()
            }).error(function() {})
        }
        vm.pubnews = function(item) {
            $http.put(websiteip + "home/news/" + item._id, {
                "news_status": "已发布"
            }).then(function(res) {
                console.log(res);
                vm.getdata()
            }, function(err) {
                console.log(err)
            })
        }
    }

})();