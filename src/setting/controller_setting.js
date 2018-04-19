/*
 +-----------------------------------------------------------+
 | Module Name: Setting & Rating Controller	                       	 |
 | Module Purpose: Rating related functions controller		 |
 | Author: Ajay Kumar Shukla                                     |
 +-----------------------------------------------------------+
*/

'use strict';

import {failure} from '../../helpers/helper.response';
import { success }  from '../../helpers/helper.response';
import Http from '../../helpers/helper.http';

import settingService from './service_setting';
import validateService from './validations';


module.exports = {	
	
	/*	
	*Purpose: create rating
	*Author: Ajay Kumar Shukla
	*/

	ratingByCustomer : function(req , res)
	{		
		var reqBody = req.body;
		var reqHeaders = req.headers;
		var errReason = validateService.validateCustomerRating(reqHeaders, reqBody);
	    if(errReason)
	    {
	    	return res.json(failure(errReason,Http.FORBIDDEN));
	    }
		var params = {
			user_id : reqBody.user_id,			
			order_id : reqBody.order_id,			
			laundry_id : reqBody.laundry_id
		};
		settingService.ratingByCustomer(params , function(err , result)
		{
			if(err)
	    	{
	    		return res.json(failure(err,Http.FORBIDDEN));
	    	}	    	
	    	return res.json( success( "rating successfully", Http.EVERYTHING_IS_OK , result ) );
		});		

	},
	
	/*	
	*Purpose: create rating question
	*Author: Ajay Kumar Shukla
	*/

	createRatingQuestion : function(req , res)
	{		
		var reqBody = req.body;
		var reqHeaders = req.headers;
		var errReason = validateService.validateQuestion(reqHeaders, reqBody);
	    if(errReason)
	    {
	    	return res.json(failure(errReason,Http.FORBIDDEN));
	    }
		var params = {
			question_en : reqBody.question_en,			
			question_ar : reqBody.question_ar
		};
		settingService.createRatingQuestion(params , function(err , result)
		{
			if(err)
	    	{
	    		return res.json(failure(err,Http.FORBIDDEN));
	    	}	    	
	    	return res.json( success( "question added successfully", Http.EVERYTHING_IS_OK , result ) );
		});		

	},
	
	/*	
	*Purpose: get rating question
	*Author: Ajay Kumar Shukla
	*/

	getRatingQuestion : function(req , res)
	{		
		var reqBody = req.body;
		var reqHeaders = req.headers;
		
		settingService.getRatingQuestion('',function(err , result)
		{
			if(err)
	    	{
	    		return res.json(failure(err,Http.FORBIDDEN));
	    	}	    	
	    	return res.json( success( "question list fetched", Http.EVERYTHING_IS_OK , result ) );
		});		

	},


	/*	
	*Purpose: active rating question
	*Author: Ajay Kumar Shukla
	*/

	activeRatingQuestion : function(req , res)
	{		
		
		var locals = req;
		var reqBody = locals.body;
		var reqHeaders = locals.headers;
	    var reqQuery = locals.query;	    
	    
	    var params = {
			question_id : reqBody.question_id,
			status : reqBody.status
		};
	    
	    if(!reqBody.question_id)
	    {
	    	return res.json(failure("Question id required..",Http.FORBIDDEN));
	    }

		settingService.activeRatingQuestion(params, function(err , result)
		{
			if(err)
	    	{
	    		return res.json(failure(err,Http.FORBIDDEN));
	    	}	    	
	    	return res.json( success( "status updated", Http.EVERYTHING_IS_OK , result ) );
		});		

	},
	
	/*	
	*Purpose: update rating question
	*Author: Ajay Kumar Shukla
	*/

	updateRatingQuestion : function(req , res)
	{		
		var reqBody = req.body;
		var reqHeaders = req.headers;

		var params = {
			question_id   : reqBody.question_id,
			question_en   : reqBody.question_en,
			question_ar   : reqBody.question_ar
		};
	    
	    if(!reqBody.question_id)
	    {
	    	return res.json(failure("Question id required..",Http.FORBIDDEN));
	    }
		
		settingService.updateRatingQuestion(params ,function(err , result)
		{
			if(err)
	    	{
	    		return res.json(failure(err,Http.FORBIDDEN));
	    	}	    	
	    	return res.json( success( "question updated", Http.EVERYTHING_IS_OK , result ) );
		});		

	},
	
	

}
