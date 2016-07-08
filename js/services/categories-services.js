(function() {
    whwApp.factory('categoriesService', [ '$resource' ,function($resource) {
        var categoriesService = {};
        
        categoriesService.forHimCategory = $resource(appInfo.api_url + 'posts?categories=5');
        
        return categoriesService;
        
    }]);
}());