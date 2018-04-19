
/*
 +-----------------------------------------------------------+
 | Module Name: Country List
 | Module Purpose: Fetch all country data        	     |
 +-----------------------------------------------------------+
*/

'use strict';

import sequelize_fixtures from 'sequelize-fixtures';
import db from '../../schema/';

const countries = db.countries;


module.exports = {

	/*
	*name    : Initailize seed 
	*Purpose : it is to initialize the seed once to setup app
	*Created : 19 Apr 2018
	*/
	
	init : function(params , next)
	{
		var locals = params.app.get('config');

		var op = {
			api : locals.project_name,
	        version: locals.version,
	        date: new Date().getTime()
		};
		
		db.sequelize.sync().then(function() 
		{
			console.log('It worked!');
			return next(null , 'It worked!');
		})
		.catch(function(err)
		{
			console.log('An error occurred while creating the table:', err);
			return next(err , null);
		});		

	},

	/*
	*name    : Initailize seed 
	*Purpose : it is to initialize the seed once to setup app
	*Created : 19 Apr 2018
	*/
	
	doSeed : function(params , next)
	{
		var options = {
			modifyFixtureDataFn: function (data) {
	          if(!data.createdAt) {
	            data.createdAt = new Date();
	          }
			  if(!data.updatedAt) {
	            data.updatedAt = new Date();
	          }
	          return data;
	        }
		};

		db.sequelize.sync().then(function() 
		{			
			//can use glob syntax to select multiple files
			sequelize_fixtures.loadFile(__base+'/seed/*.json', db , options )
			.then(function(result)
			{
				console.log("seed done successfully.");
				return next(null , "seed done successfully.");

			})
			.catch(function(e)
			{
				console.log("erro erroerroerro -----"+e); 
				return next(e , null);
			});

		})
		.catch(function(e)
		{
			console.log("erro erroerroerro -----"+e); 
			return next(e , null);
		});

	},

	/*
	*name    : Initailize seed 
	*Purpose : it is to initialize the seed once to setup app
	*Created : 19 Apr 2018
	*/
	
	healthCheck : function(params , next)
	{
		
		db.sequelize.sync().then(function() 
		{
			console.log('It worked!');
			return countries.findOne({});
			
		})
		.then(function(result)
		{
			return next(null , "It's cool!");
		})
		.catch(function(err)
		{
			console.log('An error occurred while creating the table:', err);
			return next(err , null);
		});		

	},

}
