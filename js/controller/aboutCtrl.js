(function() {
    whwApp.controller('aboutCtrl', [ '$scope', 'pagesService', '$sce', 'usersService', function($scope, pagesService, $sce, usersService) {
        pagesService.aboutPage.get(function(res) {
            $scope.aboutDescription = res.acf.video_introduction_text;
            $scope.featuredName = res.acf.featured_spot_information_1;
            $scope.founderName = res.acf.founder_name;
            $scope.founderImage = res.acf.founder_image.url;
            $scope.foundersTitle = res.acf.founder_job_title;
            $scope.foundersBio = res.acf.founder_biography;
            $scope.skyscraperAdImage = res.acf.side_advertisement_image_1.url;
            $scope.skyscraperAdUrl = res.acf.side_advertisement_url_1;
            $scope.rectangleAdImage = res.acf.side_advertisement_image_2.url;
            $scope.rectangleAdUrl = res.acf.side_advertisement_url_2;
            
            $scope.founderImgBg = {'background-image': 'url('+ $scope.founderImage +')'};
            
            var aboutACF = res.acf;
            
            $scope.advisorAcfImg = [];
            $scope.advisorAcfName = [];
            
            var acfObject = _.each(_.pairs(aboutACF), function(keyValue) {
                return keyValue;
            });
            
//            $scope.featuredLogos = [];
//            
//            //Gather Featured Logos Acf fields
//            _.map(acfObject, function (num) {
//                var objValues = _.values(num);
//                if (objValues[0].indexOf('logo_') != -1) {
//                    if (!_.isUndefined(objValues)) {
//                        $scope.featuredLogos.push(objValues[1]);
//                    }
//                }
//            });
            $scope.featuredLogos = res.acf.featured_logos;
            
        });

        $scope.options = {
                type: 'mp4',
        };

        $scope.file = $sce.trustAsResourceUrl('http://d16at6ua905oks.cloudfront.net/Home/DeniseHamilton/DeniseHamilton_Home_WelcomeToWatchHerWork_WatchHerWork_Founder_Dhamilton-1467727970739.mp4');
        
        var cnt = 0;
        
        usersService.allUsers.query(function(res) {
            var usersACF = res;
            console.log(res);
            var userObj = _.each(_.pairs(usersACF), function(keyValue) {
                return keyValue;
            });
            
            var userAcfObj = _.map(userObj, function(item, key) {
                if(_.isObject(item[1].acf)) {
                    return item;
                }
            }).map(function(item) {
               return item;
            });
            
            $scope.advisoryMembers = [];
            
            //Load Advisory members 
            _.reject(userAcfObj, function(num) {
                return _.isUndefined(num);
            }).map(function(item, key) {
                if(item[1].acf.is_advisor !== false && item[1].acf.is_advisor !== undefined) {
                    $scope.advisoryMembers.push(item[1]);
                }
            });
            
            $scope.advisoryMembers = _.sortBy($scope.advisoryMembers, function(member) { return member.name.split(' ')[1]; });
            
        });
        
    }]);
}());