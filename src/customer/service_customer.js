/*
 +-----------------------------------------------------------+
 | Module Name: Customer Service	                         	 |
 | Module Purpose: Customer related functions				 |
 | Author: Noorul ameen                                   |
 +-----------------------------------------------------------+
*/

'use strict';

import async from "async";
import db from '../../schema/';
import constant from '../../helpers/helper.constant';
import globalFunctions from '../../helpers/helper.general';

module.exports = {
    getCustomrsList:function (params,limit , next) {
        db.users.findAll({
            offset:limit,
            limit:constant.adminPageLimit,
            subQuery: false,
            where: params,
            attributes: ['id', 'firstname', 'lastname', 'email', 'is_verified', 'loged_from','phone','createdAt','updatedAt'],
            group:['users.id','orders.user_id'],
            raw: true,
            include: {
                model: db.orders,
                attributes: [[db.orders.sequelize.fn('sum', db.orders.sequelize.col('order_bill_amount')), 'total_spend']]
            }
        }).then(function (data) {
            return next(null, data);
        })
    },
    getCustomrsListcount:function (params,next) {
        db.users.findAndCountAll({
            subQuery: false,
            where: params,
            attributes: ['id', 'firstname', 'lastname', 'email', 'is_verified', 'loged_from','phone','createdAt','updatedAt'],
            group:['users.id','orders.user_id'],
            raw: true,
            include: {
                model: db.orders,
                attributes: [[db.orders.sequelize.fn('sum', db.orders.sequelize.col('order_bill_amount')), 'total_spend']]
            }
        }).then(function (data) {
            var count ={
                count:data.count.length
            };

            return next(null, count);
        })
    },
    createTagadmin:function(params , next) {
        db.tag_master.create(params).then(function(result){
            return next(null, 'Tag Created!');
        }).catch(function(err){
            next(err+"Error:10024" , null);
        });

    },
    tagtoCustomer:function(params,next) {
        db.customer_tag_details.bulkCreate(params).then(function(result){
            return next(null, 'Tag assigned to users!');
        }).catch(function(err){
            next(err+"Error:10024" , null);
        });
    },
    getuserTag:function(params,next) {
        db.customer_tag_details.findAll({
            where: {
                user_id:params
            },
            attributes: ['id'],
            raw: true,
            include: [{
                model: db.tag_master,
                attributes: ['name']
            }]
        }).then(function (data) {
            return next(null, data);
        });
    },
    removetagtoCustomer:function(params,next) {
        db.customer_tag_details.destroy({
            where: {
                id: params
            }
        }).then(function(result){
            return next(null, 'Removed tag to users!');
        }).catch(function(err){
            next(err+"Error:10024" , null);
        });
    },
    customerorderDetails:function (params,next) {
        db.users.findAll({
            where: {
                id:params
            },
            subQuery: false,
            attributes: ['jccredit_balance_amount'],
            group:['users.id','orders.user_id'],
            raw: true,
            include: [{
                model: db.orders,
                attributes: [[db.orders.sequelize.fn('count', db.orders.sequelize.col('orders.id')), 'totalorder'],['order_date','firstorder'],[db.orders.sequelize.fn('max', db.Sequelize.col('order_date')), 'lastorder']]
            },{
                model:db.addresses,
                attributes:[],
                include: [
                    {
                        model:db.areas,
                        attributes:['name']
                    }
                ]

            }]
        }).then(function (data) {
            return next(null, data);
        });

    },
    removeCustomer:function(params,next) {
        db.users.update({user_status:'Inactive'},{where:{id:params}}).then(function(result){
            console.log(result)
            return next(null, 'User deleted!');
        }).catch(function(err){
            next(err+"Error:10024" , null);
        });
    },
    blockCustomer:function (params,next) {
        db.user_blocklist.create(params).then(function(result){
            return next(null, 'User Blacklist!');
        }).catch(function(err){
            next(err+"Error:10024" , null);
        });
    },
    blockreasondata:function (next) {
        db.blocklist_master.findAll().then(function(result){
            return next(null, result);
        }).catch(function(err){
            next(err+"Error:10024" , null);
        });
    },
    blocklistuserList:function (params,dateparams,limit,next) {
        db.users.findAndCountAll({
            offset:limit,
            limit:constant.adminPageLimit,
            subQuery: false,
            attributes: ['id', 'firstname', 'lastname', 'email','phone'],
            raw: true,
            where:params,
            include: [{
                model: db.user_blocklist,
                attributes: ['id','note','user_id','createdAt'],
                where:dateparams,
                include: [
                    {
                        model:db.blocklist_master,
                        attributes:['reason']
                    }
                ]
            }]
        }).then(function (data) {
            return next(null, data);
        }).catch(function(err){
            next(err+"Error:10024" , null);
        });
    },
    activeblocklistUser:function(params,next) {
        async.forEach(params, function (item, callback){
            db.user_blocklist.update({status: 'Inactive'},{where:{ id: item }});
            callback();
        }, function(err) {
            if (err){
                return next(err, null);
            }
            return next(null, 'Updated successfully!');
        });
    },
    customerdetails:function(params,next) {
        db.users.findAll({
            subQuery: true,
            where: {
                id:params
            },
            attributes: ['id', 'firstname', 'lastname','username', 'email','phone','jccredit_balance_amount'],
            include: [{
                model: db.addresses,
                attributes: ['id','address_type','area_id','governorate_id','country_id','block','street','avenue','house_no','building','floor','latitude','longitude'],
                include:[{
                    model:db.areas,
                    attributes:['name']
                },{
                    model:db.governorates,
                    attributes:['name']
                },{
                    model:db.countries,
                    attributes:['name']
                }]
            }]
        }).then(function (data) {
            return next(null, data);
        });
    },

    customerordercount:function(params,next) {
        db.users.findAll({
            subQuery: false,
            where: {
                id:params
            },
            attributes: ['id',[db.orders.sequelize.fn('count', db.orders.sequelize.col('orders.id')), 'totalorder']],
            include: [{
                model: db.orders,
                attributes: [],
                group:['orders.id']

            }]
        }).then(function (data) {
            return next(null, data);
        });
    },
    customerorderdata:function(params,limit,dateorder,stausparams,laundryparams,next){
        db.users.findAndCountAll({
            offset:limit,
            limit:constant.adminPageLimit,
            subQuery: false,
            raw: true,
            where: {
                id:params
            },
            attributes: ['id'],
            include: {
                model: db.orders,
                attributes: ['id','order_unique_id','laundry_id','payment_type_id','order_bill_amount','order_date'],
                where:dateorder,
                include: [
                    {
                        model:db.status,
                        attributes:['status_name'],
                        where:stausparams
                    },
                    {
                        model:db.laundry_branch,
                        attributes:['branch_code','branch_name'],
                        where:laundryparams
                    }
                ]
            }
        }).then(function (data) {
            return next(null, data);
        }).catch(function(err){
            next(err+"Error:10024" , null);
        });

    },
    getorderstatus:function(next){
        db.status.findAll({
            subQuery: false,
            attributes: ['status_name']
        }).then(function (data) {
            return next(null, data);
        }).catch(function(err){
            next(err+"Error:10024" , null);
        });
    },

    /*placeorder : function(params, next)
    {
        async.waterfall([function(callback){
                db.laundry_branch.findOne({where:{id:params.laundry_id}}).then(function(result)
                {
                    if(result)
                    {
                        if(result.laundry_min_order_amount > params.total_order_amount){
                            return next("Order amount is less than minimum amount." , null);
                        }
                            var test ={
                                order_unique_id: globalFunctions.uniqueId(),
                                user_id: params.user_id,
                                laundry_id: params.laundry_id,
                                basket_type_id: params.basket_type_id,
                                order_bill_amount: params.order_total_amount,
                                total_no_of_items: params.total_no_of_items,
                                special_instruction: params.instruction,
                                order_date: globalFunctions.getDateTime(),
                                order_status:params.order_status
                            }
                        db.orders.create(test).then(function(data)
                        {
                            callback(null,data);

                        }).catch(function(e)
                        {
                            callback(e , null);
                        })

                    }
                    else
                    {
                        callback('laundry not exist.' , null);
                    }

                }).catch(function(e){
                    callback(e+"Error:1001", null);
                });

            },
            function(data, callback){

                var newData = [];
                for(var i in params.basket_data_item)
                {
                    newData.push({
                        order_id: data.id,
                        service_id: params.basket_data_item[i].service_id,
                        item_id: params.basket_data_item[i].id,
                        unit_price:  params.basket_data_item[i].price,
                        quantity: params.basket_data_item[i].quantity
                    });

                }
                console.log('ssssss',newData)


                db.basket.bulkCreate(newData).then(function(basket)
                {

                    return next(null,data);

                    console.log('ameen>>>',basket)
                }).catch(function(e)
                {
                    callback(e , null);
                })

            }

        ], function (err, result) {
            return next(err , result);
        });
    },*/




    customerudateaddress:function(params,next){
        db.addresses.update(params,{where:{id:params.id}}).then(function(result){
            console.log(result)
            return next(null, 'User Address updated!');
        }).catch(function(err){
            next(err+"Error:10024" , null);
        });
    },
    customerUdateuserdetails:function(params,next){
        db.users.update(params,{where:{id:params.id}}).then(function(result){
            return next(null, 'User updated!');
        }).catch(function(err){
            next(err+"Error:10024" , null);
        });
    },
    createcustomer:function(params,next){
        db.users.create(params).then(function(result){
            return next(null, result);
        }).catch(function(err){
            next(err+"Error:10024" , null);
        });
    },
    allarea:function(params,next){
        db.areas.findAll({
            subQuery: true,
            attributes: ['id','name']/*,
            include:{
                    model:db.governorates,
                    attribute:['id'],
                    include:{
                        model:db.countries,
                        where:{id:params.country_id}
                    }

                }*/
        }).then(function (data) {
            return next(null, data);
        }).catch(function(err){
            next(err+"Error:10024" , null);
        });

    },
    customerresetpassword:function(params,next){
        db.users.findOne({
            where: {id: params.id}
        }).then(function(data){
            if(!data){
                return next('User not found',null);
            }
            db.users.update(params,{where:{id:params.id}}).then(function(result){
                return next(null, data);
            });
        }).catch(function(e){
            return next(e+"Error:0001" , null);
        })

    }
}