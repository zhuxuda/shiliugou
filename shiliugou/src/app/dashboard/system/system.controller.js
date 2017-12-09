(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('SystemManageController', SystemManageController);

    /** @ngInject */
    function SystemManageController($http, $state, $mdToast, $q, $auth) {
        var vm = this;
        vm.system = {};

        $http.get(websiteip + "home/site_conf").success(function(data) {
            vm.system = data.data[0];
            console.log(vm.system)
        }).error(function() {});

        vm.submitwebconfig = function() {
            var r = confirm("是否提交保存");
            if (r == true) {
                $http.put(websiteip + "home/site_conf/" + vm.system._id, vm.system).then(function(res) {
                    console.log(res.data)
                        // $mdToast.show("修改成功").position('top right').hideDelay(3000);
                }, function(err) {
                    console.log(err)
                })
            }
        }
        vm.onSubmitClick1 = function(files) {
            var form = new FormData();
            form.append("file", files[0].lfFile);
            form.append('type', 'img');
            console.log(form.get('file'))
            getimg(form).then(function(res) {
                vm.system.img1 = websiteip + "file/download?_id=" + res.data._id
            }, function(err) {
                console.log(err)
            })
        }
        vm.onSubmitClick2 = function(files) {
            var form = new FormData();
            form.append("file", files[0].lfFile);
            form.append('type', 'img');
            console.log(form.get('file'))
            getimg(form).then(function(res) {
                vm.system.img2 = websiteip + "file/download?_id=" + res.data._id
            }, function(err) {
                console.log(err)
            })
        }
        vm.onSubmitClick3 = function(files) {
            var form = new FormData();
            form.append("file", files[0].lfFile);
            form.append('type', 'img');
            console.log(form.get('file'))
            getimg(form).then(function(res) {
                vm.system.img3 = websiteip + "file/download?_id=" + res.data._id
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
        vm.edituser = function() {
            console.log(vm.user);
            $http.post(websiteip + 'user/edit', vm.user).then(function(res) {
                console.log(res.data);
                if (res.data.data == 0) {
                    alert('修改失败');
                } else {
                    alert('修改成功，跳转到登陆页。');
                    $auth.removeToken();
                    $state.go('login')
                }
            }, function(err) {
                alert('修改失败');
            })
        }
    }
})();