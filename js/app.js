var whwApp = angular.module('whwApp', ['ui.router', 'ngResource', 'ngSanitize', 'ui.bootstrap', 'ui.bootstrap.tpls', 'uiGmapgoogle-maps', 'djds4rce.angular-socialshare', 'ezfb', 'ngFileUpload', 'angulike', 'ng-jwplayer']);

whwApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: appInfo.template_url + '/templates/home.html'
        })
        .state('article', {
            url: '/article/:id',
            templateUrl: appInfo.template_url + '/templates/article.html',
            controller: 'articleCtrl'
        })
        .state('articles', {
            url: '/articles',
            templateUrl: appInfo.template_url + '/templates/articles.html',
            controller: 'articleCtrl'
        })
        .state('videos', {
            url: '/videos',
            templateUrl: appInfo.template_url + '/templates/videos.html',
            controller: 'videosCtrl'
        })
        .state('video', {
            url: '/video/:id',
            templateUrl: appInfo.template_url + '/templates/video.html',
            controller: 'videosCtrl'
        })
        .state('categories', {
            url: '/categories/:category',
            templateUrl: appInfo.template_url + '/templates/video-categories.html',
            controller: 'categoriesCtrl'
        })
        .state('about', {
            url: '/about',
            templateUrl: appInfo.template_url + '/templates/about.html',
            controller: 'aboutCtrl'
        })
        .state('events', {
            url: '/events',
            templateUrl: appInfo.template_url + '/templates/events.html',
            controller: 'eventsCtrl'
        })
        .state('event', {
            url: '/event/:id',
            templateUrl: appInfo.template_url + '/templates/event.html',
            controller: 'eventsCtrl'
        })
        .state('forhim', {
            url: '/forhim',
            templateUrl: appInfo.template_url + '/templates/forhim.html',
            controller: 'forHimCtrl'
        })
        .state('practice', {
            url: '/practice',
            templateUrl: appInfo.template_url + '/templates/practice.html',
            controller: 'practiceCtrl'
        })
        .state('privacy', {
            url: '/privacy',
            templateUrl: appInfo.template_url + '/templates/privacy.html',
            controller: 'privacyCtrl'
        })
        .state('social', {
            url: '/social',
            templateUrl: appInfo.template_url + '/templates/social.html',
            controller: 'socialCtrl'
        })
        .state('terms', {
            url: '/terms',
            templateUrl: appInfo.template_url + '/templates/terms.html',
            controller: 'termsCtrl'
        })
        .state('affiliate', {
            url: '/affiliate',
            templateUrl: appInfo.template_url + '/templates/affiliate.html',
            controller: 'affiliateCtrl'
        })
        .state('dcma', {
            url: '/dcma',
            templateUrl: appInfo.template_url + '/templates/dcma.html',
            controller: 'dcmaCtrl'
        })
        .state('earnings', {
            url: '/earnings',
            templateUrl: appInfo.template_url + '/templates/earnings.html',
            controller: 'earningsCtrl'
        })
        .state('company', {
            url: '/company',
            templateUrl: appInfo.template_url + '/templates/company.html',
            controller: 'companyCtrl'
        })
        .state('press', {
            url: '/press',
            templateUrl: appInfo.template_url + '/templates/press.html',
            controller: 'pressCtrl'
        })
        .state('advertise', {
            url: '/advertise',
            templateUrl: appInfo.template_url + '/templates/sponsor.html',
            controller: 'sponsorCtrl'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: appInfo.template_url + '/templates/contact.html',
            controller: 'contactCtrl'
        })
        .state('news', {
            url: '/news',
            templateUrl: appInfo.template_url + '/templates/news.html',
            controller: 'newsCtrl'
        })
        .state('giveaways', {
            url: '/giveaways',
            templateUrl: appInfo.template_url + '/templates/giveaways.html',
            controller: 'giveawaysCtrl'
        })
        .state('feedback', {
            url: '/feedback',
            templateUrl: appInfo.template_url + '/templates/feedback.html',
            controller: 'feedbackCtrl'
        })
        .state('videoUp', {
            url: '/videoUp',
            templateUrl: appInfo.template_url + '/templates/videoUp.html',
            controller: 'videoUpCtrl'
        })
        .state('author', {
            url: '/author/:id',
            templateUrl: appInfo.template_url + '/templates/author.html',
            controller: 'authorCtrl'
        })
        .state('search', {
            url: '/search',
            templateUrl: appInfo.template_url + '/templates/search.html',
            controller: 'searchCtrl'
        })
        .state('poll-results', {
            url: '/pollresults',
            templateUrl: appInfo.template_url + '/templates/poll-results.html',
            controller: 'pollCtrl'
        })
        .state('contribute', {
            url: '/contribute',
            templateUrl: appInfo.template_url + '/templates/contribute.html',
            controller: 'contributeCtrl'
        });
    
});

whwApp.config(function(ezfbProvider) {
  var myInitFunction = function ($window, $rootScope, ezfbInitParams) {
    $window.FB.init({
      appId: '667561800070640',
      version: 'v2.6'
    });

    $rootScope.$broadcast('FB.init');
  };

  ezfbProvider.setInitFunction(myInitFunction);
});


whwApp.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
//        key: 'AIzaSyDi1LaHfHr7dVfHaI7rts-UAuw4bdjKLkc'
        key: 'AIzaSyDeu8k3pDOIBb02JvekkARQlnLwOX5BNx0'
    });
}]);

// whwApp.config(function($locationProvider){
//     $locationProvider.html5Mode(true).hashPrefix('!');
// });

whwApp.filter('to_trusted', ['$sce', function($sce) {
    return function(text) {
        return $sce.trustAsHtml(text);
    };
    
    
}]);