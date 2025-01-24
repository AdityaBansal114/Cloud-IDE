import z from 'zod'

export const addProblemZodSchema = z.object({
    visible : z.boolean(),
    name : z.string(),
    level : z.string(),
    problemStatement: z.string(),
    testCases: z.string(),
    expectedOutput : z.string(),
})