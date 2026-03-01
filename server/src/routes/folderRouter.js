import { isLoggedIn } from "../controllers/loginController.js";
import * as folderController from "../controllers/folderController.js";
import { Router } from "express";

const folderRoute = Router();

folderRoute.post(
  "/api/post-single-folder",
  isLoggedIn,
  folderController.addSingleFolder,
);

folderRoute.get(
  "/api/get-all-folders",
  isLoggedIn,
  folderController.getAllFoldersByOwnerId,
);

folderRoute.delete(
  "/api/delete-single-folder",
  isLoggedIn,
  folderController.deleteSingleFolder,
);

folderRoute.patch(
  "/api/update-single-folder",
  isLoggedIn,
  folderController.updateSingleFolder,
);

export default folderRoute;
