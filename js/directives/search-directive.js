(function() {
    whwApp.directive('search', function(){
        return {
            link: function(scope, element, attr) {
                element.bind('keypress', function(e) {
                    if(event.which == 13) {
                        scope.$apply(function() {
                            scope.$eval(attr.search);
                        });
                    }
                    
                });
            }
        };
    });
}());