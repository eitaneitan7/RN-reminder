import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RemindersService {
  constructor(private prisma: PrismaService) {}

  async createReminder(userId: string, title: string, time: Date) {
    return this.prisma.reminder.create({
      data: {
        title,
        time,
        userId,
      },
    });
  }

  async getUserReminders(userId: string) {
    return this.prisma.reminder.findMany({
      where: { userId },
      orderBy: { time: 'asc' },
    });
  }

  async getReminderById(userId: string, id: string) {
    const reminder = await this.prisma.reminder.findUnique({
      where: { id },
    });

    if (!reminder || reminder.userId !== userId) {
      throw new NotFoundException('Reminder not found');
    }

    return reminder;
  }

  async deleteReminder(userId: string, id: string) {
    const reminder = await this.prisma.reminder.findUnique({
      where: { id },
    });

    if (!reminder || reminder.userId !== userId) {
      throw new NotFoundException('Reminder not found');
    }

    return this.prisma.reminder.delete({ where: { id } });
  }
  async markAsCompleted(userId: string, id: string) {
    await this.getReminderById(userId, id);

    return this.prisma.reminder.update({
      where: { id },
      data: { completed: true },
    });
  }

  async snoozeReminder(userId: string, id: string, snoozeMinutes: number) {
    const reminder = await this.getReminderById(userId, id);

    const now = new Date();
    const snoozedUntil = new Date(now.getTime() + snoozeMinutes * 60 * 1000);

    return this.prisma.reminder.update({
      where: { id },
      data: {
        snoozedUntil,
      },
    });
  }
}
