<div class="header-section">
    <div class="container-fluid">
        <div class="col-md-4 col-md-offset-4">
            <img ng-src="{{headerLogo}}" alt="">
        </div>
        <div class="col-md-4">
            <div class="social-container">
                <div class="social-icons">
                    <img ng-src="{{icon.url}}" alt="" ng-repeat='icon in socialIcons' class="social-icon">
                </div>
            </div>
        </div>
    </div>
</div>