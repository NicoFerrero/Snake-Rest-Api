import { Request, Response } from 'express';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import Role from '../models/role.model';

export default class authController {
    constructor() {}
    static async signUp(req: Request, res: Response) {
        const { name, lastName, email, password } = req.body;
        try {
            const userFound = await User.findOne({ email });
            if (userFound) {
                return res.json({ user: null, error: 'Ya existe un usuario creado con ese email' });
            }
            const user = new User({ name, lastName, email, password: '' });
            user.password = await user.encryptPassword(password);
            const role = await Role.findOne({ name: 'user' });
            if (role) {
                user.roles = [role._id];
            }
            const savedUser = await user.save();
            const token = jwt.sign({ id: savedUser._id, roles: user.roles }, process.env.SECRET_JWT as string, {
                expiresIn: 84600, //24hs
            });
            return res.json({ token, error: '' });
        } catch (error) {
            console.log('error', error);
        }
    }

    static async signIn(req: Request, res: Response) {
        const { email, password } = req.body;
        const userFound = await User.findOne({ email }).populate('roles');
        if (!userFound) return res.json({ token: '', eeror: 'Las credenciales no son valdas' });
        const matchPassword = await userFound.comparePasswords(password, userFound.password as string);
        if (!matchPassword) return res.json({ token: '', eeror: 'Las credenciales no son valdas' });
        const token = jwt.sign({ id: userFound._id, roles: userFound.roles }, process.env.SECRET_JWT as string, {
            expiresIn: 84600, //24hs,
        });
        return res.json({ token, error: '' });
    }
}
