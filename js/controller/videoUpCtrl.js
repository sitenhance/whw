(function() {
    whwApp.controller('videoUpCtrl', [ '$scope', 'postsService', 'pagesService', 'S3UploadService', function($scope, postsService, pagesService, S3UploadService) {
        pagesService.videoUpPage.get(function(res) {
            console.log(res);
            $scope.video_upload = res.acf.video_upload;
        });
        
        $scope.Files = false;
        
        $scope.uploadFiles = function (file) {
            if ($scope.Files) {
                S3UploadService.Upload(file).then(
                    function (result) {
                        $scope.Success = true;
                    },
                    function (error) {
                        $scope.Error = error;
                    },
                    function (progress) {
                        $scope.Progress = (progress.loaded / progress.total) * 100;
                    }
                );
            }
        };
        
        
        
    }]);
}());