import { User } from "@prisma/client";


interface IUser {
    id: number;
    email: string;
    password: string;
    confirmPassword?: string;
}

// confirmPassword is optional because i need to delete it in the service
// no optinal operand can not be deleted in TS.

export type SignupUserData = Omit<IUser, "id">
export type LoginUserData = Omit<IUser, "id" | "confirmpassword">

