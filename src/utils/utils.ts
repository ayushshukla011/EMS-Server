import argon from 'argon2';
import jwt, { JwtPayload, VerifyErrors,VerifyOptions,Secret } from 'jsonwebtoken';
import { Response,Request,NextFunction } from 'express';

export const verifyToken = (token: string, secret: string, res: Response, next: NextFunction) => {
    jwt.verify(token, secret, (err:any, decoded:any) => {
        if (err) {
            console.error('Failed to authenticate token:', err);
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expired' });
            }
            return res.status(403).json({ error: 'Failed to authenticate token' });
        }
  
        // You can customize this logic based on your requirements
        // For example, you could check additional conditions on the decoded data
  
        // If verification is successful, you can attach the decoded payload to the request object
        // Assuming IUser is defined somewhere in your codebase
        // req.user = decoded as IUser;
        
        next();
    });
  };

  export const HashPassword=(password:string):Promise<string>=>{
    return argon.hash(password);
}

export const VerifyPassword=(hash:string,password:string):Promise<boolean>=>{
    return argon.verify(hash,password);
}