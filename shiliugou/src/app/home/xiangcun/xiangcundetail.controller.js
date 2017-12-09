(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('xiangcunDetailController', xiangcunDetailController);
    /** @ngInject */
    function xiangcunDetailController($http, $stateParams) {
        var vm = this;
        vm.xiangcun = {};
        var type;
        vm.getxiangcun = function() {
            $http.get(websiteip + "home/village_special?village_special_type=" + type).success(function(data) {
                vm.xiangcun = data.data[0];
                console.log(type, vm.xiangcun)
            }).error(function() {})
        }
        if ($stateParams.type) {
            type = $stateParams.type;
            vm.getxiangcun()
        }
    }
})();