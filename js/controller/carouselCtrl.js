(function() {
    whwApp.controller('carouselCtrl', [ '$scope', 'pagesService', function($scope, pagesService) {
        
        pagesService.carouselPage.get(function (res) {
            $scope.carouselItems = _.chain(res.acf)
                .filter(function (item) { return ((typeof item) != "string"); })
                .map(function (item, key) { return [item.title, item.url]; }).value();
        });

        
    }]);
}());