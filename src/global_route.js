'use strict'

import { Router } from 'express';

import globalController from "./global/controller_global";

const routes = Router();

/**
 * GET home page
 */

routes.get("/test" , (req , res)=>{  
  res.render('index.jade', { title: 'Express testing' });    
});


//Seed and system apis

routes.get( '/', globalController.init );
routes.get('/health-check', globalController.healthCheck);
routes.get('/init-seed', globalController.doSeed);


export default routes;