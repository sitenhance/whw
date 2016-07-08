(function() {
    whwApp.service('S3UploadService', ['$q', function($q) {
        //Us standard region
        AWS.config.region = 'us-east-1';
        AWS.config.update({accessKeyId: 'AKIAJQDQVPEGP6TRK5RQ', secretAccessKey: '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'});
        
        var bucket = new AWS.S3({params: { Bucket: 's3uploadman', maxRetries: 10}, httpOptions: { timeout: 360000 }});
        
        this.Progress = 0;
        this.Upload = function(file) {
            console.log('hello');
            var deferred = $q.defer();
            var params = { Bucket: 's3uploadman', Key: file.name, ContentType: file.type, Body: file };
            var options = {
                //part size of 10mb
                partSize: 10 * 1024 * 1024,
                queueSize: 1,
                ACL: 'bucket-owner-full-control'
            };
            var uploader = bucket.upload(params, options, function(err, data) {
                if (err) {
                    deferred.reject(err);
                }
                deferred.resolve();
            });
            uploader.on('httpUploadProgress', function(event) {
                deferred.notify(event);
            });
            
            return deferred.promise;
            
        };
        
    }]);
}());