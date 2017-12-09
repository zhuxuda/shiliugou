(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('FupinController', FupinController);

    /** @ngInject */
    function FupinController($scope, $http) {
        var vm = this;
        vm.fupin = [];
        vm.getdata = function() {
            $http.get(websiteip + "home/counter").success(function(data) {
                vm.fupin = data.data;
                console.log("数据", vm.fupin)
            }).error(function() {});
        }
        vm.getdata();

        vm.websiteip = websiteip;
        vm.limitOptions = [5, 10, 15];
        vm.query = {
            order: '-time',
            limit: 5,
            page: 1
        };
        vm.file = [];
        vm.getdatafile = function() {
            $http.get(websiteip + "home/file/get?type=fupin").success(function(data) {
                vm.file = data.data;
                console.log(vm.file)
            }).error(function() {});
        }
        vm.getdatafile();
    }
})();