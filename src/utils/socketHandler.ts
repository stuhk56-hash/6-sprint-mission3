import { Server, Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/error";
import { authenticate } from "../services/user-service.js";
import User from "../types/User.js";

declare module "socket.io" {
  interface Socket {
    user?: User;
  }
}

const socketAuthMiddleware = async (
  socket: Socket,
  next: (err?: ExtendedError) => void,
) => {
  const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new Error("Authentication error: Token not provided"));
  }

  try {
    const user = await authenticate(token);
    if (!user) {
      return next(new Error("Authentication error: Invalid token"));
    }
    socket.user = user;
    next();
  } catch (error) {
    next(new Error("Authentication error: " + (error as Error).message));
  }
};

export const initializeSocket = (io: Server) => {
  io.use(socketAuthMiddleware);

  io.on("connection", (socket: Socket) => {
    console.log(`User connected: ${socket.id}, user ID: ${socket.user?.id}`);

    if (socket.user) {
      socket.join(socket.user.id.toString());
    }

    socket.on("join_room", (roomName: string) => {
      socket.join(roomName);
      console.log(`Socket ${socket.id} joined room ${roomName}`);
    });

    socket.on("leave_room", (roomName: string) => {
      socket.leave(roomName);
      console.log(`Socket ${socket.id} left room ${roomName}`);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};