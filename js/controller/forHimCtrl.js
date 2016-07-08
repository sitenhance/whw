(function() {
    whwApp.controller('forHimCtrl', [ '$scope', 'pagesService', 'categoriesService', '$http', function($scope, pagesService, categoriesService, $http) {
        
        $scope.questionSubmitted = false;
        
        pagesService.forHimPage.get(function(res) {
            console.log(res);
            $scope.bannerImage = res.acf.banner_image.url;
            $scope.himDescription = res.acf.for_him_description_text;
            $scope.himAdOneImage = res.acf.for_him_ad_one_image.url;
            $scope.himAdOneUrl = res.acf.for_him_ad_one_url;
            $scope.himAdTwoImage = res.acf.for_him_ad_two_image.url;
            $scope.himAdTwoUrl = res.acf.for_him_ad_two_url;
            $scope.forHimQuestion1Img = res.acf.for_him_question1_img.url;
            $scope.forHimQuestion1Title = res.acf.for_him_question1_title;
            $scope.forHimQuestion1Answer = res.acf.for_him_question1_answer;
            $scope.forHimQuestion2Img = res.acf.for_him_question2_img.url;
            $scope.forHimQuestion2Title = res.acf.for_him_question2_title;
            $scope.forHimQuestion2Answer = res.acf.for_him_question2_answer;
            $scope.forHimQuestion3Img = res.acf.for_him_question3_img.url;
            $scope.forHimQuestion3Title = res.acf.for_him_question3_title;
            $scope.forHimQuestion3Answer = res.acf.for_him_question3_answer;
        });
        categoriesService.forHimCategory.query(function(res) {
            
            var htmlEntities = {
                nbsp: ' ',
                cent: '¢',
                pound: '£',
                yen: '¥',
                euro: '€',
                copy: '©',
                reg: '®',
                lt: '<',
                gt: '>',
                quot: '"',
                amp: '&',
                apos: '\''
            };

            function makeString(object) {
                if (object === null) return '';
                return '' + object;
            }

            function unescapeHTML(str) {
                return makeString(str).replace(/\&([^;]+);/g, function (entity, entityCode) {
                    var match;

                    if (entityCode in htmlEntities) {
                        return htmlEntities[entityCode];
                        /*eslint no-cond-assign: 0*/
                    } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
                        return String.fromCharCode(parseInt(match[1], 16));
                        /*eslint no-cond-assign: 0*/
                    } else if (match = entityCode.match(/^#(\d+)$/)) {
                        return String.fromCharCode(~~match[1]);
                    } else {
                        return entity;
                    }
                });
            }

            
            $scope.forHimPosts =  _.map(res).filter(function(post) { return post.title.rendered = unescapeHTML(post.title.rendered); });
            $scope.showAnswer = false;
            
            $scope.displayAnswer = function(ans) {
                if($scope.showAnswer === false) {
                    $scope.showAnswer = ans;
                } else if ($scope.showAnswer === ans) {
                    $scope.showAnswer = false;
                } else {
                    $scope.showAnswer = ans;
                }
            };
            
            $scope.post_per_load = 3;

            if ($scope.post_per_load >= $scope.forHimPosts.length) {
                $scope.hideAnswerLoadMoreBtn = true;
            }

            if ($scope.forHimPosts.length === 0) {
                $scope.hideAnswerLoadMoreBtn = true;
            } else if ($scope.forHimPosts.length < $scope.post_per_load) {
                $scope.hideAnswerLoadMoreBtn = true;
            }

            $scope.loadLess = function () {
                if ($scope.post_per_load > 3) {
                    $scope.post_per_load -= 3;
                    $scope.hideAnswerLoadMoreBtn = false;
                }
            };

            $scope.loadMore = function () {
                if ($scope.post_per_load < $scope.forHimPosts.length) {
                    $scope.post_per_load += 3;
                    $scope.hideAnswerLoadMoreBtn = false;
                    if ($scope.forHimPosts.length < $scope.post_per_load) {
                        $scope.hideAnswerLoadMoreBtn = true;
                    }
                } else {
                    $scope.hideAnswerLoadMoreBtn = true;
                }
            };
            
        });
        
        $scope.submitQuestion = function () {
            $http({
                method: 'POST',
                url: appInfo.template_url + 'php/question.php',
                data: $.param($scope.myData),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
                .success(function (data) {
                    console.log(data);
                    if (!data.success) {
                        $scope.errorsName = data.errors;
                        console.log($scope.errorsName);
                        $scope.questionSubmitted = false;
                    } else {
                        $scope.submissionMessage = data.message;
                        $scope.questionSubmitted = true;
                    }
                });
        };
        
    }]);
}());