(function() {
    whwApp.controller('homeCtrl', [ '$scope', 'pagesService', '$sce', 'postsService', '$http', '$rootScope', function($scope, pagesService, $sce, postsService, $http, $rootScope) {
        pagesService.homePage.get(function(res) {
            $scope.top_ad_img = res.acf.top_advertisement_image.url;
            $scope.top_ad_url = res.acf.top_advertisement_url_link;
            
            $scope.second_ad_img = res.acf.second_advertisement_image.url;
            $scope.second_ad_url = res.acf.second_advertisement_url;
            
            $scope.get_involved_background_image = res.acf.get_involved_background_image.url;
            
            $scope.get_involved_load = {'background-image': 'url('+ $scope.get_involved_background_image +')'};
            
            setTimeout(function() {
                $scope.instagram_feed = res.acf.instagram_feed;    
            }, 250);
            
            $scope.twitter_feed = res.acf.twitter_feed;
            $scope.pinterest_feed = res.acf.pinterest_feed;
        });

        $scope.options = {
                type: 'mp4',
        };

        $scope.file = $sce.trustAsResourceUrl('http://d16at6ua905oks.cloudfront.net/Home/DeniseHamilton/DeniseHamilton_Home_WelcomeToWatchHerWork_WatchHerWork_Founder_Dhamilton-1467727970739.mp4');
       
       $scope.facebookImg = appInfo.template_url + 'images/facebook.png';
       
       $scope.poll_logo = appInfo.template_url + 'images/whw-logo.png';
       
       $scope.event_icon = appInfo.template_url + 'images/event_icon.png';
       $scope.donate_icon = appInfo.template_url + 'images/donate_icon.png';
       $scope.question_icon = appInfo.template_url + 'images/question_icon.png';
       
       
       $scope.articleLimit = 3;
       $scope.articles = [];
       $scope.sponsoredArticles = [];
       
       postsService.allPosts.query(function(res) {
           $scope.posts = res;
           console.log($scope.posts);
           //Loop through all WordPress Posts
           for(var i = 0; i < $scope.posts.length; i++) {
               //Check to see if post has one category
               if($scope.posts[i].categories.length == 1) {
                   //Check to make sure Blog category is present
                   if($scope.posts[i].categories[0] == 2) {
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
                   for(var j = 0; j < $scope.posts[i].categories.length; j++) {
                       if($scope.posts[i].categories[j] == 2) {
                            if ($scope.posts[i].acf.is_this_an_advertisement === true) {
                                $scope.sponsoredArticles.push($scope.posts[i]);
                            } else {
                                $scope.articles.push($scope.posts[i]);
                            }
                       }
                   }
               }
               
           } 
           $scope.articles.splice(1, 0, $scope.sponsoredArticles[0]);
       });
       
       //Handle Keep Up With Her Form
       $scope.signUpData = {};
       
       $scope.processSignUp = function() {
           $http({
               method: 'POST',
               url: appInfo.template_url + '/php/signup.php',
               data: $.param($scope.signUpData),
               headers: {'Content-Type': 'application/x-www-form-urlencoded'}
           }).success(function(data) {
               console.log(data);
           });
       };
        
    }]);
}());