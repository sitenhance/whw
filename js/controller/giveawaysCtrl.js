(function() {
    whwApp.controller('giveawaysCtrl', [ '$scope', 'postsService', 'pagesService', function($scope, postsService, pagesService) {
        pagesService.giveawaysPage.get(function(res) {
            console.log(res);
            $scope.giveaways_description = res.acf.giveaways_description;
        })
    }]);
}());