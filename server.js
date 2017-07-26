const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

var fs = require('fs');
var util = require('util');

const port = 666;
const app = express();

var server = require('http').Server(app);

const io = require('socket.io').listen(server);

const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));
app.get('*', function response(req, res) {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
  res.end();
});

server.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

var userId = 1;
var userCount = 0;

io.on('connection', function(socket){

  socket.on('user:request', function(msg) {
    userCount++;
    socket.emit('user:accept', { id : userId, users : userCount });
    userId++;
    socket.broadcast.emit('user:join');
  });

  socket.on('send:message', function(msg) {
    io.emit('send:message', msg);
  });

  socket.on('disconnect', function(msg) {
    socket.broadcast.emit('user:left', msg);
    userCount--;
  })

});
