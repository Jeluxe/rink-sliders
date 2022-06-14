const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join('public')));

app.get('/*', function (req, res) {
    res.sendFile(path.join('public', 'index.html'));
});

let rooms = [];

io.on('connection', (socket) => {
    socket.on('join room', (username, cb) => {
        if (isUserInRoom(socket)) {
            cb('error', 'join room err:' + ' cannot join another room');
        } else {
            const newRoom = validRoom();
            socket.username = username;

            newRoom.users.push({ username: socket.username, id: socket.id });
            if (!rooms.find(room => room.id === newRoom.id)) {
                rooms.push(newRoom);
            }

            socket.join(newRoom.id);
            cb('room', newRoom);
            io.to(newRoom.id).emit(`joined the room`, { usersLen: newRoom.users.length, id: newRoom.id });
            console.log(`${socket.username} has connected`);
        }
    })

    socket.on('move to game', () => {
        const room = isUserInRoom(socket);
        if (room && room.users.length === 2) {
            room.status = 'started'
            io.to(room.id).emit('move to game', room.id)
        }
    });

    socket.on('starting game', (roomID) => {
        const room = isUserInRoom(socket);
        if (room && room.users.length === 2) {
            io.to(roomID).emit('getting data', room.users);
        }
    })

    socket.on('move player', (player) => {
        const room = isUserInRoom(socket);
        if (room && room.users.length === 2) {
            io.to(room.id).emit('player moving', player);
        }
    });

    socket.on('move slider', (slider) => {
        const room = isUserInRoom(socket);
        if (room && room.users.length === 2) {
            io.to(room.id).emit('slider moving', slider);
        }
    });

    socket.on('change turn', (nextTurn) => {
        const room = isUserInRoom(socket);
        if (room && room.users.length === 2) {
            io.to(room.id).emit('changing turn', nextTurn);
        }
    })

    socket.on('set winner', (winner) => {
        const room = isUserInRoom(socket);
        if (room && room.users.length === 2) {
            io.to(room.id).emit('winner', winner);
        }
    })

    socket.on('rematch', (player) => {
        const room = isUserInRoom(socket);
        if (room && room.users.length === 2) {
            io.to(room.id).emit('rematching', player);
        }
    });

    socket.on('leave', (player) => {
        const room = isUserInRoom(socket);
        if (room && room.users.length === 2) {
            io.to(room.id).emit('leaving', player);
        }
    });

    socket.on('check-player', (playerID, cb) => {
        if (socket.id === playerID) {
            cb(true);
        } else {
            cb(false);
        }
    });

    socket.on('clear room', () => {
        if (socket) {
            const room = isUserInRoom(socket);
            io.to(room.id).emit('clear room')
            if (room) {
                delete rooms[room.id];
            }
        }
    });

    socket.on('disconnect', () => {
        const room = isUserInRoom(socket);
        if (room) {
            room.users = room.users.filter(user => user.id !== socket.id);
            io.to(room.id).emit('user disconnected', `user ${socket.username} has disconnected`);
            socket.disconnect();
        }
    });
});

server.listen(PORT, () => {
    console.log(`server is on port: ${PORT} \n Link: http://localhost:${PORT}`);
});

const validRoom = () => {
    let room = rooms.find((room) => {
        try {
            if (room.users && room.users.length < 2) {
                return room;
            }
        } catch (error) {
            console.log(error)
        }
    })
    if (!room) {
        room = {
            id: `${rooms.length}`,
            status: 'not started',
            users: []
        }
    }
    return room;
}

const isUserInRoom = (socket) => {
    const foundRoom = rooms.find(room => {
        if (room && room.users && room.users.find(user => user.id === socket.id)) {
            return room;
        }
    })
    if (foundRoom) {
        return foundRoom;
    } else {
        return false;
    }
}