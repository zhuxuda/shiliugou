(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('ShanxiangManageController', ShanxiangManageController);

    /** @ngInject */
    function ShanxiangManageController($timeout, $log, $http, $scope) {
        var vm = this;
        vm.limitOptions = [5, 10, 15];
        vm.query = {
            order: '-village_view_date',
            limit: 5,
            page: 1
        };
        vm.webip = websiteip
        vm.village_view = [];
        vm.getdata = function() {
            $http.get(websiteip + "home/village_view").success(function(data) {
                vm.village_view = data.data;
                console.log(vm.village_view)
            }).error(function() {});
        }
        vm.getdata();


        vm.delvillage_view = function(item) {
            $http.delete(websiteip + "home/village_view/" + item._id).success(function() {
                vm.getdata()
            }).error(function() {})
        }
        vm.pubvillage_view = function(item) {
            $http.put(websiteip + "home/village_view/" + item._id, {
                "village_view_status": "已发布"
            }).then(function(res) {
                console.log(res);
                vm.getdata()
            }, function(err) {
                console.log(err)
            })
        }
    }

})();