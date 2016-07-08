(function () {
    whwApp.controller('companyCtrl', ['$scope', 'postsService', 'pagesService', 'usersService', function ($scope, postsService, pagesService, usersService) {
        pagesService.companyPage.get(function (res) {
            console.log(res);
            $scope.company_image = res.acf.company_image.url;
            $scope.company_description = res.acf.company_description;
            $scope.founderName = res.acf.founder_name;
            $scope.founderImage = res.acf.founder_image.url;
            $scope.foundersTitle = res.acf.founder_job_title;
            $scope.foundersBio = res.acf.founder_biography;
            $scope.services = res.acf.services;

            $scope.founderImgBg = {
                'background-image': 'url(' + $scope.founderImage + ')'
            };

            var aboutACF = res.acf;

            $scope.advisorAcfImg = [];
            $scope.advisorAcfName = [];

            var acfObject = _.each(_.pairs(aboutACF), function (keyValue) {
                return keyValue;
            });
        });

        var cnt = 0;

        usersService.allUsers.query(function (res) {
            var usersACF = res;
            console.log(res);
            var userObj = _.each(_.pairs(usersACF), function (keyValue) {
                return keyValue;
            });

            var userAcfObj = _.map(userObj, function (item, key) {
                if (_.isObject(item[1].acf)) {
                    return item;
                }
            }).map(function (item) {
                return item;
            });

            $scope.advisoryMembers = [];

            //Load Advisory members 
            _.reject(userAcfObj, function (num) {
                return _.isUndefined(num);
            }).map(function (item, key) {
                if (item[1].acf.is_advisor !== undefined && item[1].acf.is_advisor !== false) {
                    $scope.advisoryMembers.push(item[1]);
                }
            });
            $scope.advisoryMembers = _.sortBy($scope.advisoryMembers, function (member) {
                return member.name.split(' ')[1];
            });
        });
    }]);
}());