import { Sequelize } from 'sequelize';
import { env } from "./env";

const sequelize = new Sequelize({
 dialect: 'postgres',
 host: env.db.host,
 username: env.db.user,
 password: env.db.password,
 database: env.db.database,
});

export default sequelize;