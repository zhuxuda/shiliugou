(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('EditNewsController', EditNewsController);

    /** @ngInject */
    function EditNewsController($timeout, $log, $http, $stateParams, $q, $state) {
        var vm = this;
        vm.isnew = true;
        vm.news = {
            news_img: []
        };
        vm.img = [];
        vm.webip = websiteip;
        var id;
        vm.getnews = function() {
            $http.get(websiteip + "home/news?_id=" + id).success(function(data) {
                vm.news = data.data[0];
                console.log(vm.news)
            }).error(function() {})
        }
        if ($stateParams.id) {
            id = $stateParams.id;
            vm.isnew = false;
            vm.getnews()
        }
        console.log(vm.isnew)

        vm.publicnews = function() {
            vm.news.news_date = new Date();
            vm.news.news_status = "已发布";
            $http.post(websiteip + "home/news", vm.news).success(function() {
                $log.log("发布成功");
                $state.go('newsmanage');
            }).error(function(error) {
                $log.log(error)
            })
        }
        vm.savenews = function() {
            vm.news.news_date = new Date();
            vm.news.news_status = "未发布";
            $http.post(websiteip + "home/news", vm.news).success(function() {
                $log.log("保存成功");
                $state.go('newsmanage');
            }).error(function(error) {
                $log.log(error)
            })
        };
        vm.editlog = function() {
            vm.news.news_date = new Date();
            $http.put(websiteip + "home/news/" + id, vm.news).success(function() {
                $log.log("编辑成功");
                $state.go('newsmanage');
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
                console.log(res.data);
                vm.news.news_img.push(websiteip + "file/download?_id=" + res.data._id)
            }, function(err) {
                console.log(err)
            })
        };
        vm.remove = function(img) {
            vm.news.news_img.splice(vm.news.news_img.indexOf(img), 1);
        };
        // var getimg = function(form) {
        //     var deferred = $q.defer();
        //     $.ajax({
        //         url: 'http://172.16.25.30:8080/upload_picture/v1.0/upload',
        //         type: 'POST',
        //         data: form,
        //         async: false,
        //         cache: false,
        //         contentType: false,
        //         processData: false,
        //         success: function(res) {
        //             deferred.resolve(res);
        //         },
        //         error: function(err) {
        //             deferred.reject(err)
        //         }
        //     });
        //     return deferred.promise;
        // }
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