'use strict';
const koa = require('koa');
const http = require('http');
const io = require('socket.io');
const route = require('koa-route');
const mongoose = require('mongoose');
const errorHandleMiddle = require('./util/error');
const ioController = require('./io');
const config = require('./config/env');
const app = koa();


const host = config.mongo.host;
const dbOptions = {
  user: config.mongo.options.user,
  pass: config.mongo.options.pass
}

if (process.env.NODE_ENV === 'dev') {
  mongoose.connect(`mongodb://${host}:27017/wall`);
} else {
  mongoose.connect(`mongodb://${host}:27017/wall`, dbOptions);
}

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ');
})

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
})

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
})

//mongodb promise style
mongoose.Promise = require('bluebird');

//error handle middleware
app.use(errorHandleMiddle());

//koa config
require('./config/koa')(app);

//route
require('./router')(app);

//错误监听
app.on('error', (err, ctx)=> {
  if (process.env.NODE_ENV != 'test') {
    console.error('error', err);
  }
});


if (!module.parent) {
  // app.listen(config.port)(io);
  // app.listen(config.port);
  const server = http.Server(app.callback())
  ioController(server);
  server.listen(config.port);
  console.log(`listening on port ${config.port}`);
}

module.exports = app;
