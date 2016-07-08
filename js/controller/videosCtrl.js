(function () {
    whwApp.controller('videosCtrl', ['$scope', 'pagesService', '$sce', '$state', 'videoCategoriesService', '$stateParams', 'usersService', 'ezfb', '$location', '$http', function ($scope, pagesService, $sce, $state, videoCategoriesService, $stateParams, usersService, ezfb, $location, $http) {

        function isEmpty(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }

            return true && JSON.stringify(obj) === JSON.stringify({});
        }

        //Display Chosen Video
        if (!isEmpty($stateParams)) {
            $http({
                method: 'GET',
                url: 'http://52.204.102.10:4730/videos/'
            }).then(function (data) {
                console.log(data);
                var whw_videos = data.data.Items[0].videos;
                var videoArray = _.map(whw_videos).filter(function (video) {
                    if (video.id === $stateParams.id) {
                        return video;
                    }
                });
                var videoObj = videoArray[0];
                $scope.category = videoArray[0].Category;
                $scope.authorCompany = videoArray[0].Company;
                $scope.authorName = videoArray[0].Author;
                $scope.authorTitle = videoArray[0].JobTitle;
                $scope.email = videoArray[0].Email;
                $scope.videoTitle = videoArray[0].Title;
                console.log(videoArray[0].AbsPath);
                $scope.twitterTitle = $scope.videoTitle.split(' ').join('+');
                $scope.config = {
                    sources: [
                        {
                            src: $sce.trustAsResourceUrl('http://d16at6ua905oks.cloudfront.net/' + videoArray[0].AbsPath),
                            type: "video/mp4"
                        }
                    ],
                    plugins: {
                        controls: {
                            autoHide: true,
                            autoHideTime: 3000
                        }
                    }
                };

                findRelated(videoArray[0].Category, $stateParams.id);

                //Shuffle Related Videos Function
                function shuffle(array) {
                    var currentIndex = array.length, temporaryValue, randomIndex;

                    //While there remain elements to shuffle...
                    while (0 !== currentIndex) {
                        //Pick a remaining element...
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;

                        //And swap it with the current element
                        temporaryValue = array[currentIndex];
                        array[currentIndex] = array[randomIndex];
                        array[randomIndex] = temporaryValue;
                    }
                    return array;
                }

                //Find Related Videos
                function findRelated(category, params) {
                    $scope.relatedVideos = _.chain(whw_videos).filter(function (video) {
                        if (video.Category === category) {
                            if (video.id !== params) {
                                var splitItem = video.Thumbnail.split('.');
                                var splitExt = splitItem[1].toUpperCase();
                                video.Thumbnail = splitItem[0] + '.' + splitExt;
                                return video;
                            }
                        }
                    }).value();
                    $scope.relatedVideos = shuffle($scope.relatedVideos);
                }

            }, function (err) {
                console.log(err);
            });
            
            // usersService.allUsers.query(function (res) {
            //     _.map(res).filter(function(author) {
            //     if($scope.email.indexOf(author.acf.authors_email) !== -1) {
            //         $scope.authorId = author.id;
            //     }
            //     });
            // });
            
            $scope.pluginOn = true;
            $scope.rendering = false;

            ezfb.getLoginStatus(function (res) {
                $scope.loginStatus = res;
            });

            ezfb.api('/me', function (res) {
                $scope.apiMe = res;
            });

            $scope.rendered = function () {
                $scope.rendering = false;
            };

            $scope.$watch('pluginOn', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    $scope.rendering = true;
                }
            });

            $scope.currentUrl = $location.absUrl();

            //Added for Video Page
            pagesService.videoPage.get(function (res) {
                $scope.singleAdOneUrl = res.acf.single_ad_one_url;
                $scope.singleAdOneImg = res.acf.single_ad_one_img.url;
                $scope.singleAdTwoUrl = res.acf.single_ad_two_url;
                $scope.singleAdTwoImg = res.acf.single_ad_two_img.url;
                $scope.socialShare = res.acf.social_share;
            });
        }

        if (isEmpty($stateParams)) {

            //Fire Category page that matches what the user clicked on
            $scope.catChoice = function (item) {
                videoCategoriesService.setCategoryTitle(item);
                $state.go('categories');
            };

            pagesService.videosPage.get(function (res) {
                $scope.top_ad_img = res.acf.top_ad_image.url;
                $scope.top_ad_url = res.acf.top_ad_url;
                $scope.second_ad_url = res.acf.second_ad_url;
                $scope.second_ad_image = res.acf.second_ad_image.url;

                $scope.categoriesList = _.chain(res.acf.video_categories[0])
                    .filter(function (item) {
                        return item;
                    })
                    .value();

            });

            $scope.videos_poll_logo = appInfo.template_url + 'images/whw-logo.png';

        }


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

        $scope.video_per_page = 3;

        $scope.loadMore = function () {
            if ($scope.relatedVideos.length > $scope.video_per_page) {
                $scope.noMoreVideos = false;
                $scope.video_per_page += 3;
                $scope.hideRelateVideoLoadBtn = false;
                if ($scope.relatedVideos.length < $scope.video_per_page) {
                    $scope.hideRelateVideoLoadBtn = true;    
                }
            } else {
                $scope.noMoreVideos = true;
                $scope.hideRelateVideoLoadBtn = true;
            }
        };

        $scope.loadLess = function () {
            if ($scope.video_per_page > 3) {
                $scope.video_per_page -= 3;
                $scope.hideRelateVideoLoadBtn = false;
            }
        };


    }]);

}());