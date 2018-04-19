    'use strict';

/*
 +-----------------------------------------------------------+
 | Module Name: Security                                     |
 | Module Purpose: Middleware for manage the security        |
 +-----------------------------------------------------------+
*/

var jwt = require('jsonwebtoken');
var failure = require( __base + 'app/helpers/helper.response').failure;
var Http = require( __base + 'app/helpers/helper.http');

var message_config = require( __base + 'config/res_message');

var db = require( __base + 'app/schema/');
var users = db.users;

//this function is used to validate request header

function validateReqHeader(reqHeaders)
{
   if(!reqHeaders.language_id)
    {
        return message_config.langReqMsg[1];
    }
    if(!reqHeaders.group_id)
    {
        return message_config.grpReqMsg[reqHeaders.language_id];
    }
    if(!reqHeaders.country_id)
    {
        return message_config.countryIdReqMsg[reqHeaders.language_id];
    }
    if(!reqHeaders.country_code)
    {
        return message_config.counryCodeReqMsg[reqHeaders.language_id];
    }
    return null;
}

module.exports={

    /**
     * Validate json web token for authentication and header
     * @author Dinesh
     * @return json
     * @createdOn 14-Jan-2018
     * @purpose this function is usfull to verify token
     */

userAuth : function(req, res, next) 
{
    var msg = validateReqHeader(req.headers);

    if(msg)
    {
        return res.json(failure(msg, Http.FORBIDDEN));
    }

    var token = req.headers.token;

    // check header or url parameters or post parameters for token
    if (!token)
    {
        return res.json(failure('Invalid Authentication Token', Http.FORBIDDEN));
    }

    // verifies secret and checks and  expiration
    jwt.verify(token, __config.secret_key, function(err, user) 
    {        
        if (err) 
        {
            return res.json(failure(err, Http.FORBIDDEN));
        }
        else 
        {
            users.findOne({ where: { id: user.id ,token : token }
            })
            .then(function(userData)
            {
                if(!userData)
                {
                    return res.json(failure("Invalid User!", Http.FORBIDDEN));
                }

                req.user = user;
                next();

            })
            .catch(function(err)
            {
                return res.json(failure(err, Http.FORBIDDEN));
            });
        }
    });
}

}  



