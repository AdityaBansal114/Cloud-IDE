import { Request, Response } from "express";
import { db } from "../db";
import { SubmissionCallbackZodSchema } from "../zod/problemsSchema";

const submissionCallback = async(req: Request, res: Response)=>{
    try {
        console.log("control reached here in callback url");
        const parsedBody = SubmissionCallbackZodSchema.safeParse(req.body);

        if(!parsedBody.success){
            res.status(400);
            return;
        }  

        const { token } = parsedBody.data

        await db.submission.update({
            where:{
                judge0TrackingId: token
            },
            data:{
                state: parsedBody.data.status.description
            }
        })

        res.send("recieved");
        
    } catch (error) {
        console.log("error in submission callback controller "+error);
        res.status(500);
    }
}
export default submissionCallback;