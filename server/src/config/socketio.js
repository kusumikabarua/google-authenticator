const httpConfig = require("./httpConfig");
const io = require('socket.io')(httpConfig.http, {
    cors: {
      origins: ['http://localhost:4200']
    }
  });

  module.exports = io;