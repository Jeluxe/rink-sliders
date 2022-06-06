const io = require('./app');
const { validRoom, isUserInRoom } = require('./services/functions');

let rooms = [];

io.on('connection', (socket) => {
    socket.on('join room', (username, color, cb) => {
        if (isUserInRoom(socket, rooms)) {
            cb('error', 'join room err:' + ' cannot join another room');
        } else {
            const newRoom = validRoom(rooms);
            socket.username = username;
            socket.color = color;

            newRoom.users.push({ username: socket.username, color: socket.color, id: socket.id });
            if (!rooms.find(room => room.id === newRoom.id)) {
                rooms.push(newRoom);
            }
            cb('room', username);
            socket.join(newRoom.id);
            io.to(newRoom.id).emit(`joined the room`, { usersLen: newRoom.users.length, id: newRoom.id });
            console.log(`${socket.username} has connected`);
        }
    })

    socket.on('move to game', () => {
        const room = isUserInRoom(socket, rooms);
        if (room && room.users.length === 2) {
            room.status = 'started'
            io.to(room.id).emit('move to game', room.id)
        }
    });

    socket.on('starting game', (roomID) => {
        const room = isUserInRoom(socket, rooms);
        if (room && room.users.length === 2) {
            io.to(roomID).emit('getting data', room.users);
        }
    })

    socket.on('move player', (player) => {
        const room = isUserInRoom(socket, rooms);
        if (room && room.users.length === 2) {
            io.to(room.id).emit('player moving', player);
        }
    });

    socket.on('move slider', (slider) => {
        const room = isUserInRoom(socket, rooms);
        if (room && room.users.length === 2) {
            io.to(room.id).emit('slider moving', slider);
        }
    });

    socket.on('change turn', (lastTurn) => {
        const room = isUserInRoom(socket, rooms);
        if (room && room.users.length === 2) {
            io.to(room.id).emit('changing turn', lastTurn);
        }
    })

    socket.on('set winner', (winner) => {
        const room = isUserInRoom(socket, rooms);
        if (room && room.users.length === 2) {
            io.to(room.id).emit('winner', winner);
        }
    })

    socket.on('rematch', (player) => {
        const room = isUserInRoom(socket, rooms);
        if (room && room.users.length === 2) {
            io.to(room.id).emit('rematching', player);
        }
    });

    socket.on('leave', (player) => {
        const room = isUserInRoom(socket, rooms);
        if (room && room.users.length === 2) {
            io.to(room.id).emit('leaving', player);
        } else {
            room.users = room.users.filter(user => user.id !== socket.id);
            if (room.users.length === 0) {
                delete rooms[room.id];
            }
        }
    });

    socket.on('check-player', (playerID, cb) => {
        if (socket.id === playerID) {
            cb(true);
        } else {
            cb(false);
        }
    });

    socket.on('game over', () => {
        if (socket) {
            const room = isUserInRoom(socket, rooms);
            if (room) {
                delete rooms[room.id];
            }
        }
    });

    socket.on('disconnect', () => {
        const room = isUserInRoom(socket, rooms);
        if (room) {
            room.users = room.users.filter(user => user.id !== socket.id);
            io.to(room.id).emit('user disconnected', `user ${socket.username} has disconnected`);
            socket.disconnect();
        }
    });
});