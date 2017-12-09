(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('DangController', DangController);

    /** @ngInject */
    function DangController($scope, $http) {


        // var vm = this;
        // vm.limitOptions = [5, 10, 15];
        // vm.query = {
        //     order: '-dang_date',
        //     limit: 5,
        //     page: 1
        // };
        // vm.dang = [];
        // vm.getdata = function() {
        //     $http.get(websiteip + "home/dang").success(function(data) {
        //         vm.dang = data.data;
        //         console.log(vm.dang)
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
            $http.get(websiteip + "home/file/get?type=dang").success(function(data) {
                vm.file = data.data;
                console.log(vm.file)
            }).error(function() {});
        }
        vm.getdata();
    }
})();