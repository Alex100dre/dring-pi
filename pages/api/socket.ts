import type { Server as HTTPServer } from 'http'
import { Server as IOServer } from 'socket.io'
import type { Socket as NetSocket } from 'net'
import {NextApiRequest, NextApiResponse} from "next";
import { Server } from "socket.io";

// interface SocketServer extends HTTPServer {
//     io?: IOServer | undefined
// }
//
// interface SocketWithIO extends NetSocket {
//     server: SocketServer
// }
//
// interface NextApiResponseWithSocket extends NextApiResponse {
//     socket: SocketWithIO
// }
// export default async (req: NextApiRequest, res: NextApiResponseWithSocket) => {
//     if (!res.socket.server.io) {
//         console.log("New Socket.io server...");
//         // adapt Next's net Server to http Server
//         const httpServer: HTTPServer = res.socket.server as any;
//         const io = new IOServer(httpServer, {
//             path: "/api/socketio",
//         });
//         // append SocketIO server to Next.js socket server response
//         res.socket.server.io = io;
//         io.on('connection', socket => {
//             socket.on('door.open', msg => {
//                 socket.broadcast.emit('door.opened')
//                 setTimeout( () => {
//                     socket.broadcast.emit('door.closed')
//                 }, 3000)
//             })
//         })
//     }
//     res.end();
// };

// @ts-ignore
export default function SocketHandler(req, res) {
    if (res.socket.server.io) {
        console.log("Already set up");
        res.end();
        return;
    }

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
        socket.on("door.open", () => {
            io.emit("door.opened");
            setTimeout( () => {
                    socket.broadcast.emit('door.closed')
                }, 3000)
        });
    });

    console.log("Setting up socket");
    res.end();
}