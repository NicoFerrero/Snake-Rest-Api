import { Document } from 'mongoose';

export default interface userInterface extends Document {
    name: String;
    lastName: String;
    email: String;
    password: String;
    _id: String;
    roles: String[];

    encryptPassword(password: string): Promise<string>;

    comparePasswords(password: string, receivedPassword: string): Promise<boolean>;
}
