(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('EditZizhiController', EditZizhiController);

    /** @ngInject */
    function EditZizhiController($timeout, $log, $http, $stateParams, $state) {
        var vm = this;
        vm.isnew = true;
        var id;
        vm.getzizhi = function() {
            $http.get(websiteip + "home/zizhi?_id=" + id).success(function(data) {
                vm.zizhi = data.data[0];
                console.log(vm.zizhi)
            }).error(function() {})
        }
        if ($stateParams.id) {
            id = $stateParams.id;
            vm.isnew = false;
            vm.getzizhi()
        }
        console.log(vm.isnew)

        vm.publiczizhi = function() {
            vm.zizhi.zizhi_date = new Date();
            vm.zizhi.zizhi_status = "已发布";
            $http.post(websiteip + "home/zizhi", vm.zizhi).success(function() {
                $log.log("发布成功");
                $state.go('zizhimanage');
            }).error(function(error) {
                $log.log(error)
            })
        }
        vm.savezizhi = function() {
            vm.zizhi.zizhi_date = new Date();
            vm.zizhi.zizhi_status = "未发布";
            $http.post(websiteip + "home/zizhi", vm.zizhi).success(function() {
                $log.log("保存成功");
                $state.go('zizhimanage');
            }).error(function(error) {
                $log.log(error)
            })
        };
        vm.editlog = function() {
            vm.zizhi.zizhi_date = new Date();
            $http.put(websiteip + "home/zizhi/" + id, vm.zizhi).success(function() {
                $log.log("编辑成功");
                $state.go('zizhimanage');
            }).error(function(error) {
                $log.log(error)
            })
        }
    }
})();