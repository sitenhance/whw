(function() {
    whwApp.directive('carouselItem', function() {
       return {
           restrict: 'A',
           scope: {
               index: '@'
           }
       }; 
    });
    
    whwApp.directive('carousel', function() {
        return {
          restrict: 'A',
          link: function(scope, element, attr) {
              function next(el, seats) {
                  if (el.next().length > 0) {
                      return el.next();
                  } else {
                      return seats.first();
                  }
              }

              function prev(el, seats) {
                  if (el.prev().length > 0) {
                      return el.prev();
                  } else {
                      return seats.last();
                  }
              }
              setInterval(function() {
                  var el, new_seat, ref;
                  var seats = $('.carousel-seat');
                  var carousel;
                  carousel = $('.carousel');
                  if(carousel.hasClass('is-reversing')) {
                      carousel.removeClass('is-reversing');
                  }
                  el = $('.is-ref');
                  el = el.removeClass('is-ref');
                  new_seat = next(el, seats);
                  new_seat.addClass('is-ref').css('order', 1);
                  for(i = j =2, ref = seats.length; 2 <= ref ? j <= ref : j >= ref; i = 2 <= ref ? ++j : --j) {
                      new_seat = next(new_seat, seats).css('order', i);
                  }
                  carousel = carousel.removeClass('is-set');
                  return setTimeout((
                      function() {
                          return carousel.addClass('is-set');
                      }
                  ), 50);
              }, 6000);
          }  
        };
    });
    whwApp.directive('carnav', function() {
        return {
            restrict: 'A',
            scope: {
                carnav: '@'
            },
            link: function(scope, element, attr) {
                element.bind('click', function(e) {
                    function next(el, seats) {
                        if (el.next().length > 0) {
                            return el.next();
                        } else {
                            return seats.first();
                        }
                    }

                    function prev(el, seats) {
                        if (el.prev().length > 0) {
                            return el.prev();
                        } else {
                            return seats.last();
                        }
                    }
                    
                    var seats = $('.carousel-seat');
                    var el, new_seat, ref;
                    el = $('.is-ref');
                    var carousel;
                    carousel = $('.carousel');
                    
                    el = el.removeClass('is-ref');
                    
                    if(element.attr('carnav') == 'next') {
                         new_seat = next(el, seats);
                         carousel.removeClass('is-reversing');
                    } else {
                        new_seat = prev(el, seats);
                        carousel.addClass('is-reversing');
                    }
                    
                    new_seat.addClass('is-ref').css('order', 1);
                    for (i = j = 2, ref = seats.length; 2 <= ref ? j <= ref : j >= ref; i = 2 <= ref ? ++j : --j) {
                        new_seat = next(new_seat, seats).css('order', i);
                    }
                    
                    carousel = carousel.removeClass('is-set');
                    return setTimeout((
                        function() {
                            return carousel.addClass('is-set');
                        }
                    ), 50);
                });
            }
        };
    });
}());