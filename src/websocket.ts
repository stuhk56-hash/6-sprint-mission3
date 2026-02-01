import { Server as HttpServer } from "http";
import { Server as SocketIoServer } from "socket.io";
import { Application } from "express";
import { initializeSocket } from "./utils/socketHandler.js";

let io: SocketIoServer;

export const setupWebSocket = (server: HttpServer, app: Application) => {
  io = new SocketIoServer(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      credentials: true,
    },
  });

  app.set("io", io);

  initializeSocket(io);

  return io;
};

export const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
