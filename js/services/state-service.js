(function() {
    whwApp.factory('stateService', [ '$rootScope', function($rootScope) {
        var stateService = {};
        
        stateService.current_state = 0;
        
        stateService.set_state = function(state) {
            this.current_state = state;
            this.broadcastCurrentState();
        };
        
        stateService.broadcastCurrentState = function() {
            $rootScope.$broadcast('handleState');
        };
        
        return stateService;
        
    }]);
}());