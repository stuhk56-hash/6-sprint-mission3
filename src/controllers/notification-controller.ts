import type { Request, Response } from "express";
import { create, object, coerce, number, string } from "superstruct";
import * as notificationService from "../services/notification-service.js";
import type { AuthRequest } from "../middlewares/authenticate.js";

const IdParamsStruct = object({
  id: coerce(number(), string(), (value) => parseInt(value, 10)),
});

export async function readNotification(req: Request, res: Response) {
  const { id } = create(req.params, IdParamsStruct);
  await notificationService.readNotificationById(
    id,
    (req as AuthRequest).user?.id
  );
  res.status(204).send();
}

