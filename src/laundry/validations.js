/*
 +-----------------------------------------------------------+
 | Module Name: Laundry Validations Service	                 |
 | Module Purpose: Laundry Validations				         |
 | Author: Dinesh Kumar                                      |
 +-----------------------------------------------------------+
*/

'use strict';

module.exports = {

	/*	
	*Purpose: validate request before laundry create / update
	*Author: Dinesh Kumar
	*Called from : laundry_controller
	*Date : 07-04-2018
	*/

	validateCreateUpdateLaundry : function(reqHeaders, reqBody , flag)
	{
		var message = '';
		
		if(!reqHeaders.country_id)
		{
			message = 'Country ID is required!';
		}
		else if(!reqHeaders.country_code)
		{
			message = 'Country Code is required!';
		}		
		else if(!reqBody.owner_name)
		{
			message = 'Owner name is required!';
		}
		else if(!reqBody.laundry_name_en)
		{
			message = 'Laundry name in english is required!';
		}
		else if(!reqBody.laundry_name_ar)
		{
			message = 'Laundry name in arabic is required!';
		}			
		else if(!reqBody.mobile || reqBody.mobile.length>10)
		{
			message = 'Owner mobile number is required!';
		}			
		else if(!reqBody.email_id)
		{
			message = 'Owner Email ID is required!';
		}		
		else if(!reqBody.laundry_logo)
		{
			message = 'Laundry logo is required!';
		}
		else if(!reqBody.area_id)
		{
			message = 'Laundry area is required!';
		}
		else if(!reqBody.contract_start_date)
		{
			message = 'Contract start date is required!';
		}	
		else if(!reqBody.contract_end_date)
		{
			message = 'Contract end date is required!';
		}
		else if(!reqBody.address)
		{
			message = 'Laundry address is required!';
		}					

		return message;
	},

	/*	
	*Purpose: validate request before laundry list
	*Author: Dinesh Kumar
	*Called from : laundry_controller
	*Date : 07-04-2018
	*/

	validategetLaundryList : function(reqHeaders)
	{
		var message = '';		
		
		if(!reqHeaders.country_id)
		{
			message = 'Country ID is required';
		}

		return message;
	},

	/*	
	*Purpose: validate request before delete laundry
	*Author: Dinesh Kumar
	*Called from : laundry_controller
	*Date : 06-02-2018
	*/

	validateDeleteLaundry : function(reqHeaders, reqBody)
	{
		var message = '';
		
		if(!reqHeaders.country_id)
		{
			message = 'Country ID is required';
		}
		else if(!reqBody.laundry_id)
		{
			message = 'Laundry ID is required!';
		}
		
		return message;
	},

	validateLaundryBranch : function(reqHeaders , reqBody)
	{
		var message = '';
		
		if(!reqHeaders.country_id)
		{
			message = 'Country ID is required!';
		}
		else if(!reqHeaders.country_code)
		{
			message = 'Country Code is required!';
		}		
		else if(!reqBody.branch_name_en)
		{
			message = 'Branch name in english is required!';
		}
		else if(!reqBody.branch_name_ar)
		{
			message = 'Branch name in arabic is required!';
		}
		else if(!reqBody.area_id)
		{
			message = 'Area ID is required!';
		}			
		else if(!reqBody.branch_manager_name)
		{
			message = 'Branch Manager Name is required!';
		}
		else if(!reqBody.mobile || reqBody.mobile.length>10)
		{
			message = 'Owner mobile number is required!';
		}			
		else if(!reqBody.email_id)
		{
			message = 'Owner Email ID is required!';
		}		
		else if(!reqBody.user_id)
		{
			message = 'User ID is required!';
		}
		else if(!reqBody.governorate_id)
		{
			message = 'Governorate ID is required!';
		}		
		else if(!reqBody.lat)
		{
			message = 'Lattitude is required!';
		}
		else if(!reqBody.long)
		{
			message = 'Longitude is required!';
		}
		else if(!reqBody.address)
		{
			message = 'Address is required!';
		}

		
		return message;

	},

	/*	
	*Purpose: validate request before delete laundry branch
	*Author: Dinesh Kumar
	*Called from : laundry_controller
	*Date : 08-04-2018
	*/

	validateDeletebranch : function(reqHeaders, reqBody)
	{
		var message = '';		
		
		if(!reqHeaders.country_id)
		{
			message = 'Country ID is required';
		}
		else if(!reqBody.laundry_id)
		{
			message = 'Laundry ID is required!';
		}
		else if(!reqBody.branch_id)
		{
			message = 'Branch ID is required!';
		}
		return message;
	},

	/*	
	*Purpose: validate request before branch settings
	*Author: Dinesh Kumar
	*Called from : laundry_controller
	*Date : 10-04-2018
	*/

	validateBranchSettings : function(reqHeaders , reqBody)
	{
		var message = '';		
		
		if(!reqHeaders.country_id)
		{
			message = 'Country ID is required';
		}
		else if(!reqBody.laundry_id)
		{
			message = 'Laundry ID is required!';
		}
		else if(!reqBody.branch_id)
		{
			message = 'Branch ID is required!';
		}
		else if(!reqBody.spcl_service_type)
		{
			message = 'Special service type is required!';
		}
		else if(!reqBody.fast_turn_around)
		{
			message = 'Fast turn around is required!';
		}
		else if(!reqBody.normal_turn_around)
		{
			message = 'Normal turn arround is required!';
		}
		else if(!reqBody.premium_turn_around)
		{
			message = 'Premium turn around is required!';
		}

		return message;

	}


}

