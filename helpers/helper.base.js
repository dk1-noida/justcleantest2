/*
 +-----------------------------------------------------------+
 | Module Name: BASE SERVICE HELPER                          | 
 | Module Purpose: Manage the base functions                 |
 +-----------------------------------------------------------+
*/

'use strict';

var Q = require('q');
var request = require('request');
var Const = require( __base + 'app/helpers/helper.constant'); 

/**
 * Get web service end point
 * @author Manuraj M
 * @return json
 * @createdOn 4-Apr-2017
 */

var generate = function(endpoint){
    return __ws_url + endpoint;
};

/**
 * Prepare Query
 * @author Manuraj M
 * @return json
 * @createdOn 4-Apr-2017
 */

var prepare = function(params,endpoint){

    for(var key in params){
        if(!params[key]){
            params[key] = Const.NULL;
        }
        endpoint = endpoint.replace( new RegExp("{"+key+"}", "g"), params[key] );
    }

    return endpoint;
};


/**
 * API Request
 * @author Manuraj M
 * @return json
 * @createdOn 4-Apr-2017
 */

var apiRequest = function(options,cb){

	request(options,function(error, response, body){

		if (error) {
			cb(error);
		} else {
            try {
                var response = JSON.parse(body);
                cb( error, response );
            } catch (e) {
                cb(e.message.toString());
            }
		}
	});

};

module.exports = {
    generate : generate,
    prepare : prepare,
    apiRequest : apiRequest
}