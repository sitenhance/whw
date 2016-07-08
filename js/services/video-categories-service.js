(function() {
    whwApp.factory('videoCategoriesService', [ '$rootScope', function($rootScope) {
        var videoCategoriesService = {};
        
        videoCategoriesService.categoryTitle = '';
        
        videoCategoriesService.chosenVideo = '';
        
        videoCategoriesService.videoChosen = function(video) {
            videoCategoriesService.chosenVideo = video;
            videoCategoriesService.broadcastChosenVideo();
        };
        
        videoCategoriesService.setCategoryTitle = function(title) {
            videoCategoriesService.categoryTitle = title;
            videoCategoriesService.broadcastCategories();
        };
        
        videoCategoriesService.broadcastCategories = function() {
            $rootScope.$broadcast('handleVideoCategories');
        };
        
        videoCategoriesService.broadcastChosenVideo = function() {
            $rootScope.$broadcast('handleChosenVideo');
        };
        
        return videoCategoriesService;
    }]);
}());