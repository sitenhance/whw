(function() {
    whwApp.controller('pollCtrl', [ '$scope', 'pagesService', 'ezfb', '$location', function($scope, pagesService, ezfb, $location) {
        
        pagesService.pollResultsPage.get(function(res) {
            $scope.socialShare = res.acf.poll_social_share;
            $scope.topFirstAdImage = res.acf.top_first_ad_image.url;
            $scope.topFirstAdUrl = res.acf.top_first_ad_url;
            $scope.topSecondAdImage = res.acf.top_second_ad_image.url;
            $scope.topSecondAdUrl = res.acf.top_second_ad_url;
            $scope.commentsFirstAdImage = res.acf.comments_first_ad_image.url;
            $scope.commentsFirstAdUrl = res.acf.comments_first_ad_url;
            $scope.commentsSecondAdImage = res.acf.comments_second_ad_image.url;
            $scope.commentsSecondAdUrl = res.acf.comments_second_ad_url;
            
            $scope.pluginOn = true;
            $scope.rendering = false;

            ezfb.getLoginStatus(function (res) {
                $scope.loginStatus = res;
            });

            ezfb.api('/me', function (res) {
                $scope.apiMe = res;
            });

            $scope.rendered = function () {
                $scope.rendering = false;
            };

            $scope.$watch('pluginOn', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    $scope.rendering = true;
                }
            });

            $scope.currentUrl = $location.absUrl();
            
        });
        
        var questions = [

            {

                "question": "Have you ever dated a co-worker?",

                "id": "1",

                "options": [

                    "Yes",

                    "No"

                ]

            },

            {

                "question": "How long is your commute?",

                "id": "2",

                "options": [

                    "0-15 minutes",

                    "15-30 minutes",

                    "30-60 minutes",

                    "over an hour"

                ]

            },

            {

                "question": "Would you relocate for a job?",

                "id": "3",

                "options": [

                    "Yes",

                    "No"

                ]

            },

            {

                "question": "Are you the primary breadwinner in your household?",

                "id": "4",

                "options": [

                    "Yes",

                    "No"

                ]

            },

            {

                "question": "How available are you to your job during your vacation?",

                "id": "5",

                "options": [

                    "Not at all",

                    "Minimally",

                    "Totally"

                ]

            },

            {

                "question": "When was the last time you asked for a raise?",

                "id": "6",

                "options": [

                    "0-12 months",

                    "13-36 months",

                    "36+ months",

                    "Never"

                ]

            },

            {

                "question": "Do you have a housekeeper?",

                "id": "7.",

                "options": [

                    "Yes, Live in",

                    "Yes, Regularly scheduled (once a week or once a month)",

                    "No"

                ]

            },

            {

                "question": "What percentage of your vacation days do you use annually?",

                "id": "8",

                "options": [

                    "0",

                    "25%",

                    "50%",

                    "75%",

                    "100%"

                ]

            },

            {

                "question": "Do you talk about your personal life at work?",

                "id": "9",

                "options": [

                    "Yes",

                    "No"

                ]

            },

            {

                "question": "Are you happy at your job?",

                "id": "10",

                "options": [

                    "Yes",

                    "No"

                ]

            },

            {

                "question": "Would you go to Human Resources if you felt sexually harassed? ",

                "id": "11",

                "options": [

                    "Yes",

                    "No"

                ]

            },

            {

                "question": "Do you have a career/life coach?",

                "id": "12",

                "options": [

                    "Yes",

                    "No"

                ]

            },

            {

                "question": "How satisfied are you with your compensation?",

                "id": "13",

                "options": [

                    "I am underpaid",

                    "I am paid appropriately",

                    "I am overpaid"

                ]

            }

        ];
        
        // google.charts.load('current', { 'packages': ['corechart'] });
        // google.charts.setOnLoadCallback(drawChart);
        // function drawChart() {

        //     var data = google.visualization.arrayToDataTable([
        //         ['Task', 'Hours per Day'],
        //         ['0-12 months', 11],
        //         ['13-36 months', 2],
        //         ['36+ months', 2],
        //         ['Never', 2]
        //     ]);

        //     var options = {
        //         title: 'Results: When was the last time you asked for a raise?'
        //     };

        //     var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        //     chart.draw(data, options);
        // }
        
        function set_random_survey() {

            var random_question_id = Math.floor((Math.random() * (questions.length - 1) + 1));
            
            var currentPollQuestionObj = questions[random_question_id];
            
            $scope.pollQuestion = currentPollQuestionObj.question;
            $scope.pollAnswers = currentPollQuestionObj.options; 
            
        }
        setTimeout(set_random_survey, 300);
        
    }]);
}());