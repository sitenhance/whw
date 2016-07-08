(function() {
    whwApp.controller('termsCtrl', [ '$scope', 'postsService', 'pagesService', function($scope, postsService, pagesService) {
        pagesService.termsPage.get(function(res) {
            console.log(res);
            $scope.terms_of_use = res.acf.terms_of_use;
        })
    }]);
}());