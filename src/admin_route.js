import { Router } from 'express';

import laundryController from "./laundry/controller_laundry";
import customerController from "./customer/controller_customer";
import itemController from "./items/controller_item";
import settingController from "./setting/controller_setting";

const routes = Router();

/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.send("it's cool."+__config.secret_key);
});

//CRUD for laundry master
routes.post("/add-edit-laundry" , laundryController.addEditLaundry);
routes.get("/get-laundry-list" , laundryController.getLaundryList);
routes.post("/delete-laundry" , laundryController.deleteLaundry);

//CRUD for laundry branch
routes.post("/add-edit-branch" , laundryController.addEditLaundryBranchInfo);
routes.post("/delete_branch" , laundryController.deleteBranch);
routes.get("/get-branch-list/:laundry_id" , laundryController.getListOfBranches);

//CRUD for branch settings
routes.post("/branch-settings" , laundryController.branchSettings);


//admin customer module
routes.get("/admin/get-customers-list" , customerController.getCustomersList);
routes.post("/admin/delete-customer" , customerController.deleteCustomer);
routes.post("/admin/create-tag" , customerController.createTag);
routes.post("/admin/assign-tags" , customerController.tagToCustomer);
routes.get("/admin/get-user-tags" , customerController.getUserTag);
routes.post("/admin/remove-user-tags" , customerController.removeTagToCustomer);
routes.get("/admin/user-order-details" , customerController.customerOrderDetails);
//blocklist customer

routes.get("/admin/blocklist-data" , customerController.blockReasonDate);
routes.post("/admin/blocklist-user" , customerController.blockListUser);
routes.get("/admin/blocklist-users-list" , customerController.blockListUserList);
routes.post("/admin/active-blocklist-user" , customerController.activeBlockListUser);
//customer order

routes.get("/admin/customer-data" , customerController.customerData);
routes.get("/admin/customer-order-date" , customerController.customerOrderData);
routes.get("/admin/order-status" , customerController.getOrderStatus);
//routes.post("/admin/customer-place-order" , customerController.postPlaceOrder);

//customer curd
routes.post("/admin/customer-update-address" , customerController.customerUdateAddress);
routes.post("/admin/customer-update-name" , customerController.customerUdateUserDetails);
routes.post("/admin/create-customer" , customerController.createCustomer);
routes.get("/admin/all-area" , customerController.allArea);
routes.get("/admin/reset-password" , customerController.customerResetPassword);

//CRUD for categories
routes.post("/create-category" , itemController.createCategory);
routes.get("/get-category" , itemController.getCategory);
routes.post("/edit-category" , itemController.updateCategory);
routes.post("/delete-category" , itemController.deleetCategory);

//CRUD for items
routes.post("/create-item" , itemController.createItem);
routes.get("/get-item-list" , itemController.getItemList);
routes.post("/edit-item" , itemController.editItem);
routes.post("/delete-item" , itemController.deleteItem); 

/**
***Admin Setting
**/

routes.post("/admin/create-question" , settingController.createRatingQuestion);
routes.get("/admin/get-question" , settingController.getRatingQuestion);
routes.post("/admin/change-status" , settingController.activeRatingQuestion);
routes.post("/admin/update-question" , settingController.updateRatingQuestion);


export default routes;