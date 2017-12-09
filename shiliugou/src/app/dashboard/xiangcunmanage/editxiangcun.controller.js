(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('EditXiangcunController', EditXiangcunController);

    /** @ngInject */
    function EditXiangcunController($timeout, $log, $http, $stateParams, $q, $state) {
        var vm = this;
        vm.isnew = true;
        vm.village_special = {
            village_special_img: []
        };
        vm.img = [];
        var id;
        vm.webip = websiteip
        vm.getvillage_special = function() {
            $http.get(websiteip + "home/village_special?_id=" + id).success(function(data) {
                vm.village_special = data.data[0];
                console.log(vm.village_special)
            }).error(function() {})
        }
        if ($stateParams.id) {
            id = $stateParams.id;
            vm.isnew = false;
            vm.getvillage_special()
        }
        console.log(vm.isnew)

        vm.publicvillage_special = function() {
            vm.village_special.village_special_date = new Date();
            vm.village_special.village_special_status = "已发布";
            $http.post(websiteip + "home/village_special", vm.village_special).success(function() {
                $log.log("发布成功");
                $state.go('xiangcunmanage');
            }).error(function(error) {
                $log.log(error)
            })
        }
        vm.savevillage_special = function() {
            vm.village_special.village_special_date = new Date();
            vm.village_special.village_special_status = "未发布";
            $http.post(websiteip + "home/village_special", vm.village_special).success(function() {
                $log.log("保存成功");
                $state.go('xiangcunmanage');
            }).error(function(error) {
                $log.log(error)
            })
        };
        vm.editlog = function() {
            vm.village_special.village_special_date = new Date();
            $http.put(websiteip + "home/village_special/" + id, vm.village_special).success(function() {
                $log.log("编辑成功");
                $state.go('xiangcunmanage');
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
                vm.village_special.village_special_img.push(websiteip + "file/download?_id=" + res.data._id)
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