import { Router } from 'express';

import laundryController from "./laundry/controller_laundry";



const routes = Router();

/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.send("fdsfdsfdsfsd"+__config.secret_key);
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


export default routes;