(function() {
    whwApp.controller('earningsCtrl', [ '$scope', 'postsService', 'pagesService', function($scope, postsService, pagesService) {
        pagesService.earningsPage.get(function(res) {
            console.log(res);
            $scope.earnings_disclaimer = res.acf.earnings_disclaimer;
        })
    }]);
}());