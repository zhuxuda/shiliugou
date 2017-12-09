(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('zizhidetailController', zizhidetailController);

    /** @ngInject */
    function zizhidetailController($http, $stateParams) {
        var vm = this;
        vm.zizhi = {};
        var id;
        //通知公告
        vm.gettongzhi = function() {
            $http.get(websiteip + "home/zizhi?_id=" + id).success(function(data) {
                vm.zizhi = data.data[0];
                console.log("zizhi", vm.zizhi)
            }).error(function() {})
        }

        if ($stateParams.id) {
            id = $stateParams.id;
            vm.gettongzhi()
        }
    }
})();