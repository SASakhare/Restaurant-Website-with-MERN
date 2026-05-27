import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            id: string,
        }
    }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User Not Authenticated"
            })
        }

        //* verify the token
        const decode = jwt.verify(token, process.env.SECRET_KEY as string) as jwt.JwtPayload;

        //* check decoding was successfully or not

        if (!decode) {

            return res.status(401).json({
                success: false,
                message: "Unauthorized Access"
            })
        }

        req.id = decode.userId;

        next()
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}



















