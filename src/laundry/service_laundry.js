/*
 +-----------------------------------------------------------+
 | Module Name: Laundry Service	                         	 |
 | Module Purpose: Laundry related functions				 |
 | Author: Dinesh Kumar                                      |
 +-----------------------------------------------------------+
*/

'use strict';

import db from '../../schema/';

let laundry_master = db.laundry_master;
let laundry_branch = db.laundry_branch;

module.exports = {

	/*	
	*Purpose: Create a laundry
	*Author: Dinesh Kumar
	*Date: 07-Apr-2018
	*/

	createLaundry : function(params , next)
	{		
		laundry_master.sync().then(function()
		{
			return laundry_master.findOne({where:{email_id : params.email_id}});

		}).then(function(result)
		{
			if(result)
			{
				throw new Error("Laundry Already Exists With This Email-ID.");
			}

			return laundry_master.findOne({where:{mobile : params.mobile}});

		}).then(function(result)
		{
			if(result)
			{
				throw new Error("Laundry Already Exists With This Mobile Number.");
			}

			return laundry_master.count();

		}).then(function(result)
		{
	
			return laundry_master.create({		
				laundry_code 	: params.country_code+(parseInt(result)+1),		
				country_id 		: params.country_id,
				country_code 	: params.country_code,
				laundry_name_en :  params.laundry_name_en,
				laundry_name_ar :  params.laundry_name_ar,
				owner_name 		:  params.owner_name,
				mobile 			:  params.mobile,
				alt_mobile 		:  params.alt_mobile,
				email_id 		:  params.email_id,
				area_id 		:  params.area_id,
				laundry_logo 	:  params.laundry_logo,				
				address 		: params.address,
				description 	:  params.description,
				is_deleted		:  0,
				contract_start_date :  params.contract_start_date,
				contract_end_date 	:  params.contract_end_date
			});

		}).then(function(result)
		{
			return next(null,"Laundry Created Successfully.");
		})
		.catch(err=>{
			next(err+"Error:10021" , null);
		});		
	},

	/*	
	*Purpose: Update laundry
	*Author: Dinesh Kumar
	*Date: 07-Apr-2018
	*/

	editLaundry : function(params , next)
	{
		var __this = this;

		laundry_master.sync().then(function()
		{
			return laundry_master.findOne({where:{country_id:params.country_id, id:params.laundry_id, is_deleted:0}});
		})
		.then(function(result)
		{
			if(!result)
			{
				throw new Error("Laundry Doesn't Exist.");	
			}

			return laundry_master.findOne({where:{email_id:params.email_id,id:{$ne:params.laundry_id}}});
		})
		.then(function(result)
		{
			if(result)
			{
				throw new Error("Laundry Already Exists With This Email-ID.");
			}

			return laundry_master.findOne({where:{mobile:params.mobile,id:{$ne:params.laundry_id}}});

		}).then(function(result)
		{
			if(result)
			{
				throw new Error("Laundry Already Exists With This Mobile Number.");
			}

			return laundry_master.update(
				{
					laundry_name_en :  params.laundry_name_en,
					laundry_name_ar :  params.laundry_name_ar,
					owner_name 		:  params.owner_name,
					mobile 			:  params.mobile,
					alt_mobile 		:  (params.alt_mobile)?params.alt_mobile:0,
					email_id 		:  params.email_id,
					area_id 		:  params.area_id,
					laundry_logo 	:  params.laundry_logo,				
					address 		: params.address,
					description 	:  params.description,
					contract_start_date :  params.contract_start_date,
					contract_end_date 	:  params.contract_end_date				
				},
				{
					where:{id:params.laundry_id}
				});
		}).
		then(function(result)
		{
			next(null, "Laundry Updated Successfully.");

		})	
		.catch(err=>{
			next(err+"Error:10023" , null);
		});		
	},

	/*	
	*Purpose: Get laundry list
	*Author: Dinesh Kumar
	*Date: 07-Apr-2018
	*/

	getLaundryList : function(params , next)
	{
		laundry_master.findAll({where:{country_id:params.country_id,is_deleted:0},
								attributes: { exclude: ['is_deleted','createdAt' , 'updatedAt'] }})
		.then(result=>{
			next(null , result);
		}).catch(err=>{
			next(err+"Error10022", null)
		});
	},

	/*	
	*Purpose: Delete laundry
	*Author: Dinesh Kumar
	*Date: 07-Apr-2018
	*/

	deleteLaundry : function(params , next)
	{
		laundry_master.sync().then(function()
		{
			return laundry_master.findOne({where:{id:params.laundry_id,is_deleted:0,country_id:params.country_id}});

		})
		.then(function(result)
		{
			if(!result)
			{
				throw new Error("Laundry Doesn't Exists");
			}

			return laundry_master.update({ is_deleted:1}, {where:{id:params.laundry_id}});

		})
		.then(function(result)
		{
			next(null,"Laundry Removed Successfully.");
		})
		.catch(function(err)
		{
			next(err+"Error:10024" , null);
		});
	},

	/*	
	*Purpose: Create a branch of laundry
	*Author: Dinesh Kumar
	*Date: 07-Apr-2018
	*/

	createLaundryBranch : function(params , next)
	{
		laundry_branch.sync().then(function()
		{		
			return laundry_master.findOne({where:{id:params.laundry_id,is_deleted:0,country_id:params.country_id}});		
		})
		.then(function(result)
		{
			if(!result)
			{
				throw new Error("Laundry Does't Exist.");
			}

			return laundry_branch.findOne({where:{area_id : params.area_id,laundry_id:params.laundry_id,is_deleted:0}});
		})
		.then(function(result)
		{
			if(result)
			{
				throw new Error("Branch Already Exists In This Area.");
			}

			return laundry_branch.findOne({where:{email_id : params.email_id}});			
		})
		.then(function(result)
		{
			if(result)
			{
				throw new Error("Branch Already Exists With This Email-ID.");
			}

			return laundry_branch.findOne({where:{mobile : params.mobile}});

		})
		.then(function(result)
		{
			if(result)
			{
				throw new Error("Branch Already Exists With This Mobile Number.");
			}
		
			return laundry_branch.count();
		})		
		.then(function(count)
		{					
			return laundry_branch.create({
				country_id 		: params.country_id,
				country_code 	: params.country_code,
				branch_code		: params.country_code+(parseInt(count)+1),		
				laundry_id  	: params.laundry_id,
				branch_name_en  	: params.branch_name_en,
				branch_name_ar  	: params.branch_name_ar,
				branch_manager_name : params.branch_manager_name,
				mobile  		: params.mobile,
				email_id  		: params.email_id,			
				governorate_id  : params.governorate_id,
				area_id  		: params.area_id,
				lat  			: params.lat,
				long  			: params.long,
				address  		: params.address,
				created_by  	: params.user_id,
				no_of_drivers	: params.no_of_drivers,		
				is_deleted	: 0
			});
		})
		.then(function(result)
		{

			return next(null,{message:"Laundry Branch Created Successfully.",branch_id:result.id});
		})
		.catch(function(err)
		{
			next(err+"Error:10027" , null);
		});		
	},

	/*	
	*Purpose: Create a branch of laundry
	*Author: Dinesh Kumar
	*Date: 08-Apr-2018
	*/

	editLaundryBranch : function(params , next)
	{
		laundry_branch.sync().then(function()
		{		
			return laundry_branch.findOne({where:{id:params.branch_id,
			 laundry_id:params.laundry_id,
			  is_deleted:0}});		
		})
		.then(function(result)
		{
			if(!result)
			{
				throw new Error("Laundry Does't Exist.");
			}

			return laundry_branch.findOne({where:{area_id : params.area_id,
				laundry_id:params.laundry_id,
				id:{$ne:params.branch_id},
				is_deleted:0}
			});
		})
		.then(function(result)
		{
			if(result)
			{
				throw new Error("Branch Already Exists In This Area.");
			}

			return laundry_branch.findOne({where:{email_id : params.email_id,id:{$ne:params.branch_id}}});

		}).then(function(result)
		{
			if(result)
			{
				throw new Error("Branch Already Exists With This Email-ID.");
			}

			return laundry_branch.findOne({where:{mobile : params.mobile, id:{$ne:params.branch_id}}});

		})
		.then(function(result)
		{
			if(result)
			{
				throw new Error("Branch Already Exists With This Mobile Number.");
			}

			return laundry_branch.update({				
				branch_name_en  	: params.branch_name_en,
				branch_name_ar  	: params.branch_name_ar,
				branch_manager_name  : params.branch_manager_name,
				mobile  		: params.mobile,
				email_id  		: params.email_id,			
				governorate_id  : params.governorate_id,
				area_id  		: params.area_id,
				lat  			: params.lat,
				long  			: params.long,
				address  		: params.address,
				no_of_drivers	: params.no_of_drivers				
			},
			{
				where:{id:params.branch_id,is_deleted:0}
			});
		})
		.then(function(result)
		{
			next(null,"Laundry Branch Updated Successfully.");
		})
		.catch(err=>{
			next(err+"Error:10031" , null);
		});		

	},



	/*	
	*Purpose: Create a branch of laundry
	*Author: Dinesh Kumar
	*Date: 08-Apr-2018
	*/

	deleteBranch : function(params , next)
	{
		laundry_branch.sync().then(function()
		{
			return laundry_branch.findOne({where:{id:params.branch_id,
				laundry_id:params.laundry_id,
				is_deleted:0}});		
		})
		.then(function(result)
		{
			if(!result)
			{
				throw new Error("Laundry Branch Doesn't Exists");
			}

			return laundry_branch.update({				
				is_deleted:1				
			},{where:{id:params.branch_id,laundry_id:params.laundry_id,is_deleted:0}});

		})
		.then(function(result)
		{
			next(null,"Laundry Branch Removed Successfully.");
		})
		.catch(function(err)
		{
			next(err+"Error:10030" , null);
		});
	},

	/*Purpose: Create a branch of laundry
	*Author: Dinesh Kumar
	*Date: 08-Apr-2018
	*/

	getBranchList : function(params , next)
	{
		laundry_branch.findAll({where:{laundry_id:params.laundry_id,is_deleted:0},
			attributes: { exclude: ['is_deleted','createdAt' , 'updatedAt'] }
		}).then(function(result)
		{
			next(null , result);

		}).catch(function(err)
		{
			next(err+"Error10028", null)
		});
	},

	/*Purpose: Create a branch of laundry
	*Author: Dinesh Kumar
	*Date: 10-Apr-2018
	*/

	branchSettings : function(params , next)
	{
		laundry_branch.sync().then(function()
		{		
			return laundry_branch.findOne({where:{id:params.branch_id,
			 laundry_id:params.laundry_id,
			  is_deleted:0}});		
		})
		.then(function(result)
		{
			if(!result)
			{
				throw new Error("Laundry Does't Exist.");
			}			

			return laundry_branch.update({				
				spcl_service_type : reqBody.spcl_service_type,
				jc_premium	: reqBody.jc_premium,			
				min_order_amount : reqBody.min_order_amount,
				fast_turn_around : reqBody.fast_turn_around,
				normal_turn_around : reqBody.normal_turn_around,
				premium_turn_around : reqBody.premium_turn_around				
			},
			{
				where:{id:params.branch_id,is_deleted:0}
			});
		})
		.then(function(result)
		{
			next(null,"Your settings changed successfully.");
		})
		.catch(function(err)
		{
			next(err+"Error:10031" , null);
		});
	}
	
	
 }
