(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('ZizhiController', ZizhiController);

    /** @ngInject */
    function ZizhiController($scope, $http) {
        // var vm = this;
        // vm.limitOptions = [5, 10, 15];
        // vm.query = {
        //     order: '-zizhi_date',
        //     limit: 5,
        //     page: 1
        // };
        // vm.zizhi = [];
        // vm.getdata = function() {
        //     $http.get(websiteip + "home/zizhi").success(function(data) {
        //         vm.zizhi = data.data;
        //         console.log(vm.zizhi)
        //     }).error(function() {});
        // }
        // vm.getdata();
        var vm = this;
        vm.websiteip = websiteip;
        vm.limitOptions = [5, 10, 15];
        vm.query = {
            order: '-time',
            limit: 5,
            page: 1
        };
        vm.file = [];
        vm.getdata = function() {
            $http.get(websiteip + "home/file/get?type=zizhi").success(function(data) {
                vm.file = data.data;
                console.log(vm.file)
            }).error(function() {});
        }
        vm.getdata();


    }
})();