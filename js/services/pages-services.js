(function() {
    whwApp.factory('pagesService', [ '$resource', function($resource) {
        var pagesService = {};
        
        pagesService.headerPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '5'
        });
        
        pagesService.carouselPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '7'
        });
        
        pagesService.homePage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '9'
        });
        
        pagesService.footerPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '11'
        });
        
        pagesService.videosPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '53'
        });
        
        pagesService.aboutPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '85'
        });

        pagesService.articlesPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '193'
        });
        
        pagesService.articleAdPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '917'
        });
        
        pagesService.practicePage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '71'
        });
        
        pagesService.privacyPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '99'
        });
        
        pagesService.socialPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '103'
        });
        
        pagesService.termsPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '105'
        });
        
        pagesService.affiliatePage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '111'
        });
        
        pagesService.dcmaPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '107'
        });
        
        pagesService.earningsPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '109'
        });
        
        pagesService.companyPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '139'
        });
        
        pagesService.pressPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '141'
        });
        
        pagesService.sponsorPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '143'
        });
        
        pagesService.contactPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '77'
        });
        
        pagesService.newsPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '147'
        });
        
        pagesService.giveawaysPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '151'
        });
        
        pagesService.feedbackPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '153'
        });
        
        pagesService.forHimPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '401'
        });
        
        pagesService.eventsPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '95'
        });
        
        pagesService.eventPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '709'
        });
        
        pagesService.authorPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '778'
        });
        
        pagesService.pollResultsPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '827'
        });
        
        pagesService.categoriesPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '860'
        });
        
        pagesService.videoPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '871'
        });
        
        pagesService.searchResultsPage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '1000'
        });
        
        pagesService.contributePage = $resource(appInfo.api_url + 'pages/:ID', {
            ID: '1156'
        });
                
        return pagesService;
    }]);
}());