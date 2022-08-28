import { Schema, model } from 'mongoose';
import userInterface from './user.interface';
import bcrypt from 'bcryptjs';

const userSchema = new Schema<userInterface>(
    {
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        roles: [
            {
                ref: 'Role',
                type: Schema.Types.ObjectId,
            },
        ],
    },
    {
        versionKey: false,
    },
);

userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.methods.comparePasswords = async (password: string, receivedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, receivedPassword);
};

export default model<userInterface>('User', userSchema);
