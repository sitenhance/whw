(function() {
    whwApp.controller('navCtrl', ['$scope', function($scope) {
        $scope.isActive = false;
        $scope.menuclick = function() {
            console.log($scope.isActive);
            $scope.isActive = !$scope.isActive;
            console.log($scope.isActive);
        };
    }]);
}());