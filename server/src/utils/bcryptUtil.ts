import bcrypt from "bcryptjs";
import { BCRYPT_SALT_ROUND } from "../config/bcryptConfig";

export const generateHashedPassword = async ( password : string ) => {
    const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUND);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

export const verifyHashedPassword = async ( password : string, hashedPassword :string ) => {
    const res = await bcrypt.compare(password, hashedPassword);
    return res;
};