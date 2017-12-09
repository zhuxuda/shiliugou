(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('EditTongZhiController', EditTongZhiController);

    /** @ngInject */
    function EditTongZhiController($timeout, $log, $http, $stateParams, $state) {
        var vm = this;
        vm.isnew = true;
        var id;
        vm.gettongzhi = function() {
            $http.get(websiteip + "home/notice?_id=" + id).success(function(data) {
                vm.tongzhi = data.data[0];
                console.log(vm.tongzhi)
            }).error(function() {})
        }
        if ($stateParams.id) {
            id = $stateParams.id;
            vm.isnew = false;
            vm.gettongzhi()
        }
        console.log(vm.isnew)

        vm.publictongzhi = function() {
            vm.tongzhi.notice_date = new Date();
            vm.tongzhi.notice_status = "已发布";
            $http.post(websiteip + "home/notice", vm.tongzhi).success(function() {
                $log.log("发布成功");
                $state.go('tongzhimanage');
            }).error(function(error) {
                $log.log(error)
            })
        }
        vm.savetongzhi = function() {
            vm.tongzhi.notice_date = new Date();
            vm.tongzhi.notice_status = "未发布";
            $http.post(websiteip + "home/notice", vm.tongzhi).success(function() {
                $log.log("保存成功");
                $state.go('tongzhimanage');
            }).error(function(error) {
                $log.log(error)
            })
        };
        vm.editlog = function() {
            vm.tongzhi.notice_date = new Date();
            $http.put(websiteip + "home/notice/" + id, vm.tongzhi).success(function() {
                $log.log("编辑成功");
                $state.go('tongzhimanage');
            }).error(function(error) {
                $log.log(error)
            })
        }
    }
})();