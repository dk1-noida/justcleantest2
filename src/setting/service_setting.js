/*
 +-----------------------------------------------------------+
 | Module Name: Setting & Rating Service	                         	 |
 | Module Purpose: Setting related functions				 |
 | Author: Ajay Kumar Shukla                                      |
 +-----------------------------------------------------------+
*/

'use strict';

import db from '../../schema/';

const ratings = db.ratings;
const question = db.rating_questions;

module.exports = {	

	/*	
	*Purpose: laundry rating given by customer
	*Author: Ajay Kumar
	*/

	ratingByCustomer : function(params , next)
	{
		ratings.sync()
		.then(function()
		{
			return ratings.findOne({where:{
				user_id:params.user_id,
				laundry_id:params.laundry_id,
				order_id:params.order_id
			}});
		})
		.then(function(result)
		{
			if(result)
			{
				throw new Error('Category already exists!');
			}
		 	return ratings.create({
				user_id:params.user_id,
				laundry_id:params.laundry_id,
				order_id:params.order_id
			})
		})
		.then(function(result)
		{
			next(null , "Category Created Successfully.");
		})
		.catch(function(err)
		{
			next(err+"Error:10014" , null);
		});
	},
	
	/*	
	*Purpose: createRatingQuestion
	*Author: Ajay Kumar
	*/
	createRatingQuestion : function(params , next)
	{
		question.create({
			rating_question_en:params.question_en,
			rating_question_ar:params.question_ar,
		})
		.then(result=>{
			next(null , "Question created Successfully");
		})
		.catch(err=>{
			next(err+"Error:10015" , null);
		});
	},


	/*	
	*Purpose: get question list
	*Author: Ajay Kumar Shukla
	*/
	getRatingQuestion : function(params , next)
	{
		question.findAll({
			attributes:['id','rating_question_en','rating_question_ar']
		}).then(result=>{

			next(null , result);

		}).catch(err=>{
			
			next(err+"Error:10017" , null);

		});
	},


	/*	
	*Purpose: active rating question
	*Author: Ajay Kumar Shukla
	*/
	activeRatingQuestion : function(params , next)
	{
		
		question.findOne({

			where:{id:params.question_id}

		}).then(function(result){

			if(!result)
			{
				throw new Error('question not exists!');
			}

			question.update({status:params.status},{where:{id:params.question_id}});

		 	next(null,'Question '+params.status);
		 	
		}).catch(function(err)
		{
			next(err+"Error:10014" , null);
		});	
	},
		
	/*	
	*Purpose: update question
	*Author: Ajay Kumar Shukla
	*/

	updateRatingQuestion : function(params , next)
	{
		
		question.findOne({

			where:{id:params.question_id,is_deleted:0}

		}).then(function(result)
		{
			if(!result)
			{
				throw new Error('question not exists!');
			}
			console.log('///');
		 	question.update({rating_question_en:params.question_en, rating_question_ar:params.question_ar},{
		 		where:{id:params.question_id}
		 	});

		 	next(null, 'Successfully updated');
		 	
		}).catch(function(err)
		{
			next(err+"Error:10016" , null);
		});	
	},	
	
}
