/*
 +-----------------------------------------------------------+
 | Module Name: Laundry Controller	                       	 |
 | Module Purpose: Laundry related functions controller		 |
 | Author: Dinesh Kumar                                      |
 +-----------------------------------------------------------+
*/

'use strict';

import {failure} from '../../helpers/helper.response';
import { success }  from '../../helpers/helper.response';

import laundryService from './service_laundry';
import validateService from './validations';
import Http from '../../helpers/helper.http';


module.exports = {	

	/*	
	*Purpose: Create a laundry
	*Author: Dinesh Kumar
	*Date: 07-Apr-2018
	*/

	addEditLaundry : function(req , res)
	{
		var reqBody = req.body;
		var reqHeaders = req.headers;
		var errReason = validateService.validateCreateUpdateLaundry(reqHeaders, reqBody);

	    if(errReason)
	    {
	    	return res.json(failure(errReason,Http.FORBIDDEN));
	    }

		var params = {			
			country_id : reqHeaders.country_id,
			country_code : reqHeaders.country_code,
			laundry_name_en :  reqBody.laundry_name_en,
			laundry_id :  reqBody.laundry_id,//for edit laundry
			laundry_name_ar :  reqBody.laundry_name_ar,
			owner_name :  reqBody.owner_name,
			mobile :  reqBody.mobile,
			alt_mobile : (reqBody.alt_mobile)?reqBody.alt_mobile:0,
			email_id :  reqBody.email_id,
			area_id :  reqBody.area_id,
			laundry_logo :  reqBody.laundry_logo,
			contract_start_date :  reqBody.contract_start_date,
			contract_end_date :  reqBody.contract_end_date,
			address : reqBody.address,
			description :  (reqBody.description)?reqBody.description:''			
		};

		if(params.laundry_id)
		{
			laundryService.editLaundry(params , function(err , result)
			{
				if(err)
		    	{
		    		return res.json(failure(err,Http.FORBIDDEN));
		    	}

		    	return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
		    });

		}
		else
		{

			laundryService.createLaundry(params , function(err , result)
			{
				if(err)
		    	{
		    		return res.json(failure(err,Http.FORBIDDEN));
		    	}
		    	
		    	return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
			});

		}		

	},

	/*	
	*Purpose: get list of laundries not branch
	*Author: Dinesh Kumar
	*Date: 07-Apr-2018
	*/
	
	getLaundryList : function(req , res)
	{
		var reqBody = req.body;
		var reqHeaders = req.headers;
		var errReason = validateService.validategetLaundryList(reqHeaders);

	    if(errReason)
	    {
	    	return res.json(failure(errReason,Http.FORBIDDEN));
	    }

		var params = {			
			country_id : reqHeaders.country_id			
		};

		laundryService.getLaundryList(params , function(err , result)
		{
			if(err)
	    	{
	    		return res.json(failure(err,Http.FORBIDDEN));
	    	}	

	    	return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
		});
	},

	/*	
	*Purpose: Delete a laundry
	*Author: Dinesh Kumar
	*Date: 07-Apr-2018
	*/
	
	deleteLaundry : function(req , res)
	{
		var reqBody = req.body;
		var reqHeaders = req.headers;
		var errReason = validateService.validateDeleteLaundry(reqHeaders, reqBody);

	    if(errReason)
	    {
	    	return res.json(failure(errReason,Http.FORBIDDEN));
	    }

		var params = {

			country_id : reqHeaders.country_id,
			laundry_id : reqBody.laundry_id		
		};

		laundryService.deleteLaundry(params , function(err , result)
		{
			if(err)
	    	{
	    		return res.json(failure(err,Http.FORBIDDEN));
	    	}	    
	    		
	    	return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
		});

	},

	/*	
	*Purpose: Create a branch of laundry
	*Author: Dinesh Kumar
	*Date: 08-Apr-2018
	*/

	addEditLaundryBranchInfo : function(req , res)
	{
		var reqBody = req.body;
		var reqHeaders = req.headers;
		var errReason = validateService.validateLaundryBranch(reqHeaders, reqBody);

	    if(errReason)
	    {
	    	return res.json(failure(errReason,Http.FORBIDDEN));
	    }

		var params = {
			country_id 		: reqHeaders.country_id,
			country_code 	: reqHeaders.country_code,
			branch_id		: reqBody.branch_id,
			user_id			: reqBody.user_id,			
			laundry_id  	: reqBody.laundry_id,
			branch_name_en  	: reqBody.branch_name_en,
			branch_name_ar  	: reqBody.branch_name_ar,
			branch_manager_name  : reqBody.branch_manager_name,
			mobile  		: reqBody.mobile,
			email_id  		: reqBody.email_id,			
			governorate_id  : reqBody.governorate_id,
			area_id  		: reqBody.area_id,
			lat  			: reqBody.lat,
			long  			: reqBody.long,
			address  		: reqBody.address,
			created_by  	: reqBody.user_id,
			no_of_drivers 	: reqBody.no_of_drivers							
		};

		if(params.branch_id)
		{
			laundryService.editLaundryBranch(params , function(err , result)
			{
				if(err)
		    	{
		    		return res.json(failure(err,Http.FORBIDDEN));
		    	}	    	

		    	return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
			});
		}
		else
		{
			laundryService.createLaundryBranch(params , function(err , result)
			{
				if(err)
		    	{
		    		return res.json(failure(err,Http.FORBIDDEN));
		    	}	    	

		    	return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
			});

		}

	
	},
	

	/*	
	*Purpose: Delete a laundry
	*Author: Dinesh Kumar
	*Date: 07-Apr-2018
	*/
	
	deleteBranch : function(req , res)
	{
		var reqBody = req.body;
		var reqHeaders = req.headers;
		var errReason = validateService.validateDeletebranch(reqHeaders, reqBody);

	    if(errReason)
	    {
	    	return res.json(failure(errReason,Http.FORBIDDEN));
	    }

		var params = {
			country_id : reqHeaders.country_id,
			laundry_id : reqBody.laundry_id,
			branch_id  : reqBody.branch_id	
		};

		laundryService.deleteBranch(params , function(err , result)
		{
			if(err)
	    	{
	    		return res.json(failure(err,Http.FORBIDDEN));
	    	}	    
	    		
	    	return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
		});

	},


	/*	
	*Purpose: Delete a laundry
	*Author: Dinesh Kumar
	*Date: 08-Apr-2018
	*/

	getListOfBranches : function(req , res)
	{
		var reqBody = req.body;
		var reqHeaders = req.headers;
		var reqQuery = req.params;

		var errReason = validateService.validateDeleteLaundry(reqHeaders, reqQuery);
	    
	    if(errReason)
	    {
	    	return res.json(failure(errReason,Http.FORBIDDEN));
	    }

		var params = {
			
			country_id : reqHeaders.country_id,
			country_code : reqHeaders.country_code,
			laundry_id : reqQuery.laundry_id						
		};

		laundryService.getBranchList(params , function(err , result)
		{
			if(err)
	    	{
	    		return res.json(failure(err,Http.FORBIDDEN));
	    	}	    	
	    	return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
		});
	},

	branchSettings : function(req , res)
	{
		var reqBody = req.body;
		var reqHeaders = req.headers;
		

		var errReason = validateService.validateBranchSettings(reqHeaders, reqBody);
	    
	    if(errReason)
	    {
	    	return res.json(failure(errReason,Http.FORBIDDEN));
	    }

		var params = {
			
			country_id : reqHeaders.country_id,
			country_code : reqHeaders.country_code,
			laundry_id : reqBody.laundry_id,
			branch_id  : reqBody.branch_id,
			spcl_service_type : reqBody.spcl_service_type,
			jc_premium	: reqBody.jc_premium,			
			min_order_amount : reqBody.min_order_amount,
			fast_turn_around : reqBody.fast_turn_around,
			normal_turn_around : reqBody.normal_turn_around,
			premium_turn_around : reqBody.premium_turn_around

		};

		laundryService.branchSettings(params , function(err , result)
		{
			if(err)
	    	{
	    		return res.json(failure(err,Http.FORBIDDEN));
	    	}
	    	
	    	return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
		});

	}



}