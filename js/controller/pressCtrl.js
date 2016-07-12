(function () {
    whwApp.controller('pressCtrl', ['$scope', 'postsService', 'pagesService', function ($scope, postsService, pagesService) {
        pagesService.pressPage.get(function (res) {
            console.log(res);
            $scope.press_links = res.acf.press_links;
            $scope.pressImage1 = res.acf.press_image_1.url;
            $scope.pressImage1url = res.acf.press_image_1_url;
            $scope.pressImage2 = res.acf.press_image_2.url;
            $scope.pressImage2url = res.acf.press_image_2_url;
            $scope.pressRelease = res.acf.press_release;
            $scope.media_kit = res.acf.media_kit;
            $scope.social = res.acf.social;

//            $scope.featuredImages = _.chain(res.acf.featured_images[0])
//                .filter(function (item) {
//                        return item;
//                    })
//                    .value();
            
            $scope.featuredImages = res.acf.featured_images;
            $scope.downloadImages = res.acf.download_images;
            
            //            $scope.featuredLogos = [];
            //            
            //            //Gather Featured Logos Acf fields
            //            _.map(acfObject, function (num) {
            //                var objValues = _.values(num);
            //                if (objValues[0].indexOf('logo_') != -1) {
            //                    if (!_.isUndefined(objValues)) {
            //                        $scope.featuredLogos.push(objValues[1]);
            //                    }
            //                }
            //            }); // End of Featured Logos
        });
    }]);
}());