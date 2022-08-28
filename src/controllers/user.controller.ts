import { Request, Response } from 'express';
import User from '../models/user.model';
import Role from '../models/role.model';

export default class UserController {
    constructor() {}

    static async getUsers(req: Request, res: Response) {
        const { page, limit } = req.query;
        try {
            const pageInt = Number(page);
            const limitInt = Number(limit);
            if (Number.isInteger(pageInt) === false && Number.isInteger(limitInt) === false) {
                return res.json({ users: [], error: 'La pagina o el limite deben ser numericos' });
            }
            if (pageInt < 0 && limitInt < 0) {
                return res.json({ users: [], error: 'La pagina o el limite no pueden ser menores que 1' });
            }
            const users = await User.find()
                .skip(pageInt * limitInt)
                .limit(limitInt);
            return res.json({ users, error: '' });
        } catch (error) {
            console.log(error);
        }
    }

    static async getUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.json({ user: null, error: 'El usuario no existe' });
            }
            return res.json({ user, error: '' });
        } catch (error) {
            console.log(error);
        }
    }

    static async CreateUser(req: Request, res: Response) {
        const { name, lastName, email, password, roles } = req.body;
        try {
            const userFound = await User.findOne({ email });
            if (userFound) {
                return res.json({ user: null, error: 'Ya existe un usuario creado con ese email' });
            }
            const user = new User({ name, lastName, email, password: '' });
            user.password = await user.encryptPassword(password);
            if (roles) {
                const foundRoles = await Role.find({ name: { $in: roles } });
                user.roles = foundRoles.map((role) => role._id);
            } else {
                const role = await Role.findOne({ name: 'user' });
                if (role) {
                    user.roles = [role._id];
                }
            }
            const savedUser = await user.save();
            return res.json({ user: savedUser, error: '' });
        } catch (error) {
            console.log('error', error);
        }
    }
}
