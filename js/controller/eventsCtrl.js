(function() {
    whwApp.controller('eventsCtrl', [ '$scope', 'postsService', 'pagesService', '$stateParams', 'uiGmapGoogleMapApi', '$http', function($scope, postsService, pagesService, $stateParams, uiGmapGoogleMapApi, $http) {
        
        function isEmpty(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }

            return true && JSON.stringify(obj) === JSON.stringify({});
        }
        
        if (isEmpty($stateParams)) {
            postsService.allPosts.query(function(res) {
                $scope.posts = res;
                $scope.eventMonths = _
                    .chain($scope.posts)
                    .filter(function (item) {
                        var matches = _(item.categories).filter(function (num) { return num == 3; });
                        return matches.length > 0;
                    })
                    .map(function (item, key) { 
                        item._date = item.acf.events_month_and_year; return item; 
                    })
                    .groupBy('_date')
                    .map(function (value, key) {
                        value = _.sortBy(value, function(eventDate) {
                            return new Date(eventDate.acf.event_full_date);
                        });
                        return {
                            month: key,
                            items: value
                        };
                    })
                    .sortBy(function(date) { return new Date(date.month); })
                    .value();
            });
        } else {
            postsService.getPost.get({ID: $stateParams.id}, function(res) {
                $scope.eventName = res.acf.event_name;
                $scope.formData.event_name = $scope.eventName;
                $scope.eventImage = res.acf.event_image.sizes.medium_large;
                $scope.eventDescription = res.acf.event_description;
                $scope.eventLocation = res.acf.event_location;
                $scope.hostsName = res.acf.hosts_name;
                $scope.authorId = res.author;
                $scope.eventFullDate = res.acf.event_full_date;
                $scope.hostsTitle = res.acf.hosts_title;
                $scope.hostsDescription = res.acf.hosts_description;
                $scope.hostsImage = res.acf.hosts_image.sizes.thumbnail;
//                var geocoder = new google.maps.Geocoder();
//                geocoder.geocode({'address': $scope.eventLocation}, function(result, status) {
//                    $scope.lat = result[0].geometry.location.lat();
//                    $scope.long = result[0].geometry.location.lng();
//                    $scope.marker = {
//                        id: 0,
//                        coords: {latitude: $scope.lat, longitude: $scope.long}
//                    };
//                    $scope.map = { center: { latitude: $scope.lat, longitude: $scope.long }, zoom: 15 };
//                });
                pagesService.eventPage.get(function (res) {
                    $scope.topAdImage = res.acf.top_ad_image.url;
                    $scope.topAdUrl = res.acf.top_ad_url;
                    $scope.bottomAdImage = res.acf.bottom_ad_image.url;
                    $scope.bottomAdUrl = res.acf.bottom_ad_url;
                });

            });
        }
        
        pagesService.eventsPage.get(function(res) {
            $scope.events_ad = res.acf.event_page_ad_image.url;
            $scope.events_ad_url = res.acf.event_page_ad_url;
        });
        
        $scope.formData = {};
        /* Event Registration */
        $scope.emailSent = false;
        $scope.submitRegistration = function() {
            $http({
                method: 'POST',
                url: appInfo.template_url + 'php/registration.php',
                data: $.param($scope.formData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'} 
            })
            .success(function(data) {
                console.log(data);
                if(!data.success) {
                    //$scope.errorName = data.errors.name;
//                    $scope.errorEmail = data.errors.email;
                    $scope.post = data;
                    console.log($scope.post);
                } else {
                    $scope.message = data.message;
                    $scope.emailSent = true;
                }
            });
        };
        /* End of Event Registration */
    }]);
}());