(function() {
    whwApp.controller('categoriesCtrl', [ '$scope', 'videoCategoriesService', '$state', '$stateParams', 'pagesService', '$http', function($scope, videoCategoriesService, $state, $stateParams, pagesService, $http) {
         
         $scope.sortingOrder = 'asc';
         $scope.asc = true;
         $scope.doReverse = false;

         $scope.sort = function (order) {
             if (order === 'asc') {
                 $scope.sortingOrder = 'asc';
                 $scope.asc = true;
                 $scope.desc = false;
                 $scope.doReverse = false;
             }
             if (order === 'desc') {
                 $scope.sortingOrder = 'desc';
                 $scope.desc = true;
                 $scope.asc = false;
                 $scope.doReverse = true;
             }
         };

         $scope.layoutType = 'grid';
         $scope.grid = true;

         $scope.setLayout = function (layout) {
             if (layout === 'grid') {
                 $scope.layoutType = 'grid';
                 $scope.grid = true;
                 $scope.list = false;
             }
             if (layout === 'list') {
                 $scope.layoutType = 'list';
                 $scope.list = true;
                 $scope.grid = false;
             }
         };

         $http({
            method: 'GET',
            url: 'http://52.204.102.10:4730/videos/'
         }).then(function(data) {
             console.log(data);
             $scope.whw_videos = data.data.Items[0].videos;
             $scope.videoCategoryTitle = $stateParams.category;
             $scope.categoryVideoList = _.chain($scope.whw_videos).filter(function (item) {
                 var lowerItemCat = item.Category.toLowerCase();
                 var lowerParamsCategory = $stateParams.category.toLowerCase();
                 if (lowerItemCat === lowerParamsCategory) {
                     var splitItem = item.Thumbnail.split('.');
                     var splitExt = splitItem[1].toUpperCase();
                     item.Thumbnail = splitItem[0] + '.' + splitExt;
                     return item; 
                }
             }).value();
         }, function(err){
             console.log(err);
         });
         
         pagesService.categoriesPage.get(function(res) {
             $scope.top_ad_img = res.acf.top_ad_image.url;
             $scope.top_ad_url = res.acf.top_ad_image_url;
             $scope.second_ad_image = res.acf.second_ad_image.url;
             $scope.second_ad_url = res.acf.second_ad_image_url;
         });

         
    }]);
}());