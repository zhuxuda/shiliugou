(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('EditShanxiangController', EditShanxiangController);

    /** @ngInject */
    function EditShanxiangController($timeout, $log, $http, $stateParams, $q, $state) {
        var vm = this;
        vm.isnew = true;
        vm.village_view = {};
        vm.img = [];
        vm.webip = websiteip;

        var id;
        vm.getvillage_view = function() {
            $http.get(websiteip + "home/village_view?_id=" + id).success(function(data) {
                vm.village_view = data.data[0];
                console.log(vm.village_view)
            }).error(function() {})
        }
        if ($stateParams.id) {
            id = $stateParams.id;
            vm.isnew = false;
            vm.getvillage_view()
        }
        console.log(vm.isnew)

        vm.publicvillage_view = function() {
            vm.village_view.village_view_date = new Date();
            vm.village_view.village_view_status = "已发布";
            $http.post(websiteip + "home/village_view", vm.village_view).success(function() {
                $log.log("发布成功");
                $state.go('shanxiangmanage');
            }).error(function(error) {
                $log.log(error)
            })
        }
        vm.savevillage_view = function() {
            vm.village_view.village_view_date = new Date();
            vm.village_view.village_view_status = "未发布";
            $http.post(websiteip + "home/village_view", vm.village_view).success(function() {
                $log.log("保存成功");
                $state.go('shanxiangmanage');
            }).error(function(error) {
                $log.log(error)
            })
        };
        vm.editlog = function() {
            vm.village_view.village_view_date = new Date();
            $http.put(websiteip + "home/village_view/" + id, vm.village_view).success(function() {
                $log.log("编辑成功");
                $state.go('shanxiangmanage');
            }).error(function(error) {
                $log.log(error)
            })
        }
        vm.onSubmitClick = function(files) {
            var form = new FormData();
            form.append("file", files[0].lfFile);
            form.append('type', 'img');
            console.log(form.get('file'))
            getimg(form).then(function(res) {
                vm.village_view.village_view_img = websiteip + "file/download?_id=" + res.data._id
            }, function(err) {
                console.log(err)
            })
        }
        var getimg = function(form) {
            var deferred = $q.defer();
            $.ajax({
                url: websiteip + 'file/upload',
                type: 'POST',
                data: form,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function(res) {
                    deferred.resolve(res);
                },
                error: function(err) {
                    deferred.reject(err)
                }
            });
            return deferred.promise;
        }
    }
})();