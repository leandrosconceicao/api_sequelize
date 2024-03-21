import {Router} from "express";
import CategoryController from "../controllers/category/categoryController";

export default Router()
    .get("/category/:id", CategoryController.findOneById)