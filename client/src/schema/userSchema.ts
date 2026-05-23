import { z } from "zod"

export const userSingupSchema = z.object({
    fullname: z.string().min(1, "Fullname is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least of 6 character"),
    contact: z.string().min(10, "contact number must be 10 digit")
});

export type SingupInputState = z.infer<typeof userSingupSchema>




export const userLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least of 6 character"),
});

export type LoginInputState = z.infer<typeof userLoginSchema>



