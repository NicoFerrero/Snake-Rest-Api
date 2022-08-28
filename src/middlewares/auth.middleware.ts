import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import Role from '../models/role.model';

declare module 'express-serve-static-core' {
    interface Request {
        userId?: String;
    }
}

export default class authMiddleware {
    constructor() {}

    static async verifyToken(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization;
            if (!token) return res.status(403).json({ error: 'No se envio un token' });
            const payload = jwt.verify(token, process.env.SECRET_JWT as string) as { id: string; roles: String[] };
            console.log(payload);
            const user = await User.findById(payload.id);
            if (!user) return res.status(403).json({ error: 'El usuario no existe' });
            req.userId = payload.id;
            next();
        } catch (error) {
            return res.status(401).json({ error: 'No autorizado' });
        }
    }

    static async isAdmin(req: Request, res: Response, next: NextFunction) {
        const user = await User.findById(req.userId);
        if (!user) return res.status(403).json({ error: 'El usuario no existe' });
        const roles = await Role.find({ _id: { $in: user.roles } });
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'admin') {
                next();
            }
        }
        return;
    }
}
