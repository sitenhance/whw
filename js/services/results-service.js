(function() {
    whwApp.factory('resultService', [ '$rootScope', function($rootScope) {
        var resultService = {};
        
        resultService.totalResults = 0;
        resultService.noOfArticles = 0;
        resultService.noOfVideos = 0;
        resultService.noOfAuthors = 0;
        resultService.articleList = [];
        resultService.authorList = [];
        resultService.videoList = [];
        
        resultService.setResultsNumbers = function(array1, array3, array2) {
            resultService.articleList = array1;
            resultService.authorList = array2;
            resultService.videoList = array3;
            resultService.totalResults = array1.length + array2.length + array3.length;
            resultService.noOfArticles = array1.length;
            resultService.noOfAuthors = array2.length;
            resultService.noOfVideos = array3.length;
            resultService.broadcastResultNumbers();
        };
        
        resultService.broadcastResultNumbers = function() {
            $rootScope.$broadcast('handleResultNumbers');
        };
        
        return resultService;
    }]);
}());