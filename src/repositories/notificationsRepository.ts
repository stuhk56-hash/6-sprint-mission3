import prisma from '../lib/prisma-client.js';
import { Notification } from '../types/notification.js';
import { CursorPaginationParams } from '../types/pagination.js';

export async function getNotificationsByUserId(userId: number, params: CursorPaginationParams) {
  const { cursor, limit } = params;
  const where = {
    userId,
  };
  const notificationsWithCursor = await prisma.notification.findMany({
    cursor: cursor ? { id: cursor } : undefined,
    take: limit + 1,
    where,
    orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
  });
  const totalCount = await prisma.notification.count({ where });
  const unreadCount = await prisma.notification.count({ where: { ...where, read: false } });
  const notifications = notificationsWithCursor.slice(0, limit);
  const cursorNotification = notificationsWithCursor[notificationsWithCursor.length - 1];
  const nextCursor = cursorNotification ? cursorNotification.id : null;
  return { notifications, totalCount, unreadCount, nextCursor };
}

export async function createNotification(
  data: Omit<Notification, 'id' | 'createdAt' | 'updatedAt'>,
) {
  const notification = await prisma.notification.create({
    data,
  });
  return notification;
}

export async function createNotifications(
  data: Omit<Notification, 'id' | 'createdAt' | 'updatedAt'>[],
) {
  await prisma.notification.createMany({
    data,
  });
}

export async function getNotificationById(id: number) {
  const notification = await prisma.notification.findUnique({
    where: { id },
  });
  return notification;
}

export async function updateNotificationById(id: number, data: Partial<Notification>) {
  await prisma.notification.update({
    where: { id },
    data,
  });
}

export async function updateNotificationsByUserId(userId: number, data: Partial<Notification>) {
  await prisma.notification.updateMany({
    where: { userId },
    data,
  });
}
