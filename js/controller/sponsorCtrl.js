(function() {
    whwApp.controller('sponsorCtrl', [ '$scope', 'postsService', 'pagesService', function($scope, postsService, pagesService) {
        pagesService.sponsorPage.get(function(res) {
            console.log(res);
            $scope.advertise_description = res.acf.advertise_description;
        })
    }]);
}());