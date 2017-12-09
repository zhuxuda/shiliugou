(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('minsuDetailController', minsuDetailController);
    /** @ngInject */
    function minsuDetailController($http, $stateParams) {
        var vm = this;
        vm.isnew = true;
        vm.minsu = {};
        vm.comment = "";
        vm.webip = websiteip;
        var id;
        vm.getminsu = function() {
            $http.get(websiteip + "home/village_special?_id=" + id).success(function(data) {
                vm.minsu = data.data[0];
                console.log("minsu", vm.minsu)
            }).error(function() {})
        }
        if ($stateParams.id) {
            id = $stateParams.id;
            vm.isnew = false;
            vm.getminsu()
        }
        console.log(vm.isnew)

    }
})();