/*
 +-----------------------------------------------------------+
 | Module Name: Customer Controller	                       	 |
 | Module Purpose: Customer related functions controller		 |
 | Author: Noorul ameen                                    |
 +-----------------------------------------------------------+
*/

'use strict';
import { failure } from '../../helpers/helper.response';
import { success }  from '../../helpers/helper.response';

import Http from '../../helpers/helper.http';

import mailService from '../../helpers/send_mail';


import customerService from './service_customer';
import validateService from './validations';

import async from 'async';
import _  from 'underscore';
import crypto from 'crypto';
import md5 from 'md5';


module.exports = {

    getCustomersList : function(req , res){
        var reqHeaders = req.headers;
        var reqQuery = req.query;
        var params = {};
        /*if(reqHeaders.country_id != '' || typeof reqHeaders.country_id == 'undefined'){
            params.country_id = reqHeaders.country_id
        }*/
        if(reqQuery.searchstr != '' && typeof reqQuery.searchstr !== 'undefined'){
            params= {"$or": [{firstname: {like: reqQuery.searchstr+'%'}},{lastname: {like: reqQuery.searchstr+'%'}}]}
        }
        if(reqQuery.is_verified != '' && typeof reqQuery.is_verified !== 'undefined'){
            params.is_verified = reqQuery.is_verified
        }
        if( reqQuery.email != '' && typeof reqQuery.email !== 'undefined'){
            params.email = reqQuery.email
        }
        if(reqQuery.mobile != '' && typeof reqQuery.mobile !==  'undefined'){
            params.phone = reqQuery.mobile
        }
        if((reqQuery.startdate != '' && reqQuery.enddate != '') && (typeof reqQuery.startdate !== 'undefined' && typeof reqQuery.enddate !== 'undefined')){
            params.createdAt= {"$between": [reqQuery.startdate+' 00:00:00',reqQuery.enddate+' 23:59:59']}
        }
        if((reqQuery.startdate != '' && reqQuery.enddate == '') && (typeof reqQuery.startdate !== 'undefined' && typeof reqQuery.enddate !== 'undefined')){
            params.createdAt= {"$gte": reqQuery.startdate+' 00:00:00'}
        }
        if((reqQuery.enddate != '' && reqQuery.startdate == '') && (typeof reqQuery.startdate !== 'undefined' && typeof reqQuery.enddate !== 'undefined')){
            params.createdAt= {"$lte": reqQuery.enddate+' 23:59:00'}
        }
        if(reqQuery.limit != '' && typeof reqQuery.limit !== 'undefined'){var limit = parseInt(reqQuery.limit)}else{var limit = 0;}
        async.parallel([
            function(callback) {
                customerService.getCustomrsList(params,limit , function(err , result)
                {
                    if(err){
                        callback(err, null);
                    }
                    callback(null, result);
                });
            },
            function(callback) {
                customerService.getCustomrsListcount(params,function(err , result)
                {
                    if(err){
                        callback(err, null);
                    }
                    callback(null, result);
                });
            }
        ], function(err, results) {
            if(err){
                return res.json(failure(err,Http.FORBIDDEN));
            }
            return res.json( success( "success", Http.EVERYTHING_IS_OK , results ) );
        });
    },

    
    createTag:function(req,res) {
        var reqHeaders = req.headers;
        var reqBody = req.body;
        var params = {
            name:reqBody.name
        };

        customerService.createTagadmin(params , function(err , result)
        {
            if(err)
            {
                return res.json(failure(err,Http.FORBIDDEN));
            }
            return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
        });

    },
    tagToCustomer:function(req,res) {
        var reqBody = req.body;
        var list = [];
        _.each(reqBody.userid, function(user_id) {
            _.each(reqBody.tagid, function(tag_id) {
                list.push({"tag_id":tag_id,"user_id":user_id});
            })
        })
        customerService.tagtoCustomer(list , function(err , result)
        {
            if(err)
            {
                return res.json(failure(err,Http.FORBIDDEN));
            }
            return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
        });

    },
    getUserTag:function(req,res) {
        var reqQuery = req.query;
        customerService.getuserTag(reqQuery.userid , function(err , result)
        {
            if(err)
            {
                return res.json(failure(err,Http.FORBIDDEN));
            }
            return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
        });
    },

    removeTagToCustomer:function(req,res) {
        var reqBody = req.body;
        customerService.removetagtoCustomer(reqBody.tagdeailid , function(err , result)
        {
            if(err)
            {
                return res.json(failure(err,Http.FORBIDDEN));
            }
            return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
        });
    },


    customerOrderDetails:function(req,res) {
        var reqQuery = req.query;
        async.parallel([
            function(callback) {
                customerService.customerorderDetails(reqQuery.userid , function(err , result)
                {
                    if(err){
                        callback(err, null);
                    }
                    callback(null, result);
                });
            },
            function(callback) {
                customerService.getuserTag(reqQuery.userid,function(err , result)
                {
                    if(err){
                        callback(err, null);
                    }
                    callback(null, result);
                });
            }
        ], function(err, results) {
            if(err){
                return res.json(failure(err,Http.FORBIDDEN));
            }
            return res.json( success( "success", Http.EVERYTHING_IS_OK , results ) );
        });
    },
    deleteCustomer:function(req,res) {
        var reqBody = req.body;
        customerService.removeCustomer(reqBody.id , function(err , result)
        {
            if(err)
            {
                return res.json(failure(err,Http.FORBIDDEN));
            }
            return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
        });

    },
    blockListUser:function(req,res) {
        var reqBody = req.body;
        var params ={
            block_master_id:reqBody.reasonid,
            user_id:reqBody.userid,
            note:reqBody.note
        }

        customerService.blockCustomer(params , function(err , result)
        {
            if(err)
            {
                return res.json(failure(err,Http.FORBIDDEN));
            }
            return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
        });
    },

    blockReasonDate:function(req,res) {
        customerService.blockreasondata(function(err,result) {
            if(err)
            {
                return res.json(failure(err,Http.FORBIDDEN));
            }
            return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
        })

    },
    blockListUserList:function(req,res) {
        var reqHeaders = req.headers;
        var reqQuery = req.query;
        var params = {};
        var dateparams = {
            user_id: {
                $ne: null
            }
        };
        /*if(reqHeaders.country_id != '' || typeof reqHeaders.country_id == 'undefined'){
            params.country_id = reqHeaders.country_id
        }*/
        if(reqQuery.searchstr != '' && typeof reqQuery.searchstr !== 'undefined'){
            params= {"$or": [{firstname: {like: reqQuery.searchstr+'%'}},{lastname: {like: reqQuery.searchstr+'%'}}]}
        }
        if( reqQuery.email != '' && typeof reqQuery.email !== 'undefined'){
            params.email = reqQuery.email
        }
        if(reqQuery.mobile != '' && typeof reqQuery.mobile !==  'undefined'){
            params.phone = reqQuery.mobile
        }
        if((reqQuery.startdate != '' && reqQuery.enddate != '') && (typeof reqQuery.startdate !== 'undefined' && typeof reqQuery.enddate !== 'undefined')){
            dateparams.createdAt= {"$between": [reqQuery.startdate+' 00:00:01',reqQuery.enddate+' 23:59:59']}
        }
        if((reqQuery.startdate != '' && reqQuery.enddate == '') && (typeof reqQuery.startdate !== 'undefined' && typeof reqQuery.enddate !== 'undefined')){
            dateparams.createdAt= {"$gte": reqQuery.startdate+' 00:00:01'}
        }
        if((reqQuery.enddate != '' && reqQuery.startdate == '') && (typeof reqQuery.startdate !== 'undefined' && typeof reqQuery.enddate !== 'undefined')){
            dateparams.createdAt= {"$lte": reqQuery.enddate+' 23:59:00'}
        }
        if(reqQuery.limit != '' && typeof reqQuery.limit !== 'undefined'){var limit = parseInt(reqQuery.limit)}else{var limit = 0;}
        customerService.blocklistuserList(params,dateparams,limit,function(err,result) {
            if(err)
            {
                return res.json(failure(err,Http.FORBIDDEN));
            }
            return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
        })
    },

    activeBlockListUser:function(req,res) {
        var reqBody = req.body;
        customerService.activeblocklistUser(reqBody.user_blocklists_id , function(err , result)
        {
            if(err)
            {
                return res.json(failure(err,Http.FORBIDDEN));
            }
            return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
        });
    },

    customerData:function(req,res) {
        var reqQuery = req.query;
        var response = {};
        async.parallel([
            function(callback) {
                customerService.customerdetails(reqQuery.user_id, function(err , result)
                {
                    if(err){
                        callback(err, null);
                    }
                    callback(null, result);
                });
            },
            function(callback) {
                customerService.customerordercount(reqQuery.user_id,function(err , result)
                {
                    if(err){
                        callback(err, null);
                    }
                    callback(null, result);
                });
            }
        ], function(err, results) {
            if(err){
                return res.json(failure(err,Http.FORBIDDEN));
            }
            response = results[0][0].get({plain: true});
            response.totalorder = results[1][0].get({plain: true}).totalorder;
            return res.json( success( "success", Http.EVERYTHING_IS_OK ,response) );
        });
    },

    customerOrderData:function(req,res){
        var reqQuery = req.query;
        var laundryparams ={};
        var dateorder = {};
        var stausparams = {};

        if(reqQuery.searchstr != '' && typeof reqQuery.searchstr !== 'undefined'){
            laundryparams= {branch_name: {like: '%'+reqQuery.searchstr+'%'}}
        }
        if(reqQuery.status != '' && typeof reqQuery.status !==  'undefined'){
            stausparams.status_name = reqQuery.status
        }
        if(reqQuery.payment_type != '' && typeof reqQuery.payment_type !==  'undefined'){
            dateorder.payment_type_id = reqQuery.payment_type
        }
        if((reqQuery.startdate != '' && reqQuery.enddate != '') && (typeof reqQuery.startdate !== 'undefined' && typeof reqQuery.enddate !== 'undefined')){
            dateorder.order_date= {"$between": [reqQuery.startdate+' 00:00:01',reqQuery.enddate+' 23:59:59']}
        }
        if((reqQuery.startdate != '' && reqQuery.enddate == '') && (typeof reqQuery.startdate !== 'undefined' && typeof reqQuery.enddate !== 'undefined')){
            dateorder.order_date= {"$gte": reqQuery.startdate+' 00:00:01'}
        }
        if((reqQuery.enddate != '' && reqQuery.startdate == '') && (typeof reqQuery.startdate !== 'undefined' && typeof reqQuery.enddate !== 'undefined')){
            dateorder.order_date= {"$lte": reqQuery.enddate+' 23:59:59'}
        }
        if(reqQuery.limit != '' && typeof reqQuery.limit !== 'undefined'){var limit = parseInt(reqQuery.limit)}else{var limit = 0;}
        customerService.customerorderdata(reqQuery.user_id,limit,dateorder,stausparams,laundryparams,function(err , result)
        {
            if(err)
            {
                return res.json(failure(err,Http.FORBIDDEN));
            }
            return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
        });
    },


    getOrderStatus:function(req,res){
        customerService.getorderstatus(function(err , result)
        {
            if(err)
            {
                return res.json(failure(err,Http.FORBIDDEN));
            }
            return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
        });
    },

    /*postPlaceOrder : function(req , res)
    {
        var reqBody = req.body;
        //var reqHeaders = locals.headers;

        /!*var errReason = validateService.validatePlaceOrder(reqHeaders , reqBody, false);

        if(errReason)
        {
            return res.json(failure(errReason,Http.FORBIDDEN));
        }*!/
        var params = {
            user_id : reqBody.user_id,
            laundry_id : reqBody.laundry_id,
            basket_type_id : reqBody.basket_type_id,
            total_no_of_items : reqBody.total_no_of_items,
            basket_data_item : reqBody.basket_data_item,
            order_total_amount : reqBody.order_total_amount,
            order_status : reqBody.order_status

        };
        customerService.placeorder(params , function(err , result)
        {
            if(err)
            {
                return res.json(failure(err,Http.FORBIDDEN));
            }

            return res.json( success( "Your order placed successfully.", Http.EVERYTHING_IS_OK , result ) );
        });

    },*/




    customerUdateAddress:function(req,res){
        var reqBody = req.body;
        customerService.customerudateaddress(reqBody,function(err , result)
        {
            if(err)
            {
                return res.json(failure(err,Http.FORBIDDEN));
            }
            return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
        });
    },
    customerUdateUserDetails:function(req,res) {
        var reqBody = req.body;
        customerService.customerUdateuserdetails(reqBody,function(err , result)
        {
            if(err)
            {
                return res.json(failure(err,Http.FORBIDDEN));
            }
            return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
        });
    },
    createCustomer:function(req,res){
        var reqBody = req.body;
        /*var errReason = validateService.validateRegister(reqBody);
        if(errReason)
        {
            return res.json(failure(errReason,Http.FORBIDDEN));
        }*/
        var params = {
            firstname : reqBody.firstname,
            lastname : reqBody.lastname,
            username : reqBody.username,
            mobile : reqBody.mobile,
            email : reqBody.email,
            password : md5(crypto.randomBytes(5).toString('hex')),
            language_id : reqBody.language_id,
            user_type : "user"
        };
        customerService.createcustomer(params , function(err , result)
        {
            if(err)
            {
                return res.json(failure(err,Http.FORBIDDEN));
            }
            var params = {to:"nameen@justclean.com" ,subject:"New User Details", text:"" , html:"" ,template: __base+'app/mailtemplates/newuser.html',data:{name:result.firstname+ ' ' +result.firstname,password:result.password,username:result.username}};

            mailService.sendEMail(params)
            return res.json( success(  "success", Http.EVERYTHING_IS_OK , result ) );
        });
    },
    allArea:function(req,res){
        var reqQuery = req.query;
        customerService.allarea(reqQuery,function(err , result)
        {
            if(err)
            {
                return res.json(failure(err,Http.FORBIDDEN));
            }
            return res.json( success( "success", Http.EVERYTHING_IS_OK , result ) );
        });

    },
    customerResetPassword:function(req,res){
        var reqQuery = req.query;
        var params = {
            id:reqQuery.user_id,
            password:md5(crypto.randomBytes(5).toString('hex'))
        }
        customerService.customerresetpassword(params,function(err , result)
        {
            if(err)
            {
                return res.json(failure(err,Http.FORBIDDEN));
            }
           var params = {to:"nameen@justclean.com" ,subject:"Reset Password", text:"" , html:"" ,template: __base+'app/mailtemplates/resetpassword.html',data:{name:result.firstname+ ' ' +result.firstname,password:result.password,username:result.username}};
            mailService.sendEMail(params)
            return res.json( success( "success", Http.EVERYTHING_IS_OK,'User password reset successfully!') );
        });

    },


}
