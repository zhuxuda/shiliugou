(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($http, $mdSidenav, $state, $log, $scope, $interval) {
        var inst = new mdui.Collapse('.mdui-list');
        var vm = this;
        vm.toggleLeft = buildToggler('left');

        function buildToggler(componentId) {
            return function() {
                $mdSidenav(componentId).toggle();
            };
        }

        vm.go = function(state) {
            $mdSidenav("left").toggle();
            $state.go(state);
        }
        vm.godetail = function(state, type) {
            $mdSidenav("left").toggle();
            console.log('type')
            $state.go(state, { type: type });
        }
        vm.dash_main = function() {
            $state.go("word");
        }

        // var getdata = function() {
        //     $http.get(ip + "/website/").success(function(data) {
        //         vm.web = data[0]

        //     }).error(function() {})
        // }
        // getdata();
        vm.isshow = false;
        vm.tolshow = true;
        angular.element("#content").bind("scroll", function(e) {
            // console.log("滚动条剧丁部高度", e.target.scrollTop)
            if (e.target.scrollTop > 100) {
                $scope.$apply(function() {
                    vm.isshow = true;
                    vm.tolshow = false;
                })

            } else {
                $scope.$apply(function() {
                    vm.isshow = false;
                    vm.tolshow = true;
                })
            }
        })
        vm.backtop = function() {
            var now = angular.element("#content").scrollTop()
            var height = now / 20;
            var interval = $interval(function() {
                angular.element("#content").scrollTop(angular.element("#content").scrollTop() - height);
                if (angular.element("#content").scrollTop() == 0) {
                    $interval.cancel(interval);
                }
            }, 30);
        };
        //设备基本信息
        var getdata = function() {
            $http.get(websiteip + "home/site_conf").success(function(data) {
                vm.message = data.data[0];
            }).error(function() {});

        }
        getdata();
    }
})();