const validRoom = (rooms) => {
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

const isUserInRoom = (socket, rooms) => {
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

module.exports = { validRoom, isUserInRoom }