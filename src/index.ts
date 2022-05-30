import { createServer } from "http"
import { Server } from "socket.io";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './helpers/interfaces/socket-io'

const httpServer = createServer();
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer,  {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    socket.on('joinRoom', (room) => {
        socket.join(room)
        io.to(room).emit('userJoined', socket.id)
    })

    socket.on('getRooms', () => {
        // All fixed Rooms should be stored in the database

        // These are only all rooms where user are in
        socket.emit('rooms', Array.from(io.sockets.adapter.rooms.keys()))
    })

    socket.on('newMessage', (message, room) => {
        if (room !== undefined && room.length > 0) {
            io.to(room).emit('newMessage', message, socket.id, new Date())
        } else {
            io.emit('newMessage', message, socket.id, new Date())
        }
    })



    socket.on('changeField', (coordinateX, coordinateY, color) => {
        io.emit('setField', coordinateX, coordinateY, color, socket.id)

        const date = new Date();
        date.setMinutes(date.getMinutes() + 1)
        socket.emit('nextFieldChangePossible', date)
    })



    socket.on('ping', () =>  {
        // Sent back to user
        socket.emit('pong', "pongtext");

        // Sent to everyone exclude myselfe
        socket.broadcast.emit('pongAll', `pong by ${ socket.id }`);

        // Sent to everyone
        io.emit('pongAll', `all pong by ${ socket.id }`)
    })
});

httpServer.listen(3000)

console.log('started')