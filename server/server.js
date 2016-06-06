const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');


// serving index.html on client side
// You do not need to use app.get('/'...) because it is taken care of by ReactRouter
app.use(express.static('./client'));
app.use('/scripts', express.static(__dirname + '/../node_modules/bootstrap/dist/'));
app.use('/scripts', express.static(__dirname + '/../node_modules/jquery/dist/'));
app.use('/scripts', express.static(__dirname + '/../node_modules/react/dist/'));
app.use('/scripts', express.static(__dirname + '/../node_modules/react-dom/dist/'));
app.use('/scripts', express.static(__dirname + '/../node_modules/react-router/umd/'));
require('./routes/middleware.js')(app, express);

require('./routes/routes.js')(app, express);

require('./routes/socketio.js')(app, express, http, io);

//  everything else goes to react
app.get('*', function (req, res) {
  // and drop 'public' in the middle of here
  res.sendFile(path.join(__dirname, '/../compiled', 'index.html'));
});


const port = process.env.PORT || 4568;

http.listen(port, () => {
  console.log('Music happening on =>', port);
});

//  to allow supertest to work.
module.exports = app;
