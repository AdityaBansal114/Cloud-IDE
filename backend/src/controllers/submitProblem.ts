import { Request, Response } from "express";
import { submitProblemZodSchema } from "../zod/problemsSchema";
import axios from "axios";
import { db } from "../db";
import { CALLBACK_URL, SUBMISSION_URL } from "../utils/envVars";

const submitProblem = async(req: Request, res: Response) =>{
    try {
        const data = submitProblemZodSchema.safeParse(req.body);
        if(!data.success){
            res.status(400).json({message : "invalid inputs"});
            return;
        }
        const { sourceCode , languageId } = data.data;
        const { problemId } = req.params;
        if(!req.User ){
            res.status(400).json({message : "Not logged in"});
            return
        }
        const userId = req.User.id

        const api_key = process.env.RAPID_API_KEY;


        const problem = await db.problem.findUnique({
            where:{
                id: problemId
            }
        })

        if(!problem || !problem.visible){
            res.status(400).json({message : "Not a valid problem"})
            return;
        }

        const response: any = await axios.post(SUBMISSION_URL, 
          {
            language_id: languageId,
            source_code: sourceCode,
            expected_output: problem.expectedOutput,
            stdin: problem.input, 
            callback_url : CALLBACK_URL

          },
          {
            headers: {
              'x-rapidapi-key': api_key, 
              'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
              'Content-Type': 'application/json',
            },
          }
        )

        const token:string = response.data.token;

        const submission = await db.submission.create({
            data:{
                state: "pending",
                judge0TrackingId: token,
                problemId,
                userId
            }
        });

        res.status(200).json({
            submissionId: submission.id
        })
    } catch (error) {
        console.log("error in the submit problem controller "+ error);
        res.status(500).json({message: "Internal server error"});
    }
}

export default submitProblem
