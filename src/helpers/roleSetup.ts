import Role from '../models/role.model';

export default class roleSetup {
    constructor() {}

    static async createRoles() {
        try {
            const count = await Role.estimatedDocumentCount();
            if (count > 0) return;
            await Promise.all([new Role({ name: 'user' }).save(), new Role({ name: 'admin' }).save()]);
        } catch (error) {
            console.log(error);
        }
    }
}
