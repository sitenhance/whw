(function() {
    whwApp.controller('headerCtrl', [ '$scope', 'pagesService', 'postsService', 'usersService', '$q', '$state', 'resultService', function($scope, pagesService, postsService, usersService, $q, $state, resultService) {
        pagesService.headerPage.get(function(res) {
            
            $scope.socialIcons = [
                {
                    'name' : 'facebook',
                    'url': res.acf.facebook_icon.url,
                    'link': 'https://www.facebook.com/watchherworkitout/',
                },
                {
                    'name': 'twitter',
                    'url': res.acf.twitter_icon.url,
                    'link': 'https://twitter.com/WatchHerWorking'
                },
                {
                    'name': 'pinterest', 
                    'url': res.acf.pinterest_icon.url,
                    'link': 'https://www.pinterest.com/watchherworking/'
                },
                {
                    'name': 'instagram', 
                    'url': res.acf.instagram_icon.url,
                    'link': 'https://www.instagram.com/watchherworking/'
                },
                {
                    'name': 'LinkedIn',
                    'url': res.acf.linkedin_icon.url,
                    'link': 'https://www.linkedin.com/company/watchherwork.com'
                },
                {
                    'name': 'google-plus',
                    'url': res.acf.google_plus_icon.url,
                    'link': 'https://plus.google.com/115366933861570929568'
                },
                {
                    'name': 'email',
                    'url': res.acf.email_icon.url,
                    'link': 'mailto:info@watchherwork.com'
                }
            ];
           $scope.headerLogo = res.acf.logo_image.url;
        });
        
        $scope.articleResults = [];
        
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
        $scope.articleList = resultService.articleList;
        $scope.authorList = resultService.authorList;
        $scope.article_per_page = 3;
        $scope.video_per_page = 3; 
        $scope.author_per_page = 3;
        $scope.noMoreArticleData = false; 
        $scope.noMoreAuthorData = false;
        $scope.noMoreVideoData = false;
        
        $scope.$on('handleResultNumbers', function() {
            $scope.noOfArticles = resultService.noOfArticles;
            $scope.noOfAuthors = resultService.noOfAuthors;
            $scope.totalResults = resultService.totalResults;
            $scope.articleList = resultService.articleList;
            $scope.authorList = resultService.authorList;
            if ($scope.articleList.length === 0) {
                $scope.noMoreArticleData = true;
            } else {
                $scope.noMoreArticleData = false;
            }
            // if ($scope.videoList.length === 0) {
            //     $scope.noMoreVideoData = true;
            // } else {
            //     $scope.noMoreVideoData = false;
            // }
            if($scope.authorList === 0) {
                $scope.noMoreAuthorData = true;
            } else {
                $scope.noMoreAuthorData = false;
            }
        });
        
        if($scope.articleList.length === 0) {
            $scope.noMoreData = true;
        }
        // if ($scope.videoList.length === 0) {
        //     $scope.noMoreVideoData = true;
        // }
        if($scope.authorList.length === 0) {
            $scope.noMoreAuthorData = true;
        }
        
        $scope.loadLess = function(type) {
            switch(type) {
                case 'article':
                if($scope.article_per_page > 3) {
                    $scope.article_per_page -= 3;
                }
            }
        };
        
        $scope.loadMore = function(whatever) {
            console.log($scope.article_per_page);
            switch(whatever) {
                case 'article':
                    if($scope.article_per_page < $scope.articleList.length) {
                        $scope.noMoreArticleData = false;
                        $scope.article_per_page += 3;
                    } else {
                        $scope.noMoreArticleData = true;
                    }
                    break;
                // case 'video':
                //     $scope.noMoreVideoData += 3;
                //     if($scope.video_per_page >= $scope.videoList.length) {
                //         $scope.noMoreVideoData = true;
                //     } else {
                //         $scope.noMoreVideoData = false;
                //     }
                //     break;
                case 'author':
                    $scope.noMoreAuthorData += 3;
                    if($scope.author_per_page >= $scope.authorList.length) {
                        $scope.noMoreAuthorData = true;
                    } else {
                        $scope.noMoreAuthorData = false;
                    }
                    break;
            }
        };
        
        $scope.performSearch = function(str) {
            
            $scope.articleResults = [];
            $scope.postList = [];
            postsService.allPosts.query(function(res){
                
                $scope.postList = res;
                
                function displayArrays(articleResults, authorResults) {
                    resultService.setResultsNumbers(articleResults, authorResults);
                    $state.go('search');
                }
                
                $scope.authorsResults = [];
                function searchAuthors(str) {
                    var authorObj = {};
                    usersService.allUsers.query(function(res) {
                        var userList = res;
                        for (var i = 0; i < userList.length; i++) {
                            var lowerUserName = userList[i].name.toLowerCase();
                            if (lowerUserName.indexOf(str) != -1) {
                                authorObj.name = lowerUserName;
                                authorObj.user = userList[i];
                                $scope.authorsResults.push(authorObj);
                            }
                            if(i == userList.length - 1) {
                                displayArrays($scope.articleResults, $scope.authorsResults);
                            }
                        }
                    });
                }

                
                //If search qery doesn't match Post titles
                //We run this function to check if the search query
                //matches any Posts categories
                function checkPostCategories(str, post, postList) {
                    
                    function checkArray(postId) {
                        for(var ar =0; ar < $scope.articleResults.length; ar++) {
                            var resultArrayId = $scope.articleResults[ar].id;
                            if(resultArrayId === postId) {
                               return true;
                            } else {
                                return false;
                            }
                        }
                    }
                    
                    function searchCategories(categoriesFound, post, term) {
                        var postObj = {};
                        for(var c = 0; c < categoriesFound.length; c++) {
                            if(categoriesFound[c].indexOf(term) != -1) {
                                postObj.id = post.id;
                                postObj.post = post;
                                var duplicate = checkArray(postObj.id);
                                if(duplicate === false) {
                                    $scope.articleResults.push(postObj);
                                } else {
                                    continue;
                                }
                            }
                        }
                    }

                    for(var p = 0; p < postList.length; p++) {
                        var categories = postList[p].acf.article_categories;
                        var searchedTerm = str.toLowerCase();
                        var postObj = {};
                        
                        if(typeof categories !== 'undefined') {
                            searchCategories(categories, postList[p], searchedTerm); 
                        }
                        
                        if (p + 1 == postList.length) {
                            searchAuthors(str);
                        }
                    }                
                    
                }
                
                function searchTitles(postList) {
                    //Check to see if Search query matches a Post title
                    for (var i = 0; i < postList.length; i++) {
                        var lowerTitle = postList[i].title.rendered.toLowerCase();
                        var postObj = {};
                        
                        if (lowerTitle.indexOf(str) != -1) {
                            postObj.id = postList[i].id;
                            postObj.post = postList[i];
                            $scope.articleResults.push(postObj);
                        }
                        if(i + 1 == postList.length) {
                            checkPostCategories(str, postList[i], postList);                            
                        }
                        
                    }
                }
                
                
                searchTitles($scope.postList);
                
            });
            
            
        };
    }]);
}());