(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('DashboardController', DashboardController);

    /** @ngInject */
    function DashboardController($http, $mdSidenav, $state, $auth) {
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
        vm.logout = function() {
            $auth.logout()
                .then(function() {
                    $state.go("home")
                });
        }
        vm.gohome = function() {
            $state.go("home")
        }
    }
})();