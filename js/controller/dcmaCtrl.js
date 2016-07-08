(function() {
    whwApp.controller('dcmaCtrl', [ '$scope', 'pagesService', function($scope, pagesService) {
        pagesService.dcmaPage.get(function(res) {
            console.log(res);
            $scope.dcma_policy = res.acf.dcma_policy;
        })
    }]);
}());