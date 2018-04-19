/*
 +-------------------------------------------------------------------------------------------+
 | Module Name: Upload file	                         									 |
 | Module Purpose: Upload single file of any format			         |
 | Author: Ajay Kumar Shukla                                      								 |
 | Date : 25 Jan 2018																		 |
 +-------------------------------------------------------------------------------------------+
*/
'user strict'

var AWS = require('aws-sdk');
var fs =  require('fs');

module.exports = {
	
	uploadFileOnS3 : function(param, next){

		 AWS.config = new AWS.Config();
	     AWS.config.accessKeyId = "AKIAJKBB25NYTVKW6A3A";
	     AWS.config.secretAccessKey = "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";
	     AWS.config.region = "ap-southeast-1";
	     AWS.config.apiVersions = {
	        "s3": "2006-03-01"
	     }

		var s3Bucket = new AWS.S3();

		var fileExtension,file;
		
		fileExtension = param.param.originalname.split('.').pop();
		
		file = param.param.filename+'.'+fileExtension;

		 var params = {
            Bucket: 'justcleantest',
            Key: param.param.originalname,
            Body: param.param.path	
        };

        fs.readFile(param.param.path, function (err, data) {
		  if (err) 
		  { 
		  	return next('error to upload file '+err, null);
		  }


		 params = {Bucket: 'justcleantest', Key: file, Body: data };

	     s3Bucket.putObject(params, function(err, data) {
	         if (err) {

	            return next('error to upload file '+err, null);

	         } else {

	         	var fileUrl = "https://s3-eu-west-1.amazonaws.com/justcleantest/"+file;

        		return next(null, fileUrl);

	         }

	      });

		});

	}
	

}