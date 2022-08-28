//Archivo usado para configurar la Rest Api

import express, { Express } from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import roleSetup from './helpers/roleSetup';

export default class Server {
    static app: Express;
    private url = '/api';

    constructor() {
        Server.app = express();
    }

    configMiddelwares() {
        Server.app.use(cors());
        Server.app.use(express.json());
        Server.app.use(express.urlencoded({ extended: false }));
    }

    configRoutes() {
        Server.app.use(`${this.url}/users`, userRoutes);
        Server.app.use(`${this.url}/auth`, authRoutes);
    }

    initializeRoles() {
        roleSetup.createRoles();
    }

    start() {
        Server.app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));
    }
}
