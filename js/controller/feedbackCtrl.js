(function() {
    whwApp.controller('feedbackCtrl', [ '$scope', 'postsService', 'pagesService', '$http', function($scope, postsService, pagesService, $http) {
        $scope.emailSent = false;
        pagesService.feedbackPage.get(function(res) {
            console.log(res);
            $scope.feedback_image= res.acf.feedback_image.url;
            $scope.feedback_description = res.acf.feedback_description;
            console.log($scope.feedback_description);
        });
        $scope.submitFeedback = function() {
            $http({
                method: 'POST',
                url: appInfo.template_url + 'php/feedback.php',
                data: $.param($scope.formData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'} 
            })
            .success(function(data) {
                console.log(data);
                if(!data.success) {
                    $scope.errorName = data.errors.name;
                    $scope.errorEmail = data.errors.email;
                    $scope.errorContent = data.errors.content;
                } else {
                    $scope.message = data.message;
                    $scope.emailSent = true;
                }
            });
        };
    }]);
}());