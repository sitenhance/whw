(function() {
    whwApp.controller('socialCtrl', [ '$scope', 'postsService', 'pagesService', function($scope, postsService, pagesService) {
        pagesService.socialPage.get(function(res) {
            console.log(res);
            $scope.social_media_policy = res.acf.social_media_policy;
        })
    }]);
}());