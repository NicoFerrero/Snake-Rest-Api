import mongoose from 'mongoose';
import databaseInterface from '../models/database.interface';

export default class mongoDB implements databaseInterface {
    async connect(): Promise<void> {
        try {
            const db = await mongoose.connect(`${process.env.MONGO_URI}`);
            console.log(`Connected to ${db.connection.name} collection`);
        } catch (error) {
            console.log(error);
        }
    }
}
