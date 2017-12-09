(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('TongzhiManageController', TongzhiManageController);

    /** @ngInject */
    function TongzhiManageController($timeout, $log, $http, $scope) {
        var vm = this;
        vm.limitOptions = [5, 10, 15];
        vm.query = {
            order: '-notice_date',
            limit: 5,
            page: 1
        };
        vm.tongzhi = [];
        vm.getdata = function() {
            $http.get(websiteip + "home/notice").success(function(data) {
                vm.tongzhi = data.data;
                console.log(vm.tongzhi)
            }).error(function() {});
        }
        vm.getdata();


        vm.deltongzhi = function(item) {
            $http.delete(websiteip + "home/notice/" + item._id).success(function() {
                vm.getdata()
            }).error(function() {})
        }
        vm.pubtongzhi = function(item) {
            $http.put(websiteip + "home/notice/" + item._id, {
                "notice_status": "已发布"
            }).then(function(res) {
                console.log(res);
                vm.getdata()
            }, function(err) {
                console.log(err)
            })
        }
    }
})();