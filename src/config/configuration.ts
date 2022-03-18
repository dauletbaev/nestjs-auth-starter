export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    uri: process.env.MONGODB_CONNECTION_STRING,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
