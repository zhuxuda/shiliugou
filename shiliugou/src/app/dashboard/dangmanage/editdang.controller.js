(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('EditDangController', EditDangController);

    /** @ngInject */
    function EditDangController($timeout, $log, $http, $stateParams, $state) {
        var vm = this;
        vm.isnew = true;
        var id;
        vm.getdang = function() {
            $http.get(websiteip + "home/dang?_id=" + id).success(function(data) {
                vm.dang = data.data[0];
                console.log(vm.dang)
            }).error(function() {})
        }
        if ($stateParams.id) {
            id = $stateParams.id;
            vm.isnew = false;
            vm.getdang()
        }
        console.log(vm.isnew)

        vm.publicdang = function() {
            vm.dang.dang_date = new Date();
            vm.dang.dang_status = "已发布";
            $http.post(websiteip + "home/dang", vm.dang).success(function() {
                $log.log("发布成功");
                $state.go('dangmanage');
            }).error(function(error) {
                $log.log(error)
            })
        }
        vm.savedang = function() {
            vm.dang.dang_date = new Date();
            vm.dang.dang_status = "未发布";
            $http.post(websiteip + "home/dang", vm.dang).success(function() {
                $log.log("保存成功");
                $state.go('dangmanage');
            }).error(function(error) {
                $log.log(error)
            })
        };
        vm.editlog = function() {
            vm.dang.dang_date = new Date();
            $http.put(websiteip + "home/dang/" + id, vm.dang).success(function() {
                $log.log("编辑成功");
                $state.go('dangmanage');
            }).error(function(error) {
                $log.log(error)
            })
        }
    }
})();