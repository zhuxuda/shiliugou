(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('minsunController', minsunController);

    /** @ngInject */
    function minsunController($http, $scope, $timeout) {
        var vm = this;
        vm.village_special = [];
        vm.webip = websiteip;


        $http.get(websiteip + "home/village_special?village_special_type=山村民宿").then(function(res) {
            vm.village_special = res.data.data;
            // res.data.data.forEach(function(element) {
            //     element.village_special_img.forEach(function(el) {
            //         vm.village_special.push({
            //             title: element.village_special_title,
            //             date: element.village_special_date,
            //             img: el
            //         })
            //     }, this);
            // }, this);
            console.log("乡村minsu", vm.village_special);
        }).catch(function(err) {
            console.log("获取数据失败");
        });


    }
})();