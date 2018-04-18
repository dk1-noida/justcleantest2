/*
 +-----------------------------------------------------------+
 | Module Name: RESPONSE HELPER                              |
 | Module Purpose: Manage the api responses                  |
 | Author: Manuraj.M                                         |
 +-----------------------------------------------------------+
*/

'use strict';

/**
 * Success response helper
 * @author Manuraj M
 * @return json
 * @createdOn 14-Mar-2017
 */

var success = function(message,code,data){  

    return ({
        status: (data) ? true : false ,
        code : code,        
        message: message,
        data: (data) ? data : null
    });
};

/**
 * Failure response helper
 * @author Manuraj M
 * @return json
 * @createdOn 14-Mar-2017
 */

var failure = function(message,code) {

    var exception = message.toString();
    
    // Remove the word "Error:" from all messages and remove the trailing empty space..
    if(exception){
        exception = exception.replace("Error:","");
        exception = exception.replace(/^\s+|\s+$/g, "");
    }

    return ({
            status: false,
            code : code,	        
            message: exception,
            data: null
    });
};

module.exports = {
    success : success,
    failure : failure
}
