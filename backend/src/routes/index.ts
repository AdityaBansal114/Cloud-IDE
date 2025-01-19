import { Router } from "express";
import authRouter from './user/auth'   

const router = Router ();

router.use("/user/auth", authRouter);

export default router;