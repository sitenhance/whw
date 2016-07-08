(function() {
    whwApp.controller('searchCtrl', ['$scope', 'postsService', 'resultService', 'usersService', '$state', 'pagesService', '$http', function($scope, postsService, resultService, usersService, $state, pagesService, $http) {
        function isEmpty(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }

            return true && JSON.stringify(obj) === JSON.stringify({});
        }

        $scope.videoResults = resultService.noOfVideos;
        $scope.totalResults = resultService.totalResults;
        $scope.noOfArticles = resultService.noOfArticles;
        $scope.noOfAuthors = resultService.noOfAuthors;
        $scope.noOfVideos = resultService.noOfVideos;
        $scope.articleList = resultService.articleList;
        $scope.authorList = resultService.authorList;
        $scope.videoList = resultService.videoList;
        $scope.article_per_page = 3;
        $scope.video_per_page = 4;
        $scope.author_per_page = 4;
        $scope.noMoreArticleData = false;
        $scope.noMoreAuthorData = false;
        $scope.noMoreVideoData = false;

        $scope.$on('handleResultNumbers', function () {
            $scope.noOfArticles = resultService.noOfArticles;
            $scope.noOfAuthors = resultService.noOfAuthors;
            $scope.noOfVideos = resultService.noOfVideos;
            $scope.totalResults = resultService.totalResults;
            $scope.articleList = resultService.articleList;
            $scope.authorList = resultService.authorList;
            $scope.videoList = resultService.videoList;
            if ($scope.articleList.length === 0) {
                $scope.noMoreArticleData = true;
                $scope.hideArticleLoadMoreBtn = true;
            } else {
                $scope.noMoreArticleData = false;
                $scope.hideArticleLoadMoreBtn = false;
                if($scope.article_per_page >= $scope.articleList.length) {
                    $scope.hideArticleLoadMoreBtn = true;
                }
            }
            if ($scope.videoList.length === 0) {
                $scope.noMoreVideoData = true;
                $scope.hideVideoLoadMoreBtn = true;
            } else {
                $scope.noMoreVideoData = false;
                $scope.hideVideoLoadMoreBtn = false;
                if ($scope.video_per_page >= $scope.videoList.length) {
                    $scope.hideVideoLoadMoreBtn = true;
                }
            }
            if ($scope.authorList.length === 0) {
                $scope.noMoreAuthorData = true;
                $scope.hideAuthorLoadMoreBtn = true;
            } else {
                $scope.noMoreAuthorData = false;
                $scope.hideAuthorLoadMoreBtn = false;
                if($scope.author_per_page >= $scope.authorList.length) {
                    $scope.hideAuthorLoadMoreBtn = true;
                }
            }
        });

        if ($scope.articleList.length === 0) {
            $scope.noMoreArticleData = true;
            $scope.hideArticleLoadMoreBtn = true;
        }
        if ($scope.videoList.length === 0) {
            $scope.noMoreVideoData = true;
            $scope.hideVideoLoadMoreBtn = true;
        }
        if ($scope.authorList.length === 0) {
            $scope.noMoreAuthorData = true;
            $scope.hideAuthorLoadMoreBtn = true;
        }

        $scope.loadLess = function (type) {
            switch (type) {
                case 'article':
                    if ($scope.article_per_page > 3) {
                        $scope.article_per_page -= 3;
                        $scope.hideArticleLoadMoreBtn = false;
                    }
                    break;
                case 'author':
                    if($scope.author_per_page > 4) {
                        $scope.author_per_page -= 4;
                        $scope.hideAuthorLoadMoreBtn = false;
                    }
                    break;
                case 'video':
                    if($scope.video_per_page > 4) {
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
                case 'author':
                    if ($scope.author_per_page < $scope.authorList.length) {
                        $scope.noMoreAuthorData = false;
                        $scope.author_per_page += 4;
                        if ($scope.authorList.length <= $scope.author_per_page) {
                            $scope.hideAuthorLoadMoreBtn = true;
                        }
                    } else {
                        $scope.noMoreAuthorData = true;
                    }
                    break;
            }
        };
        
        $scope.performSearch = function (str) {
            $scope.articleResults = [];
            $scope.authorResults = [];
            $scope.videoResults = [];
            $scope.postList = [];
            console.log(str);

                        $http({
                method: 'GET',
                url: 'http://52.204.102.10:4730/videos/'
            }).then(function (data) {
                

                var whw_videos = data.data.Items[0].videos;

                _.map(whw_videos).filter(function (video) {
                    var lowerStr = str.toLowerCase();
                    var splitExt, splitItem;
                    if (typeof video.Title === 'string') {
                        var lowerTitles = video.Title.toLowerCase();
                        if (lowerTitles.indexOf(lowerStr) !== -1) {
                            console.log(lowerTitles, " : ", lowerStr);
                            splitItem = video.Thumbnail.split('.');
                            splitExt = splitItem[1].toUpperCase();
                            video.Thumbnail = splitItem[0] + '.' + splitExt;
                            $scope.videoResults.push(video);
                        }
                    }
                    if (typeof video.Category === 'string') {
                        var lowerCategory = video.Category.toLowerCase();
                        if (lowerCategory.indexOf(lowerStr) !== -1) {
                            console.log(lowerCategory, " : ", lowerStr);
                            splitItem = video.Thumbnail.split('.');
                            splitExt = splitItem[1].toUpperCase();
                            video.Thumbnail = splitItem[0] + '.' + splitExt;
                            $scope.videoResults.push(video);
                        }
                    }
                    if (typeof video.Author === 'string') {
                        var lowerAuthorTitle = video.Author.toLowerCase();
                        if (lowerAuthorTitle.indexOf(lowerStr) !== -1) {
                            console.log(lowerAuthorTitle, " : ", lowerStr);
                            splitItem = video.Thumbnail.split('.');
                            splitExt = splitItem[1].toUpperCase();
                            video.Thumbnail = splitItem[0] + '.' + splitExt;
                            $scope.videoResults.push(video);
                        }
                    }
                    displaySearchResults();
                });

            }, function (err) {
                console.log(err);
            });
            
            $scope.videoResults = _.uniq($scope.videoResults);
            
            postsService.allPosts.query(function (res) {
                $scope.postList = res;
                _.chain(res)
                    .filter(function (item) {
                        //Check Article Categories for Search Matches
                        _(item.categories).filter(function(categories) {
                            if(categories === 2) {
                                
                                //Check Article Titles for Search Matches
                                _(item.title).filter(function (title) {
                                    var lowerTitle = title.toLowerCase();
                                    var lowerString = str.toLowerCase();
                                    if (lowerTitle.indexOf(lowerString) !== -1) {
                                        console.log(lowerTitle, ' : ', lowerString);
                                        $scope.articleResults.push(item);
                                    }
                                });
                                
                               if(item.acf.article_categories) {
                                   _(item.acf.article_categories).filter(function(articleCategories) {
                                        var lowerArticleCategory = articleCategories.toLowerCase();
                                        var lowerString = str.toLowerCase();
                                        if(lowerArticleCategory.indexOf(lowerString) !== -1) {
                                            console.log(lowerArticleCategory, ' : ', lowerString);
                                            $scope.articleResults.push(item);
                                        }
                                   });
                               }
                               
                            }
                        });
                        
                    })
                    .value();
                    
                    $scope.articleResults = _.uniq($scope.articleResults);
                    displaySearchResults();
            });
            
            
            
            usersService.allUsers.query(function(res) {
                console.log('Users', str);
                _.chain(res)
                    .filter(function(item) {
                        var lowerAuthName = item.name.toLowerCase();
                        var lowerString = str.toLowerCase();
                        if(lowerAuthName.indexOf(lowerString) !== -1) {
                            console.log(lowerAuthName, ' : ', lowerString);
                            $scope.authorResults.push(item);
                            findArticlesByAuthor(item.id);
                        } 
                    })
                    .value();
                    
                    $scope.authorResults = _.uniq($scope.authorResults);
                    displaySearchResults();
            });
            
            var displaySearchResults = _.after(4, searchResultUpdate);
            
            function findArticlesByAuthor(id) {
                postsService.allPosts.query(function(res) {
                   _.map(res).filter(function(item) { 
                       if(item.author === id) { 
                           _.map(item.categories).filter(function(category) {
                               if(category === 2) {
                                   $scope.articleResults.push(item);
                               }
                           });
                        } 
                    });
                    displaySearchResults();
                });
            }
            
            function searchResultUpdate() {
                console.log('oh man');
                resultService.setResultsNumbers($scope.articleResults, $scope.videoResults, $scope.authorResults);
                $state.go('search');
            } 
        };
        
        pagesService.searchResultsPage.get(function (res) {
            $scope.topAdImage = res.acf.top_ad_image.url;
            $scope.topAdUrl = res.acf.top_ad_url;
            $scope.secondAdImage = res.acf.second_ad_image.url;
            $scope.secondAdUrl = res.acf.second_ad_url;
        });
        
    }]);
}());