(function() {
    whwApp.controller('affiliateCtrl', [ '$scope', 'postsService', 'pagesService', function($scope, postsService, pagesService) {
        pagesService.affiliatePage.get(function(res) {
            console.log(res);
            $scope.affiliate_disclaimer = res.acf.affiliate_disclaimer;
        })
    }]);
}());