(function () {
    whwApp.controller('contributeCtrl', ['$scope', 'pagesService', 'postsService', '$http', 'S3UploadService', function ($scope, pagesService, postsService, $http, S3UploadService) {
        pagesService.contributePage.get(function (res) {
            console.log(res);
            $scope.contribute_image = res.acf.contribute_image.url;
        });

        $scope.finishedDownload = false;
        $scope.loadingVideo = false;

        $scope.formData = {};
        $scope.videodata = {};
        $scope.submitVideo = function() {
            $scope.loadingVideo = true;
            $scope.formData.contentType = $scope.videoData.video.type;
            $http({
                method: 'PUT',
                data: $scope.formData,
                url: 'https://hpm0ohj7n9.execute-api.us-east-1.amazonaws.com/prod/util/s3/sign-post-url'
            }).then(function(res) {
                console.log(res);
                $http({
                    method: 'PUT',
                    url: res.data.oneTimeUploadUrl,
                    data: $scope.videoData.video,
                    headers: {
                        'Content-Type': $scope.videoData.video.type
                    }
                }).then(function(res) {
                    console.log(res);
                    $scope.loadingVideo = false;
                    $scope.finishedDownload = true;
                }, function(err) {
                    console.log(err);
                });
            }, function(err) {
                console.log(err);
            });
        };
    }]);
}());