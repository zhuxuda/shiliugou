(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('TongZhiDetailController', TongZhiDetailController);
    /** @ngInject */
    function TongZhiDetailController($http, $stateParams) {
        var vm = this;
        vm.istongzhi = true;
        vm.notice = {};
        var id;
        //通知公告
        vm.gettongzhi = function() {
            $http.get(websiteip + "home/notice?_id=" + id).success(function(data) {
                vm.notice = data.data[0];
                console.log("通知", vm.notice)
                    //console.log(n._id)
            }).error(function() {})
        }

        if ($stateParams.id) {
            id = $stateParams.id;
            vm.istongzhi = false;
            vm.gettongzhi()
        }
        console.log(vm.istongzhi)
    }
})();