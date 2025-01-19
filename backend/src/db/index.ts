import { PrismaClient, SubState as PrismaSubStateType} from "@prisma/client";

export const db = new PrismaClient();

export const SubState = PrismaSubStateType