//Archivo usado para iniciar la Api

import Server from './app';
import Database from './database';
import mongoDB from './controllers/mongoDatabase.controller';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({
    path: path.resolve(__dirname, './.env'),
});

const server = new Server();
const db = new Database(new mongoDB());

db.connect();

server.initializeRoles()

server.configMiddelwares();

server.configRoutes();

server.start();
