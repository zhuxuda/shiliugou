(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('ZizhiManageController', ZizhiManageController);

    /** @ngInject */
    function ZizhiManageController($timeout, $log, $http, $scope) {
        // var vm = this;
        // vm.limitOptions = [5, 10, 15];
        // vm.query = {
        //     order: '-zizhi_date',
        //     limit: 5,
        //     page: 1
        // };
        // vm.zizhi = [];
        // vm.getdata = function() {
        //     $http.get(websiteip + "home/zizhi").success(function(data) {
        //         vm.zizhi = data.data;
        //         console.log(vm.zizhi)
        //     }).error(function() {});
        // }
        // vm.getdata();


        // vm.delzizhi = function(item) {
        //     $http.delete(websiteip + "home/zizhi/" + item._id).success(function() {
        //         vm.getdata()
        //     }).error(function() {})
        // }
        // vm.pubzizhi = function(item) {
        //     $http.put(websiteip + "home/zizhi/" + item._id, {
        //         "zizhi_status": "已发布"
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
            $http.get(websiteip + "home/file/get?type=zizhi").success(function(data) {
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
            form.append('type', 'zizhi');
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