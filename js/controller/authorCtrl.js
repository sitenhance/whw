(function(){
    whwApp.controller('authorCtrl', ['$scope', 'usersService', '$stateParams', 'postsService', 'pagesService', '$http', function($scope, usersService, $stateParams, postsService, pagesService, $http) {
        
        usersService.currentAuthor.get({ID: $stateParams.id}, function(res) {
            $scope.authorName = res.name;
            
            $scope.authorImage = res.acf.author_image.sizes.medium_large;
            $scope.authorSocial = [];
            $scope.authorDescription = res.description;
            $scope.articleList = [];
            $scope.videoList = [];
            $scope.article_per_page = 3;
            $scope.video_per_page = 6;

            $http({
                method: 'GET',
                url: 'http://52.204.102.10:4730/videos/'
            }).then(function(res) {
                var whw_videos = res.data.Items[0].videos;
                $scope.videoList = _.map(whw_videos).filter(function (item) {
                    if (item.Author.indexOf($scope.authorName) !== -1) {
                        var splitItem = item.Thumbnail.split('.');
                        var splitExt = splitItem[1].toUpperCase();
                        item.Thumbnail = splitItem[0] + '.' + splitExt;
                        return item;
                    }
                });
                //Get Authors videos 
                if ($scope.videoList.length < $scope.video_per_page) {
                    $scope.hideVideoLoadMoreBtn = true;
                }
                if ($scope.videoList.length === 0) {
                    $scope.noMoreVideoData = true;
                    $scope.hideVideoLoadMoreBtn = true;
                }
            }, function(err) {
                console.log(err);
            });            
            
            var facebookUrl = res.acf.facebook_web_url;
            if (facebookUrl !== '') {
                var faceObj = {
                    'name': 'facebook',
                    'url': facebookUrl,
                    'icon': appInfo.template_url + '/images/facebook.png'
                };
                $scope.authorSocial.push(faceObj);
            }
            
            var twitterUrl = res.acf.twitter_web_url;
            if (twitterUrl !== '') {
                var twitterObj = {
                    'name': 'twitter',
                    'url': twitterUrl,
                    'icon': appInfo.template_url + '/images/twitter.png'
                };
                $scope.authorSocial.push(twitterObj);
            }
            
            var pinterestUrl = res.acf.pinterest_web_url;
            if (pinterestUrl !== '') {
                var pinterestObj = {
                    'name': 'pinterest',
                    'url': pinterestUrl,
                    'icon': appInfo.template_url + '/images/pinterest.png'
                };
                $scope.authorSocial.push(pinterestObj);
            }
            
            var instagramUrl = res.acf.instagram_web_url;
            if (instagramUrl !== '') {
                var instagramObj = {
                    'name': 'instagram',
                    'url': instagramUrl,
                    'icon': appInfo.template_url + '/images/instagram.png'
                };
                $scope.authorSocial.push(instagramObj);
            }
            
            var linkedInUrl = res.acf.linkedin_web_url;
            if (linkedInUrl !== '') {
                var linkedInObj = {
                    'name': 'linkedin',
                    'url': linkedInUrl,
                    'icon': appInfo.template_url + '/images/linkedin.png'
                };
                $scope.authorSocial.push(linkedInObj);
            }
            postsService.getAuthorPost.query({ID: $stateParams.id}, function(res) {
                console.log(res);
                _.chain(res)
                    .filter(function (item) {
                        _(item.categories).filter(function (num) {
                            if (num === 2) {
                                $scope.articleList.push(item);
                            }
                        });
                    }).value();
                if ($scope.articleList.length < $scope.article_per_page) {
                    $scope.hideArticleLoadMoreBtn = true;
                }
                if ($scope.articleList.length === 0) {
                    $scope.noMoreArticleData = true;
                    $scope.hideArticleLoadMoreBtn = true;
                }
            });
            
        });
        
        
        pagesService.authorPage.get(function(res) {
            $scope.top_ad_image = res.acf.top_ad_image.url;
            $scope.top_ad_url = res.acf.top_ad_url;
            $scope.second_ad_image = res.acf.second_ad_image.url;
            $scope.second_ad_url = res.acf.second_ad_url;
        });
        
        
        $scope.loadLess = function (type) {
            switch (type) {
                case 'article':
                    if ($scope.article_per_page > 3) {
                        $scope.article_per_page -= 3;
                        $scope.hideArticleLoadMoreBtn = false;
                    }
                    break;
                case 'video':
                    if ($scope.video_per_page > 4) {
                        $scope.video_per_page -= 4;
                        $scope.hideVideoLoadMoreBtn = false;
                    }
                    break;
            }
        };

        $scope.loadMore = function (whatever) {
            switch (whatever) {
                case 'article':
                    if ($scope.article_per_page < $scope.articleList.length) {
                        $scope.noMoreArticleData = false;
                        $scope.article_per_page += 3;
                        if ($scope.articleList.length <= $scope.article_per_page) {
                            $scope.hideArticleLoadMoreBtn = true;
                        }
                    } else {
                        $scope.noMoreArticleData = true;
                    }
                    break;
                case 'video':
                    if($scope.video_per_page < $scope.videoList.length) {
                        $scope.noMoreVideoData = false;
                        $scope.video_per_page += 4;
                        if ($scope.videoList.length <= $scope.video_per_page) {
                            $scope.hideVideoLoadMoreBtn = true;
                        }
                    } else {
                        $scope.noMoreVideoData = true;
                    }
                    break;
            }
        };
        
        
    }]);
}());