export const development = {
  client: "sqlite3",
  connection: {
    filename: "./dev.sqlite3",
  },
  useNullAsDefault: true,
  migrations: {
    directory: "./migrations",
    tableName: "knex_migrations",
  },
};

export const staging = {
  client: "postgresql",
  connection: {
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "my_db",
    user: process.env.DB_USER || "username",
    password: process.env.DB_PASS || "password",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: "./migrations",
    tableName: "knex_migrations",
  },
};

export const production = {
  client: "postgresql",
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    ssl: { rejectUnauthorized: false }, // SSL para hospedagens como Heroku
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: "./migrations",
    tableName: "knex_migrations",
  },
};
