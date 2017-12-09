(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('FupinManageController', FupinManageController)
        .controller('addFupinController', addFupinController)
        .controller('editFupinController', editFupinController);

    /** @ngInject */
    function FupinManageController($http, $timeout, $log, $mdDialog) {
        var vm = this;

        vm.fupin = [];
        vm.getdatafupin = function() {
            $http.get(websiteip + "home/counter").success(function(data) {
                vm.fupin = data.data;
                console.log(vm.fupin)
            }).error(function() {});
        }
        vm.getdatafupin();

        vm.addItem = function(event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'addFupinController',
                controllerAs: 'vm',
                focusOnOpen: false,
                targetEvent: event,
                templateUrl: 'add-fupin-dialog.html'
            }).finally(function() {
                vm.getdatafupin();
            });
        }
        vm.editfupin = function(item) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'editFupinController',
                controllerAs: 'vm',
                focusOnOpen: false,
                targetEvent: event,
                templateUrl: 'edit-fupin-dialog.html',
                resolve: {
                    items: function() {
                        return item
                    }
                }
            }).finally(function() {
                vm.getdatafupin();
            })
        }
        vm.delfupin = function(item) {
            $http.delete(websiteip + "home/counter/" + item._id).success(function() {
                vm.getdatafupin()
            }).error(function() {})
        }



        vm.websiteip = websiteip;
        vm.limitOptions = [5, 10, 15];
        vm.query = {
            order: '-time',
            limit: 5,
            page: 1
        };
        vm.file = [];
        vm.getdatafile = function() {
            $http.get(websiteip + "home/file/get?type=fupin").success(function(data) {
                vm.file = data.data;
                console.log(vm.file)
            }).error(function() {});
        }
        vm.getdatafile();


        vm.delfile = function(item) {
            $http.delete(websiteip + "file/delete?_id=" + item._id).success(function(res) {
                console.log(res)
                vm.getdatafile()
            }).error(function() {})
        }

        vm.onSubmitClick = function(files) {
            var form = new FormData();
            form.append("file", files[0].lfFile);
            form.append('type', 'fupin');
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
                    vm.getdatafile();
                },
                error: function(err) {
                    console.log(err)
                }
            });
        }
    }

    function addFupinController($http, $log, $mdDialog) {
        var vm = this;
        vm.fupin = {};
        vm.submitbooks = function() {
            $http.post(websiteip + "home/counter/", vm.fupin).success(function() {
                $mdDialog.hide()
            }).error(function() {})
        }
    }

    function editFupinController(items, $log, $http, $mdDialog) {
        var vm = this;
        vm.fupin = angular.copy(items)
        vm.submit = function() {
            $http.put(websiteip + "home/counter/" + vm.fupin._id, vm.fupin).success(function() {
                $mdDialog.hide();
                // alert("修改成功");
            }).error(function(err) {
                // $log.log(err)
                alert("修改失败", err);
            })
        }
        vm.quxiao = function() {
            $mdDialog.hide();
        }
    }

})();