(function () {
    whwApp.controller('contactCtrl', ['$scope', 'postsService', 'pagesService', '$http', function ($scope, postsService, pagesService, $http) {
        $scope.emailSent = false;
        pagesService.contactPage.get(function (res) {
            $scope.contact_image = res.acf.contact_image.url;
            $scope.contact_information = res.acf.contact_information;
            console.log($scope.contact_information);
            $scope.contact_info = res.acf.contact_info;
            console.log($scope.contact_info);
            $scope.press_media = res.acf.press_media;
            //Article Social Stuff
            $scope.articleFBIcon = appInfo.template_url + '/images/facebook.png';
            $scope.articleTwitIcon = appInfo.template_url + '/images/twitter.png';
            $scope.articleGoogleIcon = appInfo.template_url + '/images/google-plus.png';
            $scope.articlePinIcon = appInfo.template_url + '/images/pinterest.png';
            $scope.articleLinkedIcon = appInfo.template_url + '/images/linkedin.png';
        });
        $scope.submitContact = function() {
            $http({
                method: 'POST',
                url: appInfo.template_url + 'php/contact.php',
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