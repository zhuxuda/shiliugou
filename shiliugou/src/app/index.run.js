(function() {
    'use strict';


    angular
        .module('shiliugou')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log) {

        $log.debug('runBlock end');
    }

})();