(function() {
    whwApp.controller('articleCtrl', [ '$scope', 'postsService', '$stateParams', 'pagesService', 'ezfb', '$location', function($scope, postsService, $stateParams, pagesService, ezfb, $location) {
        //Display a single article
        $scope.backgroundImage = 'http://placehold.it/75x75';
        $scope.backgroundImageSponsored = 'fa fa-star-o';
        
        $scope.articles = [];
        $scope.sponsoredArticles = [];
        
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
                // console.log($scope.posts);
                //Loop through all WordPress Posts
                for (var i = 0; i < $scope.posts.length; i++) {
                    //Check to see if post has one category
                    if ($scope.posts[i].categories.length == 1) {
                        //Check to make sure Blog category is present
                        if ($scope.posts[i].categories[0] == 2) {
                            //push articles to articles array
                            //check for sponsored content
                            if ($scope.posts[i].acf.is_this_an_advertisement === true) {
                                $scope.sponsoredArticles.push($scope.posts[i]);
                            } else {
                                $scope.articles.push($scope.posts[i]);
                            }
                        }
                        //since post has multiple categories loop through categories
                    } else if ($scope.posts[i].categories.length > 1) {
                        for (var j = 0; j < $scope.posts[i].categories.length; j++) {
                            if ($scope.posts[i].categories[j] == 2) {
                                if ($scope.posts[i].acf.is_this_an_advertisement === true) {
                                    $scope.sponsoredArticles.push($scope.posts[i]);
                                } else {
                                    $scope.articles.push($scope.posts[i]);
                                }
                            }
                        }
                    }

                }
                
                $scope.articles.splice(2, 0, $scope.sponsoredArticles[0]);
                if ($scope.sponsoredArticles.length > 1) {
                    for (var k = 0; k < $scope.sponsoredArticles.length; k++) {
                        if (k !== 0) {
                            $scope.articles.splice(k * 6, 0, $scope.sponsoredArticles[k]);
                        }
                    }
                }
                
                $scope.blogPosts = $scope.articles;
                $scope.itemsPerPage = 5;
                $scope.currentPage = 1;
                // console.log($scope.blogPosts);

                $scope.pageCount = function() {
                    return Math.ceil($scope.blogPosts.length / $scope.itemsPerPage);
                };
                $scope.totalItems = $scope.blogPosts.length;
                $scope.$watch('currentPage + itemsPerPage', function() {
                    var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                        end = begin + $scope.itemsPerPage;

                    $scope.filteredPosts = $scope.blogPosts.slice(begin, end);
                    
                    console.log($scope.filteredPosts);
                });
            });
        } else {
            postsService.getPost.get({ID: $stateParams.id}, function(res) {
                $scope.articleTitle = res.title.rendered;
                $scope.twitterTitle = $scope.articleTitle.split(' ').join('+');
                $scope.authorImgThumb = res.acf.authors_image.sizes.thumbnail;
                $scope.authorName = res.acf.author_name;
                $scope.authorId = res.author;
                $scope.articleImage = res.acf.article_image.url;
                $scope.articleContent = res.content.rendered;
                $scope.socialMedia = res.acf.social_media;
                pagesService.articleAdPage.get(function(res) {
                    $scope.singleAdOneUrl = res.acf.ad_one_url_link;
                    $scope.articleAdRect = res.acf.ad_one_image.url;
                    $scope.singleAdTwoUrl = res.acf.ad_two_url_link;
                    $scope.articleAdTwoRect = res.acf.ad_two_image.url;
                });
                
                $scope.authorImgDisplay = {'background-image': 'url(' + $scope.authorImgThumb + ');'};
            });
        }
        
        //Article Social Stuff
        $scope.articleFBIcon = appInfo.template_url + '/images/facebook.png';
        $scope.articleTwitIcon = appInfo.template_url + '/images/twitter.png';
        $scope.articlePinIcon = appInfo.template_url + '/images/pinterest.png';
        $scope.articleLinkedIcon = appInfo.template_url + '/images/linkedin.png';
        
        
        //Article Ads
        $scope.articleAdRect = appInfo.template_url + '/images/rectangle.png';
        
        pagesService.articlesPage.get(function(res) {
            $scope.adSkyscraperOne = res.acf.articles_ad_one.url;
            $scope.adRectTwo = res.acf.articles_ad_two.url;
            $scope.adRectThree = res.acf.articles_ad_three.url;
            
            $scope.adOneUrl = res.acf.articles_ad_one_url_link;
            $scope.adTwoUrl = res.acf.articles_ad_two_url_link;
            $scope.adThreeUrl = res.acf.articles_ad_three_url_link;
            
        });
        
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
        $scope.formattedUrl = $scope.currentUrl.replace('#', '%23');
        
    }]);
}());