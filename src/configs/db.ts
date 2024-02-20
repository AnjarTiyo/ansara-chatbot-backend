import { Sequelize, Transaction } from "sequelize";

async function connectDb() {
  const dbName = process.env.DB_NAME;
  const dbUser = process.env.DB_USER;
  const dbPass = process.env.DB_PASS;
  const dbHost = process.env.DB_HOST;
  const dbPort = process.env.DB_PORT;

  if (!dbName || !dbUser || !dbPass || !dbHost || !dbPort) {
    throw new Error(
      "One or more required environment variables are not defined."
    );
  }

  const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    port: parseInt(dbPort),
    dialect: "postgres",
    logging: false,
    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
  });

  try {
    await sequelize.authenticate();
    console.log("Connection to database was successful!");
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }

  return sequelize;
}

export default connectDb;
