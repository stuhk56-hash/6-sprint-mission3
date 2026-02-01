import { getIo } from "../websocket.js";
import { Notification } from "../types/notification.js";

class SocketService {
  sendNotification(notification: Notification) {
    const io = getIo();
    const userId = notification.userId;
    io.to(userId.toString()).emit("notification", notification);
  }
}

export default new SocketService();
