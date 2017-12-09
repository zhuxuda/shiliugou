(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('filemanageController', filemanageController);

    /** @ngInject */
    function filemanageController($timeout, $log, $http, $scope) {
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
            $http.get(websiteip + "home/file/get?type=zhengce").success(function(data) {
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
            form.append('type', 'zhengce');
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