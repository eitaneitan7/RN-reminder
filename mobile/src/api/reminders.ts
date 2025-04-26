import api from './client';

export const fetchReminders = async () => {
  const res = await api.get('/reminders');
  return res.data;
};

export const completeReminder = async (id: string) => {
  const res = await api.patch(`/reminders/${id}/complete`);
  return res.data;
};

export const snoozeReminder = async (id: string, snoozeMinutes: number) => {
  const res = await api.patch(`/reminders/${id}/snooze`, {snoozeMinutes});
  return res.data;
};
