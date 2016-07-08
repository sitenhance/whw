<script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/signup-forms/popup/embed.js" data-dojo-config="usePlainJson: true, isDebug: false"></script><script type="text/javascript">require(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us10.list-manage.com","uuid":"6b7146de24eed617f953ac58c","lid":"07ce55e175"}) })</script>
    <div class="container-fluid" ng-controller="footerCtrl">
        <div class="row footer">
            <footer>
                <div class="col-md-10 col-md-offset-1 footer-container">
                    <div class="footer-links-container">
                        <div class="footer-first-link-sect">
                            <div class="about-links">
                                <h4>About Us</h4>
                                <ul>
                                    <li><a ng-href="/{{'#/about'}}">the founder</a></li>
                                    <li><a ng-href="/{{'#/company'}}">the company</a></li>
                                    <li><a ng-href="/{{'#/contact'}}">contact us</a></li>
<!--                                    <li><a ng-href="/{{'sitenhance/#/giveaways'}}">giveaways</a></li>-->
                                </ul>
                            </div>
                            <!-- end of about links -->
                            <div class="investor-links">
                                <h4>Investors</h4>
                                <ul>
                                    <li><a ng-href="/{{'#/press'}}">press room</a></li>
                                    <li><a ng-href="/{{'#/advertise'}}">advertise</a></li>
                                </ul>
                            </div>
                            <!-- investor links -->
                        </div><!-- end of footer first link sect -->
                        <!-- footer second link sect -->
                        <div class="footer-first-link-sect">
                        <div class="resources-link">
                            <h4>Site Policy</h4>
                            <ul>
                                <li><a ng-href="/{{'#/privacy'}}">privacy policy</a></li>
                                <li><a ng-href="/{{'#/social'}}">social media policy</a></li>
                                <li><a ng-href="/{{'#/terms'}}">terms of use</a></li>
                                <li><a ng-href="/{{'#/affiliate'}}">affiliate disclaimer</a></li>
                                <li><a ng-href="/{{'#/dcma'}}">dcma policy</a></li>
                                <li><a ng-href="/{{'#/earnings'}}">earnings disclaimer</a></li>
                                <li><a ng-href="/{{'#/feedback'}}">site feedback</a></li>
                            </ul>
                        </div><!-- end of resources link -->
                    </div><!-- end of footer second link sect -->
                        <div class="copyright-sect">
                            
                        </div>
                    </div>
                    <!-- end of footer first link container -->
                    <div class="updates-social-section">
                        <div class="footer-sign-up">
                            <p>SIGN UP FOR UPDATES</p>
                            <!-- Begin MailChimp Signup Form -->
                            <div id="mc_embed_signup">
                                <form action="//watchherwork.us10.list-manage.com/subscribe/post?u=6b7146de24eed617f953ac58c&amp;id=07ce55e175" method="post"
                                    id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate sign-up-form" target="_blank" novalidate>
                                    <div id="mc_embed_signup_scroll">
                                        <div class="mc-field-group">
                                            <input type="email" value="" placeholder="Email Address" name="EMAIL" class="required email sign-up-email" id="mce-EMAIL">
                                        </div>
                                        <div class="mc-field-group">
                                            <input type="text" value="" placeholder="Your Name" name="MMERGE1" class="required sign-up-name" id="mce-MMERGE1">
                                        </div>
                                        <div id="mce-responses" class="clear">
                                            <div class="response" id="mce-error-response" style="display:none"></div>
                                            <div class="response" id="mce-success-response" style="display:none"></div>
                                        </div>
                                        <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                                        <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_6b7146de24eed617f953ac58c_07ce55e175" tabindex="-1" value=""></div>
                                        <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button sign-up-btn"></div>
                                    </div>
                                </form>
                            </div>
                            <!--End mc_embed_signup-->
                        </div>
                        <div class="footer-social">
                            <div class="footer-icon-container">
                                <p>Connect With Her</p>
                                <a href="{{icons.link}}" class="social-icon" ng-repeat="icons in footer_social_icons" target="_blank">
                                <img ng-src="{{icons.url}}" alt="">
                                </a>
                            </div><!-- end of footer icon container -->
                        </div><!-- end of footer social -->
                    </div><!-- end of updates social section -->
                </div>
                <div class="col-md-10 col-md-offset-1 copyright-sect">
                    <p>&copy; 2015-2016 WatchHerWork, LLC | All Rights Reserved</p>
                    <p class="sitenhance">Web Design / Development by SITENHANCE</p>
                </div>
            </footer>
        </div>    
    </div> 
    <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
    <script src=<?php echo get_template_directory_uri() . "/js/whw_videos/json_compensation.js"?>></script>
    <?php wp_footer(); ?>
</body>
</html>