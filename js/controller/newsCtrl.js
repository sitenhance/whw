(function() {
    whwApp.controller('newsCtrl', [ '$scope', 'postsService', 'pagesService', function($scope, postsService, pagesService) {
        pagesService.newsPage.get(function(res) {
            console.log(res);
            $scope.news_image= res.acf.news_image.url;
            $scope.news_description = res.acf.news_description;
            console.log($scope.news_description);
        })
    }]);
}());