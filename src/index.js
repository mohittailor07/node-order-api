const mongoose = require('mongoose');
const server = require('./server');
const config = require('./config/config');
const connectionConfig = require('./config/connection');

let app;

const selfCallDBConnect = async () => {
  console.log('-----selfCallDBConnect-------')
  
  var connectionInfo = await connectionConfig.getConnectionInfo();

// mongoose.connect(config.mongoose.url).then(() => {
  mongoose.connect(connectionInfo.DATABASE_URL).then(() => {
    console.log('Connected to MongoDB');
    app = server.listen(config.port, () => {
      console.log(`Listening to port ${config.port}`);
    });
  }).catch((error) => {
    console.error(error)
  });
}

selfCallDBConnect();


const exitHandler = () => {
  if (app) {
    app.close(() => {
      console.log('Appliacation closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (app) {
    app.close();
  }
});
