import databaseInterface from './models/database.interface';

export default class Database {
    databaseEngine: databaseInterface;

    constructor(engine: databaseInterface) {
        this.databaseEngine = engine;
    }

    connect(): void {
        this.databaseEngine.connect();
    }
}
