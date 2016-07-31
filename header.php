<!DOCTYPE html>
<html <?php language_attributes(); ?> ng-app="whwApp">

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <title>
        <?php wp_title( '&laquo', true, 'right'); ?>
        <?php bloginfo( 'name'); ?>
    </title>
    <!--<base href="/sitenhance/">-->
    <meta name="author" content="WatchHerWork">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta property="fb:app_id" content="667561800070640" />
    <link rel="shortcut icon" href="/favicon.ico">
    <link rel="apple-touch-icon" href="/favicon.png">
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="http://content.jwplatform.com/libraries/u5Apx40q.js"></script>
    <?php wp_head(); ?>
    <!--[if lt IE 9]>
	    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <link rel="stylesheet" href="<?php echo get_stylesheet_uri(); ?>">
</head>

<body <?php body_class(); ?> ng-controller="stateCtrl">
    <!-- Facebook SDK -->
    <div id="fb-root"></div>
    <script>
        window.fbAsyncInit = function () {
            FB.init({
                appId: '667561800070640',
                xfbml: true,
                version: 'v2.6'
            });
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6&appId=667561800070640";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    </script>
    <!-- End of Facebook SDK -->
    <div class="header-section" ng-controller="headerCtrl">
        <div class="container-fluid">
            <div class="row">
                <div class="header-items">
                    <div class="col-md-4 col-md-offset-4">
                        <img ng-src="{{headerLogo}}" alt="" ui-sref='home' class="header-logo">
                    </div>
                    <!-- end of col md 4 -->
                    <div class="col-md-4">
                        <div class="social-container">
                            <div class="social-icons">
                                <a href="{{icon.link}}" class="social-icon" ng-repeat='icon in socialIcons' target="_blank">
                                    <img ng-src="{{icon.url}}" alt="">
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- end of col md 4 -->
                </div>
                <!-- end of header items -->
            </div>
            <!-- end of row -->
        </div>
        <!-- end of container fluid -->
    </div>
    <!-- end of header section -->
    <!-- Navigation -->
    <nav class="navbar navbar-default whw-navbar" ng-controller="navCtrl">
        <div class="container-fluid nav-flex">
            <div class="mobile-btn-container" ng-click="menuclick()">
                <span class="hamburger-icon"></span>
                <span class="mobile-menu-text">MENU</span>
            </div>
            <ul class="nav navbar-nav">
                <li><a ui-sref="home">HOME</a>
                </li>
                <li><a ui-sref="about">ABOUT</a>
                </li>
                <li><a ui-sref="videos">VIDEOS</a>
                </li>
                <li><a ui-sref="articles">ARTICLES</a>
                </li>
                <li><a ui-sref="events">EVENTS</a>
                </li>
                <li><a ui-sref="forhim">FOR HIM</a>
                </li>
            </ul>
            <div class="search-box" ng-controller="searchCtrl">
                <form class="navbar-form pull-right" role="Search">
                    <div class="form-group search-group">
                        <i class="fa fa-search whw-search-icon"></i>
                        <input type="text" class="form-control whw-search" ng-model="headerSearch" search="performSearch(headerSearch)" placeholder="Search">
                    </div>
                </form>
            </div>
        </div>
        <div class="mobile-nav">
            <div class="mobile-nav-container" ng-class="{'is-visible': isActive}">
                <div class="close-btn-container" ng-click="menuclick()">
                    <span class="mobile-menu-icon"></span>
                </div>
                <ul class="primary-nav">
                    <li><a ui-sref="home" ng-click="menuclick()">HOME</a>
                    </li>
                    <li><a ui-sref="about" ng-click="menuclick()">ABOUT</a>
                    </li>
                    <li><a ui-sref="videos" ng-click="menuclick()">VIDEOS</a>
                    </li>
                    <li><a ui-sref="articles" ng-click="menuclick()">ARTICLES</a>
                    </li>
                    <li><a ui-sref="events" ng-click="menuclick()">EVENTS</a>
                    </li>
                    <li><a ui-sref="forhim" ng-click="menuclick()">FOR HIM</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Carousel -->
    <div class="carousel-section" ng-controller="carouselCtrl">
        <div class="container-fluid">
            <div class="row">
                <div class="wrap">
                    <nav class="next">
                        <a class="customNextBtn" href="#" carnav="next">&nbsp;</a>
                    </nav>
                    <nav class="prev">
                        <a class="customPrevBtn" href="#" carnav="prev">&nbsp;</a>
                    </nav>
                    <ul carousel class="carousel is-set">
                        <li ui-sref="categories({category: item[0]})" carousel-item index="{{$index}}" class="carousel-seat" ng-style="{'background': 'url({{item[1]}}) no-repeat center'}" ng-repeat="item in carouselItems" ng-class="{'is-ref': $last}">
                            <a href="#">
                                <div class="caption">
                                    <p ng-cloak>{{item[0]}}</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <!-- end of carousel -->
                </div>
                <!-- end of wrap -->
            </div>
            <!-- end of row -->
        </div>
        <!-- end of container fluid -->
    </div>
    <!-- end of carousel section -->