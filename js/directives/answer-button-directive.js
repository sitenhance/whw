(function() {
    whwApp.directive('answerButton', function() {
        return {
            restrict: 'A',
            link: function (scope, elem, attr) {
                elem.bind('click', function(e) {
                    if($(this).text() === 'View Answer') {
                        $(this).text('Hide Answer');
                    } else if($(this).text() === 'Hide Answer') {
                        $(this).text('View Answer');
                    }
                });
            }
        };
    });
}());