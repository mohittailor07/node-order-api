const mongoose = require('mongoose');
const server = require('./server');
const config = require('./config/config');

let app;

mongoose.connect(config.mongoose.url).then(() => {
  console.log('Connected to MongoDB');
  app = server.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`);
  });
});

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
