import { generateToken } from "authenticator";
import { verifyToken as verifyTokenLib } from "authenticator";
import { TOPT_SECRET } from "./envVars";


type TokenType = "AUTH" | "ADMIN_AUTH";

export function getOTP(email: string, type: TokenType) {
    return generateToken(email + type + TOPT_SECRET);
}

export function verifyOTP(email: string, type: TokenType, otp: string) {
    return verifyTokenLib(email + type + TOPT_SECRET,  otp)
}