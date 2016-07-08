(function() {
   whwApp.controller('stateCtrl', [ '$scope', 'stateService', function($scope, stateService) {
       
       $scope.current_state = stateService.current_state;
       
       $scope.$on('handleState', function() {
           $scope.current_state = stateService.current_state;
       });
       
       $scope.set_state = function(state) {
         stateService.set_state(state);  
       };
       
   }]); 
}());