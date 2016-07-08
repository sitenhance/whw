(function() {
    whwApp.factory('usersService', [ '$resource', function($resource) {
        
        var usersService = {};
        
        usersService.allUsers = $resource(appInfo.api_url + 'users/?per_page=100');
        
        usersService.currentAuthor = $resource(appInfo.api_url + 'users/:ID', {
            ID: '@id'
        });
        
        return usersService;
    }]);
}());