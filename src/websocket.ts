import { Server as HttpServer } from "http";
import { Server as SocketIoServer } from "socket.io";
import { Application } from "express";

let io: SocketIoServer;

export const setupWebSocket = (server: HttpServer, app: Application) => {
  io = new SocketIoServer(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      credentials: true,
    },
  });

  app.set("io", io);

  io.on("connection", (socket: any) => {
    console.log("A user connected");

    socket.on("join_room", (roomName: string) => {
      socket.join(roomName);
      console.log(`Socket ${socket.id} joined room ${roomName}`);
    });

    socket.on("leave_room", (roomName: string) => {
      socket.leave(roomName);
      console.log(`Socket ${socket.id} left room ${roomName}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};

export const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
