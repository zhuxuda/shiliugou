(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('WordsController', WordsController);

    /** @ngInject */
    function WordsController($scope, $http) {
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
            $http.get(websiteip + "home/file/get?type=zhengce").success(function(data) {
                vm.file = data.data;
                console.log(vm.file)
            }).error(function() {});
        }
        vm.getdata();
    }
})();