module.exports = (mongoose, config) => {
  const database = mongoose.connection;
  mongoose.Promise = Promise;
  mongoose.connect(config.database, {
    useNewUrlParser: true,
    promiseLibrary: global.Promise
  });
  database.on('error', error => console.log(`Connection to AskOracle database failed: ${error}`));
  database.on('connected', () => console.log('Connected to AskOracle database'));
  database.on('disconnected', () => console.log('Disconnected from AskOracle database'));
  process.on('SIGINT', () => {
    database.close(() => {
      console.log('AskOracle terminated, connection closed');
      process.exit(0);
    })
  });
};
