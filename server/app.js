const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



server.listen(PORT, () => {
    console.log(`server is on port: ${PORT} \n Link: http://localhost:${PORT}`);
});


module.exports = io;
require('./socket');