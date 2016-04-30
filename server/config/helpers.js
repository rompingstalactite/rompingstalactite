module.exports = {
  postgresConnection: {
    host: process.env.DB_URL || 'localhost', // server name or IP address;
    user: process.env.DB_USER || 'admin',
    // password: process.env.DB_PASSWORD || undefined,
    port: 5432,
    database: 'recipes',
  },
};
