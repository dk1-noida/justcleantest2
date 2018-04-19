/*
 +-----------------------------------------------------------+
 | Module Name: Laundry Service	                         	 |
 | Module Purpose: Laundry related functions				 |
 | Author: Dinesh Kumar                                      |
 +-----------------------------------------------------------+
*/

'use strict';

import async from 'async';

import db from '../../schema/';

const category_master = db.category_master;
const item_cat_rel = db.item_cat_rel;
const item_master = db.item_master;
const LaundryBranch = db.laundry_branch;

module.exports = {	

	/*	
	*Purpose: create categories like tops,bottoms,heritage etc
	*Author: Dinesh Kumar
	*/

	createCategory : function(params , next)
	{
		category_master.sync()
		.then(function()
		{
			return category_master.findOne({where:{"$or": [{cat_name_en: params.cat_name_en},{cat_name_ar: params.cat_name_ar}]}});
		})
		.then(function(result)
		{
			if(result)
			{
				throw new Error('Category already exists!');
			}

			return category_master.create({
				group_id : reqHeaders.group_id,
				country_id : reqHeaders.country_id,
				cat_name_en : reqBody.cat_name_en,
				cat_name_ar : reqBody.cat_name_ar,
				cat_image : reqBody.cat_image,
				sort_order : reqBody.sort_order,
				cat_createdby : reqHeaders.user_id
			});
		})		
		.then(function(result)
		{
			next(null , {message : "Category Created Successfully." , data : result});
		})		
		.catch(function(err)
		{
			next(err+"Error:10014" , null);
		});
		
	},

	/*	
	*Purpose: get list of categories
	*Author: Dinesh Kumar
	*/

	getCategory : function(params , next)
	{
		category_master.findAll({where:{is_deleted:0, country_id:params.country_id},
			attributes:['id', 'cat_name_ar', 'cat_name_en', 'cat_image' , 'group_id', 'sort_order'],
			order: '"sort_order" ASC'})
		.then(function(result)
		{
			next(null , result);
		})
		.catch(function(err)
		{
			next(err+"Error:10015" , null);
		});
	},

	/*	
	*Purpose: update category
	*Author: Dinesh Kumar
	*/

	updateCategory : function(params , next)
	{

		category_master.sync()
		.then(function()
		{
			return category_master.findOne({where:{"$or": [{cat_name_en: params.cat_name_en},{cat_name_ar: params.cat_name_ar}],$ne:{id:params.id}}});
		})
		.then(results=>{
			if(results)
			{
				throw new Error("Category Name Already Exists.");
			}
			return category_master.findOne({where:{id:params.id}});
		})
		.then(function(result)
		{
			if(!result)
			{
				throw new Error("Category Doesn't Exists.");
			}
			return category_master.update({where:{id:params.id}},{
				group_id : reqHeaders.group_id,
				country_id : reqHeaders.country_id,
				cat_name_en : reqBody.cat_name_en,
				cat_name_ar : reqBody.cat_name_ar,
				cat_image : reqBody.cat_image,
				sort_order : reqBody.sort_order,
				cat_createdby : reqHeaders.user_id
			});
			
		})
		.catch(function(err)
		{
			next(err+"Error:10014" , null);
		});
	},

	/*	
	*Purpose: delete category
	*Author: Dinesh Kumar
	*/

	deleetCategory : function(params , next)
	{
		category_master.sync()
		.then(function()
		{
			return category_master.findOne({where:{id:params.id,is_deleted:0}});
		})
		.then(function(result)
		{
			if(!result)
			{
				throw new Error("Category Doesn't Exists.");
			}
			return category_master.update({is_deleted:1},{where:{id:params.id}});		
		})
		.then(function(result)
		{
			next(null , "Category Removed Successfully");
		})
		.catch(function(err)
		{
			next(err+"Error:10015" , null);
		});
		
	},

	/*	
	*Purpose: Create items, it is seperate entity and have M to M relationship with categories through item_group_ref table
	*Author: Dinesh Kumar
	*/

	createItem : function(params , calback)
	{
		var __this = this;
		var catArray = [];
		var catNames = [];
		for(var i in params.cat_array)
		{
			catArray.push(params.cat_array[i].cat_id);			
		}
		for(var k in params.itemArray)
		{
			catNames.push(params.itemArray[k].item_name);
		}

		category_master.sync()
		.then(function()
		{
			return category_master.findAll({where:{parent_id:catArray,is_deleted:0}});
		})
		.then(function(result)
		{
			if(!result.length)
			{
				throw new Error("Category Doesn't Match!");
			}
			else if(__this.validateCategories(result, params.cat_array))
			{
				throw new Error("Please provide proper categories!");
			}

		 	return item_master.findOne({where:{item_name:{$in:catNames},is_deleted:0}});

		}).then(function(itemResult)
		{
			if(itemResult)
			{
				throw new Error("Item Already Exists.");
			}

			var item = params.itemArray[0];

			return item_master.create({item_name:item.item_name,item_logo:item.item_logo,group_id:params.group_id,
				item_description:item.item_description,item_status:'Active',parent_id:0,language_id:item.language_id,is_deleted:0,item_createdby:params.user_id});

		})
		.then(result=>{

			result.parent_id = result.id;
			result.save();
			return result;
		})
		.then(itemResult=>{
			
		 	__this.insertinItemGroupRel(params.cat_array , itemResult.id , 
		 		function(err , catResult)
		 		{
		 			if(err)
		 			{
		 				return calback(err+"Error:10014" , null);
		 			}

		 			__this.insertToItemMaster(params.itemArray, params.cat_array, itemResult.id, 1, params.group_id, params.user_id,
		 			 function(err , result)
		 			 {
		 			 	if(err)
			 			{
			 				return calback(err+"Error:10015" , null);
			 			}
		 			
		 				return calback(null , "Item Created Successfully.");

		 			});		 			
		 		});
			
		})	
		.catch(function(err)
		{
			return calback(err+"Error:10016" , null);
		});
		
	},

	validateCategories : function(results , catArray)
	{
		var validateFlag = false;

		for(var i in catArray)
		{
			var item = catArray[i];
			var flag = true;

			for(var k in results)
			{
				if(results[k].parent_id == item.cat_id)
				{
					flag = false;	
					break;
				}
			}
			if(flag)
			{
				validateFlag = true;				
				break;
			}
		}		
		return validateFlag;
	},



	/*	
	*Purpose: get list of items grouped with categories
	*Author: Dinesh Kumar
	*/

	insertinItemGroupRel : function(catArray ,item_id, next)
	{
		if(!catArray.length)
		{
			return next("Provide categories." , null);
		}

		(function iterator(i)
		{
			var listCat = catArray[i];

			item_group_rel.create({
					cat_id : listCat.cat_id,
					item_id : item_id,
					is_deleted : 0
				})
			.then(result=>{
				i++;

				if(i>=catArray.length)
				{
					return next(null , result);	
				}

				iterator(i);

			})
			.catch(err=>{
				return next(err , null);
			});

		})(0);
		
	},

	/*	
	*Purpose: Update item and category relationship while item update
	*Author: Dinesh Kumar
	*/

	updateItemGroupRel : function(catArray ,item_id, next)
	{
		if(!catArray.length)
		{
			return next("Provide categories." , null);
		}

		(function iterator(i)
		{
			var listCat = catArray[i];
			item_group_rel.sync()
			.then(function()
			{
				return	item_group_rel.findOne({where:{
					cat_id : listCat.cat_id,
					item_id : item_id,
					is_deleted : 0
				}});
			})
			.then(result=>{
				if(result)
				{
					return item_group_rel.update({is_deleted:listCat.is_deleted},{where:{cat_id : listCat.cat_id,item_id : item_id}});
				}
				else
				{
					return item_group_rel.create({cat_id : listCat.cat_id, item_id : item_id, is_deleted: 0 });
				}
			})
			.then(result=>{
				i++;

				if(i>=catArray.length)
				{
					return next(null , result);	
				}

				iterator(i);
			})
			.catch(function(err)
			{
				return next(err , null);
			});			

		})(0);

	},

	/*	
	*Purpose: Insert dynamic multi language Item
	*Author: Dinesh Kumar
	*/

	insertToItemMaster : function(itemArray, catArray, parent_id, i, group_id, user_id, next)
	{
		var __this = this;
		(function iterator(k)
		{
			var listItem = itemArray[k];

			item_master.sync().then(function()
			{
				return item_master.create({
						item_name : listItem.item_name,
						item_logo : listItem.item_logo,						
						item_description : listItem.item_description,
						item_status : 'Active',
						language_id : listItem.language_id,
						group_id : group_id,
						is_deleted : 0,
						parent_id : parent_id,
						item_createdby : user_id
					});
			})
			.then(result=>{

				__this.insertinItemGroupRel(catArray , result.id , 
			 		function(err , catResult)
			 		{
			 			if(err)
			 			{
			 				next(err , null);
			 			}

			 			k++;

						if(k>=itemArray.length)
						{
							return next(null, catResult)
						}

						iterator(k);

			 		});
				
			})
			.catch(err=>{
				return next(err , null);
			});

		})(i);
	},

	/*	
	*Purpose: get list of items grouped with categories
	*Author: Dinesh Kumar
	*/

	getItemList : function(params , next)
	{
		category_master.findAll({
			attributes:['id','parent_id','name','description','is_deleted'],
			where: {is_deleted: 0},
			include: [{
				model: item_master,
				through: {
					attributes: ['id'],
					where: {is_deleted: 0}
				},
				attributes: ['id','parent_id','item_name','item_logo','item_description','is_deleted'],
				where: {is_deleted: 0}
			}]
		}).then(result=>{
			next(null , result);
		})
		.catch(err=>{
			next(err+"Error:10017" , null);
		});
	
	},

	/*	
	*Purpose: edit an items
	*Author: Dinesh Kumar
	*/

	editItem : function(params , calback)
	{
		var __this = this;
		var catArray = [];
		var catNames = [];

		for(var i in params.cat_array)
		{
			catArray.push(params.cat_array[i].cat_id);
		}

		for(var k in params.itemArray)
		{
			catNames.push(params.itemArray[k].item_name);
		}

		category_master.sync()
		.then(function()
		{
			return category_master.findAll({where:{parent_id:catArray,is_deleted:0}});
		})
		.then(function(result)
		{
			if(!result)
			{
				throw new Error("Category Doesn't Match!");
			}
			else if(__this.validateCategories(result, params.cat_array))
			{
				throw new Error("Please provide proper categories!");
			}		

			return item_master.findAll({where:{parent_id:params.item_id,is_deleted:0}});		

		}).then(function(result){
			if(!result.length)
			{
				throw new Error("Item Doesn't Exists.");
			}			

			return item_master.findOne({where:{item_name:{$in:catNames},is_deleted:0,parent_id:{$ne:params.item_id}}});
		})
		.then(result=>{
			if(result)
			{
				throw new Error("Item name already exists.");
			}

			async.each(params.itemArray, 
				function(listItem, next) 
				{					
					item_master.sync().then(function(){
						return item_master.findOne({where:{parent_id:params.item_id,is_deleted:0,language_id:listItem.language_id}});
					})
					.then(result=>{
						if(result)
						{
							return item_master.update({
								item_name:listItem.item_name,
								item_logo:listItem.item_logo,						
								item_description:listItem.item_description,								
								item_createdby:params.user_id
							},{
								where:{parent_id:params.item_id , is_deleted:0, language_id:listItem.language_id}
							});
						}
						else
						{
							return item_master.create({
								item_name:listItem.item_name,
								item_logo:listItem.item_logo,						
								item_description:listItem.item_description,
								item_status:'Active',
								language_id:listItem.language_id,
								is_deleted:0,
								group_id:params.group_id,
								parent_id:params.item_id,
								item_createdby:params.user_id
							});
						}
					}).then(result=>{
						if(result.id)
						{
							__this.insertinItemGroupRel(params.cat_array , result.id , function(err , result)
							{								
								next(err);
							});
						}
						else
						{
							__this.updateItemGroupRel(params.cat_array , params.item_id , function(err , result)
							{								
								next(err);
							});
						}						
					}).catch(err=>{
						next(err);
					});				
				},
				function(err)
				{
					if(err)
					{
						throw new Error(err+"Error:100212");
					}

					async.each(params.cat_array ,
					 function(catItems , next)
					 {

					 	item_group_rel.sync()
					 	.then(function()
					 	{
					 		return item_group_rel.findOne({where:{cat_id:catItems.cat_id,item_id:params.item_id}});
					 	})						
						.then(function(result){					
							if(result)
							{											
								return item_group_rel.update({is_deleted:catItems.is_deleted},{where:{cat_id:catItems.cat_id,item_id:params.item_id}});								
							}
							else
							{
								return item_group_rel.create({cat_id:catId,item_id:params.item_id,is_deleted:0});								
							}
						})
						.then(result=>{
							next();
						})
						.catch(err=>{
							next(err+"Error:10213");
						});
					 },

					 function(err)
					 {
					 	if(err)
						{
							throw new Error(err+"Error:100212");
						}
						return calback(null , "Item Updated Successfully.");
					});

				});
			
			
		})	
		.catch(function(err)
		{
			calback(err+"Error:10015" , null);
		});		
	},

	/*	
	*Purpose: delete an item
	*Author: Dinesh Kumar
	*/
	
	deleteItem : function(params , next)
	{		
		item_master.sync().then(function(){
			return item_master.findOne({where:{parent_id:params.item_id,is_deleted:0}})
		}).then(function(result){
			if(!result)
			{
				throw new Error("Item Doesn't Exists.");
			}
			return item_master.update({is_deleted:1},{where:{parent_id:params.item_id,is_deleted:0}});
		}).then(function(result){
			next(null , "Item Deleted Successfully");
		})
		.catch(err=>{
			next(err+"Error:10020" , null);
		});		
	},	

	/*	
	*Purpose: Create items for laundary,
	*Author: Ajay Kumar Shukla
	*Params: {
		"laundry_id" : "1",
		"item_id" : "1",
		"service_array"    : [ "1", "2", "3"],
		"price_array"      : [ "1941.00", "122.00", "1313.00"],
		"fast_price_array" : [ "2419.00", "222.00", "323.00"]
	}
	*/

	addLaundryItem : function(params, next)
	{

		if(!params.laundry_id){
			throw new Error("Select laundry id");
		}
		if(!params.item_id){
			throw new Error("Select item id");
		}

		LaundryItem.findOne({

			where:{laundry_id:params.laundry_id,item_id:params.item_id }

		}).then(result=>{
			if(result)
			{
			    LaundryItem.findOne({
					where:{ laundry_id:params.laundry_id,item_id:params.item_id}
				}).then(info=>{
					if(info)
					{	

						laundry_item_service.findAll({
							where:{ laundry_item_id:info.id}
						}).then(services=>{
							if(services.length > 0)
							{

								(function iterator(i){

									var sid = services[i].service_id;
										
									if(sid == params.service_array[i])
									{
										services.price = params.price_array[i];
										services.fast_price = params.fast_price_array[i];
										
										laundry_item_service.update(

											{price : params.price_array[i],fast_price : params.fast_price_array[i]},
											{where:{id:services[i].id}

										}).then(newResult=>{

											i++;
											if(i>=services.length)
											{
												return next(null , "Laundry Item services updated successfully.");	
											}
											iterator(i);										
										});										
									}
								})(0);
								
							}		

						});

					}
				}).catch(function(err)
				{
					next(err+"Error:A013" , null);
				});
				
			}
			else
			{
				var serviceArray = [];
				
					LaundryItem.create({
						laundry_id : params.laundry_id,
						item_id    : params.item_id,
					}).then(service=>{
						
						if(service){
							for(var i in params.service_array)
							{
								laundry_item_service.create({
									laundry_item_id : service.id,
									service_id : params.service_array[i],
									price      : params.price_array[i],
									fast_price : params.fast_price_array[i]
								})
							}
						}
					});
				
				return next(null , "Laundry Item configured successfully.");
			}
		})
		.catch(function(err)
		{
			next(err+"Error:A002" , null);
		});
		
	},

	/*	
	*Purpose: get items for laundary,
	*Author: Ajay Kumar Shukla
	*Params: {
		"laundry_id" : "1"
	}
	*/
	
	getLaundryItem : function(params , next)
	{
		if(!params.laundry_id)
		{
			throw new Error("Select laundry id");
		}	


		var resObj = {};


		LaundryBranch.findAll({			
			where: {id:params.laundry_id , is_deleted: 0},
			attributes:["laundry_code","laundry_name","laundry_description","laundry_address",
			"laundry_status","laundry_min_order_amount","is_main"],
			include: [{
				model: item_master,				
				through: {
					where: {is_deleted: 0},
					attributes:["id","item_id"],

				},				
				where: {is_deleted: 0},
				attributes:["item_name","item_logo","item_description","item_status"],

			}]
		}).then(result=>{
			resObj.laundry_items = result;
			LaundryItem.findAll({
				where:{laundry_id:params.laundry_id,is_deleted:0},
				attributes:["id","item_id"],			
				include:[{
					model : laundry_item_service,
					where:{is_deleted:0},
					attributes:["id","laundry_item_id","service_id","price","fast_price"],
				}]
			}).then(results=>{
				resObj.item_price = results;
				next(null , resObj);
			})
			
		})
		.catch(err=>{
			next(err+"Error:10017" , null);
		});
	
	},

	/*	
	*Purpose: delete items of laundary,
	*Author: Ajay Kumar Shukla
	*Params: {
		"laundry_id" : "1"
		"item_id" : "1"
	}
	*/
	
	deleteLaundryItem : function(params , next)
	{
		if(!params.laundry_id){
			throw new Error("Select laundry id");
		}
		if(!params.item_id){
			throw new Error("Select item id");
		}


		LaundryItem.sync().then(function(){

			return LaundryItem.findOne({where:{laundry_id:params.laundry_id, item_id:params.item_id}})

		}).then(function(result){
			
			if(!result)
			{
				throw new Error("Item Doesn't Exists.");
			}

			return LaundryItem.update({is_deleted:1},{where:{item_id:params.item_id,laundry_id:params.laundry_id}});

		}).then(function(result){

			next(null , "Item Deleted Successfully");

		})
		.catch(err=>{
			next(err+"Error:10020" , null);
		});
	
	},

	/*	
	*Purpose: update items of laundary,
	*Author: Ajay Kumar Shukla
	*Params: {
		"laundry_id" : "1"
		"item_id" : "1"
	}
	*/
	
	changeLaundryItemStatus : function(params , next)
	{
		if(!params.laundry_id){
			throw new Error("Select laundry id");
		}
		if(!params.item_id){
			throw new Error("Select item id");
		}

		LaundryItem.sync().then(function(){

			return LaundryItem.findOne({where:{laundry_id:params.laundry_id, item_id:params.item_id}})

		}).then(function(result){
			
			if(!result)
			{
				throw new Error("Item Doesn't Exists.");
			}

			return LaundryItem.update({status:params.status},{where:{item_id:params.item_id,laundry_id:params.laundry_id}});

		}).then(function(result){

			next(null , "Item "+ params.status +" Successfully");
			
		})
		.catch(err=>{
			next(err+"Error:10020" , null);
		});
	
	},
	
}