/*
 +-----------------------------------------------------------+
 | Module Name: Global api             |
 | Module Purpose: global api which can be accessed by other apps |
 | Author: Dinesh Kumar                                      |
 +-----------------------------------------------------------+
*/

'use strict';


import { failure } from '../../helpers/helper.response';
import { success }  from '../../helpers/helper.response';

import Http from '../../helpers/helper.http';

var gobalService = require('./service_global');

module.exports = {

	/*
	*name    : Initailize seed 
	*Purpose : it is to initialize the seed once to setup app
	*Created : 19 Apr 2018
	*/
	
	init : function (req, res)
	{
	    gobalService.init(req, function(err, response)
	    {
	        if (err)
	        {
	        	return res.json(failure(err, Http.FORBIDDEN));
	        }

	        return res.json( success( "success", Http.EVERYTHING_IS_OK , response ) );	        

	    });
	},

	/*
	*name    : insert seed into database 
	*Purpose : after initailization you should run this to insert seed data in database
	*Created : 19 Apr 2018
	*/

	doSeed : function(req, res)
	{
	    gobalService.doSeed(req,function(err, response) 
	    {
	        if (err)
	        {
	        	return res.json(failure(err, Http.FORBIDDEN));
	        }

	        return res.json( success( "success", Http.EVERYTHING_IS_OK , response ) );

	    });
	},

	/*
	*name    : Health check 
	*Purpose : you can use it to check the system is running or not
	*Created : 19 Apr 2018
	*/

	healthCheck : function(req, res)
	{
	    gobalService.healthCheck(req,function(err, response) 
	    {
	        if (err)
	        {
	        	return res.json(failure(err, Http.FORBIDDEN));
	        }

	        return res.json( success( "success", Http.EVERYTHING_IS_OK , response ) );

	    });
	}
		
};