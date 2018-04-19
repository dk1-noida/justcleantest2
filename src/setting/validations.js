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
	*Purpose: validate request before category creation
	*Author: Dinesh Kumar
	*/

	validateQuestion : function(reqHeaders, reqBody)
	{
		var message = '';
		
		if(!reqBody.question_en  || !reqBody.question_ar)
		{
			message = 'Name is required!';
		}
		return message;
	}

}
