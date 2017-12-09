(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('XiangcunManageController', XiangcunManageController);

    /** @ngInject */
    function XiangcunManageController($timeout, $log, $http, $scope) {
        var vm = this;
        vm.limitOptions = [5, 10, 15];
        vm.query = {
            order: '-village_special_date',
            limit: 5,
            page: 1
        };
        vm.webip = websiteip
        vm.village_special = [];
        vm.getdata = function() {
            $http.get(websiteip + "home/village_special").success(function(data) {
                vm.village_special = data.data;
                console.log(vm.village_special)
            }).error(function() {});
        }
        vm.getdata();


        vm.delvillage_special = function(item) {
            $http.delete(websiteip + "home/village_special/" + item._id).success(function() {
                vm.getdata()
            }).error(function() {})
        }
        vm.pubvillage_special = function(item) {
            $http.put(websiteip + "home/village_special/" + item._id, {
                "village_special_status": "已发布"
            }).then(function(res) {
                console.log(res);
                vm.getdata()
            }, function(err) {
                console.log(err)
            })
        }
    }

})();