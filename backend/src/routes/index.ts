import { Router } from "express";
import authRouter from './user/auth'   
import authAdminRouter from "./admin/auth"

const router = Router ();

router.use("/user/auth", authRouter);
router.use("/admin/auth" , authAdminRouter);

export default router;