(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('DangManageController', DangManageController);

    /** @ngInject */
    function DangManageController($timeout, $log, $http, $scope) {
        // var vm = this;
        // vm.limitOptions = [5, 10, 15];
        // vm.query = {
        //     order: '-dang_date',
        //     limit: 5,
        //     page: 1
        // };
        // vm.dang = [];
        // vm.getdata = function() {
        //     $http.get(websiteip + "home/dang").success(function(data) {
        //         vm.dang = data.data;
        //         console.log(vm.dang)
        //     }).error(function() {});
        // }
        // vm.getdata();


        // vm.deldang = function(item) {
        //     $http.delete(websiteip + "home/dang/" + item._id).success(function() {
        //         vm.getdata()
        //     }).error(function() {})
        // }
        // vm.pubdang = function(item) {
        //     $http.put(websiteip + "home/dang/" + item._id, {
        //         "dang_status": "已发布"
        //     }).then(function(res) {
        //         console.log(res);
        //         vm.getdata()
        //     }, function(err) {
        //         console.log(err)
        //     })
        // }
        var vm = this;
        vm.websiteip = websiteip;
        vm.limitOptions = [5, 10, 15];
        vm.query = {
            order: '-time',
            limit: 5,
            page: 1
        };
        vm.file = [];
        vm.getdata = function() {
            $http.get(websiteip + "home/file/get?type=dang").success(function(data) {
                vm.file = data.data;
                console.log(vm.file)
            }).error(function() {});
        }
        vm.getdata();


        vm.delfile = function(item) {
            $http.delete(websiteip + "file/delete?_id=" + item._id).success(function(res) {
                console.log(res)
                vm.getdata()
            }).error(function() {})
        }

        vm.onSubmitClick = function(files) {
            var form = new FormData();
            form.append("file", files[0].lfFile);
            form.append('type', 'dang');
            console.log(form.get('file'))
            $.ajax({
                url: websiteip + "file/upload",
                type: 'POST',
                data: form,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function(res) {
                    console.log(res);
                    vm.getdata();
                },
                error: function(err) {
                    console.log(err)
                }
            });
        }
    }
})();