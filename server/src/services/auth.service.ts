import { eq } from "drizzle-orm";
import { db } from "../config/db";
import { usersTable } from "../models/schema";
import { authValidation } from "../validations";
import { jwtUtil, bcryptUtil } from "../utils";
import { BadRequestError, NotFoundError } from "../errors";

export const signin = async ({ username, password } : authValidation.SigninInput) => {
    username = username.trim().toLowerCase();
    const user = await db.select().from(usersTable).where(eq(usersTable.username, username)).limit(1);

    if(!user[0]){
        throw new NotFoundError("User not found");
    }

    const isPasswordValid = await bcryptUtil.verifyHashedPassword(password, user[0].password);

    if(!isPasswordValid){
        throw new BadRequestError("Invalid username/password");
    }
    
    // Remove password from user object before generating token
    const { password: _, createdAt, ...safeUser } = user[0];
    
    const payload = {
        data : {
            userId : safeUser.id,
            user: safeUser
        },
        expiresIn : '1d'
    };
    
    const token = jwtUtil.generateToken(payload);

    return {
        user : safeUser,
        token
    };
};

export const signup = async ({ username, password, firstName, lastName } : authValidation.SignupInput) => {
    username = username.trim().toLowerCase();
    firstName = firstName.trim();
    lastName = lastName.trim();

    const existingUsers = await db.select({ username : usersTable.username }).from(usersTable).where(eq(usersTable.username, username)).limit(1);

    if(existingUsers.length){
        throw new BadRequestError("User already exist");
    }

    const hashedPassword = await bcryptUtil.generateHashedPassword(password);

    const newUser = await db.insert(usersTable).values({
        username,
        password : hashedPassword,
        firstName,
        lastName
    }).returning({
        userId : usersTable.id,
        username : usersTable.username
    });

    return newUser[0];
};