(function() {
    whwApp.controller('privacyCtrl', [ '$scope', 'postsService', 'pagesService', function($scope, postsService, pagesService) {
        pagesService.privacyPage.get(function(res) {
            console.log(res);
            $scope.privacy_policy = res.acf.privacy_policy;
        })
    }]);
}());