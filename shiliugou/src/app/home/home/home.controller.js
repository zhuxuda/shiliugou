(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController($scope, $document, $http, $location, $anchorScroll, $log) {
        var vm = this;
        vm.message = {};
        vm.new = [];
        vm.notice = [];
        vm.view = [];
        vm.webip = websiteip;
        //设备基本信息
        var getdata = function() {
            $http.get(websiteip + "home/site_conf").success(function(data) {
                vm.message = data.data[0];
                console.log("设备基本信息", vm.message)
            }).error(function() {});

        }
        getdata();

        //新闻
        vm.newspage = 1;
        vm.newsshowxia = true;
        var getnews = function() {
            $http.get(websiteip + "home/news?newspage=" + vm.newspage).success(function(data) {
                vm.new = data.data.data;
                console.log("新闻", data.data.data);
                if (data.data.currentPage == data.data.totalPages) {
                    vm.newsshowxia = false;
                } else {
                    vm.newsshowxia = true;
                }
            }).error(function() {});

        };
        getnews();
        vm.xianews = function() {
            vm.newspage++;
            getnews()
        };
        vm.shangnews = function() {
            vm.newspage--;
            getnews()
        };
        //通知公告
        vm.noticepage = 1;
        vm.noticeshowxia = true;
        var getnotice = function() {
            $http.get(websiteip + "home/notice?noticepage=" + vm.noticepage).success(function(data) {
                vm.notice = data.data.data;
                console.log("通知", data.data)
                if (data.data.currentPage == data.data.totalPages) {
                    vm.noticeshowxia = false;
                } else {
                    vm.noticeshowxia = true;
                }
            }).error(function() {});
        }
        getnotice();
        vm.xianotice = function() {
            vm.noticepage++;
            getnotice()
        };
        vm.shangnotice = function() {
            vm.noticepage--;
            getnotice()
        };
        //山乡美景
        vm.imgpage = 1;
        vm.imgshowxia = true;
        var getimg = function() {
            $http.get(websiteip + "home/village_view?imgpage=" + vm.imgpage).success(function(data) {
                vm.view = data.data.data;
                console.log("美景", data.data.data)
                if (data.data.currentPage == data.data.totalPages) {
                    vm.imgshowxia = false;
                } else {
                    vm.imgshowxia = true;
                }
            }).error(function() {});
        }
        getimg();
        vm.xiaimg = function() {
            vm.imgpage++;
            getimg()
        };
        vm.shangimg = function() {
            vm.imgpage--;
            getimg()
        };







        vm.gettime = function(time) {
            return moment(time).format('YYYY MMMM Do ')
        };
        // vm.showAdvanced = function(url, ev) {
        //     $mdDialog.show({
        //             // controller: DialogController,
        //             template: '<md-dialog aria-label="List dialog"><md-dialog-content class="md-dialog-content extras-image-dialog" ><img alt="图片" src="' + url + '"></md-dialog-content></md-dialog>',
        //             parent: angular.element($document.body),
        //             targetEvent: ev,
        //             clickOutsideToClose: true,
        //             fullscreen: false // Only for -xs, -sm breakpoints.
        //         })
        //         .then(function(answer) {
        //             vm.status = 'You said the information was "' + answer + '".';
        //         }, function() {
        //             vm.status = 'You cancelled the dialog.';
        //         });
        // };

    }
})();