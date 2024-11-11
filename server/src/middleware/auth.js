import jwt from "jsonwebtoken";
import 'dotenv/config';
const secret_key = process.env.SECRET_KEY;

export const authenticationToken = (req,res,next) => {
    const token = req.header('auth-token');

    if(!token)
        return res.status(401).json({message: "unauthorized access"});

    jwt.verify(token,secret_key,(err,user) => {
        if(err){
            return res.status(403).json({message: "Forbidden access"});
        }
        req.user = user;
        next();
    });
};