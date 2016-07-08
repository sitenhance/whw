(function () {
    whwApp.controller('footerCtrl', ['$scope', 'pagesService', function ($scope, pagesService) {
        pagesService.footerPage.get(function (res) {
            $scope.footer_social_icons = [
                {
                    'name': 'facebook',
                    'url': res.acf.facebook_icon.url,
                    'link': 'https://www.facebook.com/watchherworkitout/',
                },
                {
                    'name': 'twitter',
                    'url': res.acf.twitter_icon.url,
                    'link': 'https://twitter.com/WatchHerWorking/'
                },
                {
                    'name': 'pinterest',
                    'url': res.acf.pinterest_icon.url,
                    'link': 'https://www.pinterest.com/watchherworking/'
                },
                {
                    'name': 'instagram',
                    'url': res.acf.instagram_icon.url,
                    'link': 'https://www.instagram.com/watchherworking/'
                },
                {
                    'name': 'LinkedIn',
                    'url': res.acf.linkedin_icon.url,
                    'link': 'https://www.linkedin.com/company/watchherwork.com/'
                },
                {
                    'name': 'google-plus',
                    'url': res.acf.google_plus_icon.url,
                    'link': 'https://plus.google.com/115366933861570929568/'
                },
                {
                    'name': 'email',
                    'url': res.acf.email_icon.url,
                    'link': 'mailto:info@watchherwork.com'
                }
        ];
        });
    }]);
}());