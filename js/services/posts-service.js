(function() {
    whwApp.factory('postsService', [ '$resource', function($resource) {
        var postsService = {};
        
        postsService.allPosts = $resource(appInfo.api_url + 'posts?per_page=100');
        
        postsService.getPost = $resource(appInfo.api_url + 'posts/:ID', {
            ID: '@id'
        });
        
        postsService.getAuthorPost = $resource(appInfo.api_url + 'posts/?author=:ID', {
            ID: '@id'
        });
        
        return postsService;
    }]);
}());