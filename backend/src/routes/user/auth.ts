import { Router } from "express";
import {userSignupController ,userSignupVerifyController } from "../../controllers/userSignup"
import { userSigninController, userSigninVerifyController  } from "../../controllers/userSigin";
const router = Router();

router.post("/signup" , userSignupController);
router.post("/signup/verify", userSignupVerifyController);
router.post("/signin", userSigninController);
router.post("/signin/verify", userSigninVerifyController);


export default router;