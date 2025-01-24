import { Router } from "express";
import uservalidation from "../../middlewares/userValidation";
import { getProblemById, getProblems } from "../../controllers/getProblemsUser";

const router = Router();

router.get("/allProblems", uservalidation, getProblems);
router.get("/problem/:problemId", uservalidation, getProblemById)

// to-do
router.get("/problemStatus/:submissionId", uservalidation, )
router.post("/submit/:problemId", uservalidation , );

export default router;