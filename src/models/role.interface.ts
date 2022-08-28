import { Document } from 'mongoose';

export default interface roleInterface extends Document {
    name: String;
    _id: String;
}
