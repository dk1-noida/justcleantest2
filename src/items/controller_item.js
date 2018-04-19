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
import itemService from './service_item';
import validateService from './validations';
import Http from '../../helpers/helper.http';

module.exports = {	
	
	/*	
	*Purpose: create categories like tops, bottoms, heritage etc
	*Author: Dinesh Kumar
	*/

	createCategory : function(req , res)
	{		
		var reqBody = req.body;
		var reqHeaders = req.headers;
		var errReason = validateService.validateCategory(reqHeaders, reqBody);

	    if(errReason)
	    {
	    	return res.json(failure(errReason,Http.FORBIDDEN));
	    }

		var params = {			
			group_id : reqHeaders.group_id,
			country_id : reqHeaders.country_id,
			cat_name_en : reqBody.cat_name_en,
			cat_name_ar : reqBody.cat_name_ar,
			cat_image : reqBody.cat_image,
			sort_order : reqBody.sort_order,
			cat_createdby : reqHeaders.user_id
		};

		itemService.createCategory(params , function(err , result)
		{
			if(err)
	    	{
	    		return res.json(failure(err,Http.FORBIDDEN));
	    	}	    	
	    	return res.json( success( "Category created successfully", Http.EVERYTHING_IS_OK , result ) );
		});		

	},

	/*	
	*Purpose: get list of categories
	*Author: Dinesh Kumar
	*/

	getCategory : function(req , res)
	{		
		var reqBody = req.body;
		var reqHeaders = req.headers;
		var errReason = validateService.validateGetCategory(reqHeaders, reqBody);
	    
	    if(errReason)
	    {
	    	return res.json(failure(errReason,Http.FORBIDDEN));
	    }

		var params = {
			country_id : reqHeaders.country_id
		};

		itemService.getCategory(params , function(err , result)
		{
			if(err)
	    	{
	    		return res.json(failure(err,Http.FORBIDDEN));
	    	}	    	

	    	return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
		});
	},

	/*	
	*Purpose: update category
	*Author: Dinesh Kumar
	*/

	updateCategory : function(req , res)
	{		
		var reqBody = req.body;
		var reqHeaders = req.headers;
		var errReason = validateService.validateUpdateCategory(reqHeaders, reqBody);
	    
	    if(errReason)
	    {
	    	return res.json(failure(errReason,Http.FORBIDDEN));
	    }

		var params = {
			id       : reqBody.id,
			cat_name_en : reqBody.cat_name_en,
			cat_name_ar : reqBody.cat_name_ar,
			cat_image : reqBody.cat_image,
			sort_order : reqBody.sort_order			
		};

		itemService.updateCategory(params , function(err , result)
		{
			if(err)
	    	{
	    		return res.json(failure(err,Http.FORBIDDEN));
	    	}

	    	return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
		});
	},

	/*	
	*Purpose: delete category
	*Author: Dinesh Kumar
	*/

	deleetCategory : function(req , res)
	{		
		var reqBody = req.body;
		var reqHeaders = req.headers;
		var errReason = validateService.validateDeleteCategory(reqHeaders, reqBody);
	    
	    if(errReason)
	    {
	    	return res.json(failure(errReason,Http.FORBIDDEN));
	    }

		var params = {			
			id : reqBody.id
		};
		
		itemService.deleetCategory(params , function(err , result)
		{
			if(err)
	    	{
	    		return res.json(failure(err,Http.FORBIDDEN));
	    	}	    	
	    	return res.json( success( "Category Removed Successfully.", Http.EVERYTHING_IS_OK , result ) );
		});
	},

	/*	
	*Purpose: Create items, it is seperate entity and have M to M relationship with categories through item_group_ref table
	*Author: Dinesh Kumar
	*/

	createItem : function(req , res)
	{		
		var reqBody = req.body;
		var reqHeaders = req.headers;
		var errReason = validateService.validateCreateItem(reqHeaders, reqBody);
	    if(errReason)
	    {
	    	return res.json(failure(errReason,Http.FORBIDDEN));
	    }
	    
		var params = {
			language_id : reqHeaders.language_id,
			cat_array : reqBody.cat_array,
			group_id : reqHeaders.group_id,
			item_name : reqBody.item_name,
			item_logo : (reqBody.item_logo)?reqBody.item_logo:'',
			item_description : (reqBody.item_description)?reqBody.item_description:'',
			user_id : reqBody.user_id,
			itemArray : reqBody.item_array
		};

		itemService.createItem(params , function(err , result)
		{
			if(err)
	    	{
	    		return res.json(failure(err,Http.FORBIDDEN));
	    	}	    	
	    	return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
		});
	},

	/*	
	*Purpose: get list of items grouped with categories
	*Author: Dinesh Kumar
	*/

	getItemList : function(req , res)
	{		
		var reqBody = req.body;
		var reqHeaders = req.headers;
		var errReason = validateService.validateGetItem(reqHeaders, reqBody);
	    if(errReason)
	    {
	    	return res.json(failure(errReason,Http.FORBIDDEN));
	    }
		var params = {
			language_id : reqHeaders.language_id,
			cat_id : reqBody.cat_id
		};
		itemService.getItemList(params , function(err , result)
		{
			if(err)
	    	{
	    		return res.json(failure(err,Http.FORBIDDEN));
	    	}	    	
	    	return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
		});
	},
	
	/*	
	*Purpose: edit an items
	*Author: Dinesh Kumar
	*/

	editItem : function(req , res)
	{		
		var reqBody = req.body;
		var reqHeaders = req.headers;
		var errReason = validateService.validateEditItem(reqHeaders, reqBody);
	    if(errReason)
	    {
	    	return res.json(failure(errReason,Http.FORBIDDEN));
	    }
		var params = {
			language_id : reqHeaders.language_id,
			cat_array : reqBody.cat_array,
			group_id : reqHeaders.group_id,
			item_name : reqBody.item_name,
			item_logo : (reqBody.item_logo)?reqBody.item_logo:'',
			item_description : (reqBody.item_description)?reqBody.item_description:'',
			user_id : reqBody.user_id,
			item_id : reqBody.item_id,
			itemArray : reqBody.item_array
		};
		itemService.editItem(params , function(err , result)
		{
			if(err)
	    	{
	    		return res.json(failure(err,Http.FORBIDDEN));
	    	}	    	
	    	return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
		});
	},

	/*	
	*Purpose: delete an item
	*Author: Dinesh Kumar
	*/

	deleteItem : function(req , res)
	{		
		var reqBody = req.body;
		var reqHeaders = req.headers;
		var errReason = validateService.validateDeleteItem(reqHeaders, reqBody);
	    if(errReason)
	    {
	    	return res.json(failure(errReason,Http.FORBIDDEN));
	    }
		var params = {
			language_id : reqHeaders.language_id,
			item_id : reqBody.item_id
		};
		itemService.deleteItem(params , function(err , result)
		{
			if(err)
	    	{
	    		return res.json(failure(err,Http.FORBIDDEN));
	    	}	    	
	    	return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
		});
	},

	/*	
	*Purpose: Add Laundry Item
	*Author: Ajay Kumar Shukla
	*/

	addLaundryItem : function(req , res)
	{		
		var reqBody = req.body;
		var errReason = validateService.validateAddLaundaryItem(reqBody);
	    if(errReason)
	    {
	    	return res.json(failure(errReason,Http.FORBIDDEN));
	    }
		var params = {
			laundry_id : reqBody.laundry_id,
			item_id : reqBody.item_id,
			price_array : reqBody.price_array,
			fast_price_array : reqBody.fast_price_array,
			service_array : reqBody.service_array,

		};
		itemService.addLaundryItem(params , function(err , result)
		{
			if(err)
	    	{
	    		return res.json(failure(err,Http.FORBIDDEN));
	    	}	    	
	    	return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
		});
	},

	/*	
	*Purpose: GET Laundry Item
	*Author: Ajay Kumar Shukla
	*/

	getLaundryItem : function(req , res)
	{	
		var reqQuery = req.query;	
		var reqBody = req.body;
		var params = {
			laundry_id : reqQuery.laundry_id
		};
		itemService.getLaundryItem(params , function(err , result)
		{
			if(err)
	    	{
	    		return res.json(failure(err,Http.FORBIDDEN));
	    	}	    	
	    	return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
		});
	},

	/*	
	*Purpose: delete Laundry Item
	*Author: Ajay Kumar Shukla
	*/

	deleteLaundryItem : function(req , res)
	{		
		var reqBody = req.body;
		var params = {
			laundry_id : reqBody.laundry_id,
			item_id : reqBody.item_id
		};
		itemService.deleteLaundryItem(params , function(err , result)
		{
			if(err)
	    	{
	    		return res.json(failure(err,Http.FORBIDDEN));
	    	}	    	
	    	return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
		});
	},

	/*	
	*Purpose: update Laundry Item
	*Author: Ajay Kumar Shukla
	*/

	changeLaundryItemStatus : function(req , res)
	{		
		var reqBody = req.body;
		var params = {
			laundry_id : reqBody.laundry_id,
			item_id : reqBody.item_id,
			service_id : reqBody.service_id,
			status : reqBody.status
		};
		itemService.changeLaundryItemStatus(params , function(err , result)
		{
			if(err)
	    	{
	    		return res.json(failure(err,Http.FORBIDDEN));
	    	}	    	
	    	return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
		});
	}
	

}