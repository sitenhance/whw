(function() {
    whwApp.controller('practiceCtrl', [ '$scope', 'postsService', 'pagesService', function($scope, postsService, pagesService) {
        pagesService.practicePage.get(function(res) {
            console.log(res);
            $scope.instagram_feed = res.acf.instagram_feed;
            $scope.instagram_title = res.acf.instagram_title;
            $scope.comments = res.acf.comments;
        })
    }]);
}());