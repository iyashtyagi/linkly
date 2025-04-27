import { eq } from "drizzle-orm";
import { db } from "../config/db";
import { usersTable } from "../models/schema";
import { authValidation } from "../validations";
import { jwtUtil, bcryptUtil } from "../utils";

export const signin = async ({ username, password } : authValidation.SigninInput) => {
    username = username.trim().toLowerCase();
    const user = await db.select().from(usersTable).where(eq(usersTable.username, username));

    if(!user){
        throw new Error("User not found");
    }

    const isPasswordValid = await bcryptUtil.verifyHashedPassword(password, user[0].password);

    if(!isPasswordValid){
        throw new Error("Invalid username/password");
    }

    const payload = {
        data : {
            userId : user[0].id
        },
        expiresIn : '1d'
    };

    const token = jwtUtil.generateToken(payload);

    return token;
};