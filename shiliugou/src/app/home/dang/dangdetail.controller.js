(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('DangdetailController', DangdetailController);

    /** @ngInject */
    function DangdetailController($http, $stateParams) {
        var vm = this;
        vm.dang = {};
        var id;
        //通知公告
        vm.gettongzhi = function() {
            $http.get(websiteip + "home/dang?_id=" + id).success(function(data) {
                vm.dang = data.data[0];
                console.log("dang", vm.dang)
            }).error(function() {})
        }

        if ($stateParams.id) {
            id = $stateParams.id;
            vm.gettongzhi()
        }
    }
})();