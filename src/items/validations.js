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

	validateCategory : function(reqHeaders, reqBody)
	{
		var message = '';

		if(!reqHeaders.group_id)
		{
			message = 'Group ID is required!';
		}
		else if(!reqHeaders.country_id)
		{
			message = 'Country ID is required!';
		}
		else if(!reqHeaders.cat_name_en)
		{
			message = 'Category name in english is required!';
		}
		else if(!reqHeaders.cat_name_ar)
		{
			message = 'Category name in arabic is required!';
		}
		else if(!reqHeaders.cat_image)
		{
			message = 'Category image is required!';
		}
		else if(!reqHeaders.sort_order)
		{
			message = 'Category sort order is required!';
		}
		else if(!reqHeaders.user_id)
		{
			message = 'User ID is required!';
		}
					
		return message;

	},

	/*	
	*Purpose: validate request before get list of categories
	*Author: Dinesh Kumar
	*/
	validateGetCategory : function(reqHeaders, reqBody)
	{
		var message = '';
		
		if(!reqHeaders.country_id)
		{
			message = 'Country ID is required!';
		}

		return message;
	},
	/*	
	*Purpose: validate request before update a category
	*Author: Dinesh Kumar
	*/
	validateUpdateCategory : function(reqHeaders, reqBody)
	{
		var message = '';

		if(!reqHeaders.cat_name_en)
		{
			message = 'Category name in english is required!';
		}
		else if(!reqHeaders.cat_name_ar)
		{
			message = 'Category name in arabic is required!';
		}
		else if(!reqHeaders.cat_image)
		{
			message = 'Category image is required!';
		}
		else if(!reqHeaders.sort_order)
		{
			message = 'Category sort order is required!';
		}		
					
		return message;
	},
	/*	
	*Purpose: validate request before delete a category
	*Author: Dinesh Kumar
	*/
	validateDeleteCategory : function(reqHeaders, reqBody)
	{
		var message = '';
		
		if(!reqBody.id)
		{
			message = 'Category ID is required!';
		}
		return message;
	},
	/*	
	*Purpose: validate request before create an item
	*Author: Dinesh Kumar
	*/

	validateCreateItem : function(reqHeaders, reqBody)
	{
		var message = '';
		
		if(!reqHeaders.language_id)
		{
			message = 'Language ID is required!';
		}
		else if(!reqBody.cat_array || !reqBody.cat_array.length)
		{
			message = 'Category is required!';
		}
		else if(!reqHeaders.group_id)
		{
			message = 'Group is required!';
		}
		else if(!reqBody.item_array || !reqBody.item_array.length)
		{
			message = 'Category is required!';
		}
		else if(!reqBody.user_id)
		{
			message = 'User ID is required!';
		}		
		return message;
	},

	/*	
	*Purpose: validate request before get list of items
	*Author: Dinesh Kumar
	*/

	validateGetItem : function(reqHeaders, reqBody)
	{
		var message = '';
		
		if(!reqHeaders.language_id)
		{
			message = 'Language ID is required!';
		}	
		return message;
	},

	/*	
	*Purpose: validate request before edit an item
	*Author: Dinesh Kumar
	*/

	validateEditItem : function(reqHeaders, reqBody)
	{
		var message = '';
		var __this = this;
		
		if(!reqHeaders.language_id)
		{
			message = 'Language ID is required!';
		}
		else if(!reqBody.cat_array || !__this.valdSelectedCat(reqBody.cat_array))
		{
			message = 'Category is required!';
		}
		else if(!reqHeaders.group_id)
		{
			message = 'Group is required!';
		}
		else if(!reqBody.item_array || !reqBody.item_array.length)
		{
			message = 'Item is required!';
		}
		else if(!reqBody.user_id)
		{
			message = 'User ID is required!';
		}
		else if(!reqBody.item_id)
		{
			message = 'Item ID is required!';
		}		
		return message;
	},

	/*	
	*Purpose: validate request before delete an item
	*Author: Dinesh Kumar
	*/

	validateDeleteItem : function(reqHeaders, reqBody)
	{
		var message = '';
		
		if(!reqHeaders.language_id)
		{
			message = 'Language ID is required!';
		}
		else if(!reqBody.item_id)
		{
			message = 'Item ID is required!';
		}	
		return message;
	},

	/*	
	*Purpose: validate selected categories while item updation
	*Author: Dinesh Kumar
	*Called from : same file in validateEditItem function
	*/

	valdSelectedCat : function(cat_array)
	{
		var flag = false;
		for(var i in cat_array)
		{
			if(cat_array[i].is_deleted == 0)
			{
				flag = true;
				break;
			}
		}
		return flag;
	},	 

	/*	
	*Purpose: validate request before add an item to laundry
	*Author: Ajay Kumar Shukla
	*/

	validateAddLaundaryItem : function(reqBody)
	{
		var message = '';
		if(!reqBody.item_id)
		{
			message = 'Item ID is required!';
		}	
		return message;
	},

}