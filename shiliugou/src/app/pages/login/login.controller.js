(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($state, $http, $auth) {
        var vm = this;
        vm.user = {};
        vm.login = function() {
            $http.post(websiteip + 'user/login', vm.user).then(function(res) {
                    if (res.data.errno != 0) {
                        alert("登录失败");
                    } else {
                        // alert("登录成功");
                        $auth.setToken(res.data.data.token);
                        $state.go("systemmanage");
                    }
                }, function(err) {
                    alert('登录失败')
                })
                // if (vm.user.name == "shiliugou") {
                //     if (vm.user.password == "hebeusiee")
                //         $state.go("systemmanage");
                // } else {
                //     console.log("用户名不正确")
                // }
        }
    }
})();