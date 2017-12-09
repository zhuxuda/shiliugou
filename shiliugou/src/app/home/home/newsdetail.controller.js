(function() {
    'use strict';

    angular
        .module('shiliugou')
        .controller('NewsDetailController', NewsDetailController);
    /** @ngInject */
    function NewsDetailController($http, $stateParams) {
        var vm = this;
        vm.isnew = true;
        vm.news = {};
        vm.comment = "";
        vm.webip = websiteip;
        var id;
        vm.getnews = function() {
            $http.get(websiteip + "home/news?_id=" + id).success(function(data) {
                vm.news = data.data[0];
                console.log("新闻", vm.news)
            }).error(function() {})
        }
        if ($stateParams.id) {
            id = $stateParams.id;
            vm.isnew = false;
            vm.getnews()
        }
        console.log(vm.isnew)

    }
})();