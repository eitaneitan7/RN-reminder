import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('reminders')
export class RemindersController {
  constructor(private remindersService: RemindersService) {}

  @Post()
  create(@Body() body: { title: string; time: string }, @GetUser() user: any) {
    const parsedTime = new Date(body.time);
    return this.remindersService.createReminder(
      user.userId,
      body.title,
      parsedTime,
    );
  }

  @Get()
  findAll(@GetUser() user: any) {
    return this.remindersService.getUserReminders(user.userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @GetUser() user: any) {
    return this.remindersService.deleteReminder(user.userId, id);
  }
  @Patch(':id/complete')
  complete(@Param('id') id: string, @GetUser() user: any) {
    return this.remindersService.markAsCompleted(user.userId, id);
  }

  @Patch(':id/snooze')
  snooze(
    @Param('id') id: string,
    @Body('snoozeMinutes') snoozeMinutes: number,
    @GetUser() user: any,
  ) {
    return this.remindersService.snoozeReminder(user.userId, id, snoozeMinutes);
  }
}
