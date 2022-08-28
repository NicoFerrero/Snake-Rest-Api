import { Schema, model } from 'mongoose';
import roleInterface from './role.interface';

const roleSchema = new Schema<roleInterface>(
    {
        name: { type: String, required: true },
    },
    {
        versionKey: false,
    },
);

export default model<roleInterface>('Role', roleSchema);
