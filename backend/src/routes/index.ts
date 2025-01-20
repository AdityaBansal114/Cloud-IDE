import { Router } from "express";
import authRouter from './user/auth'   
import authAdminRouter from "./admin/auth"
import addAdmin from "../controllers/addAdmin";
import superAdminValidation from "../middlewares/superAdminValidation";
import SAdminSignin from "../controllers/SAdminSignin";

const router = Router ();

router.use("/user/auth", authRouter);
router.use("/admin/auth" , authAdminRouter);
router.post("/superAdmin/addAdmin",superAdminValidation,addAdmin);
router.post("/superAdmin/signin",SAdminSignin);


export default router;