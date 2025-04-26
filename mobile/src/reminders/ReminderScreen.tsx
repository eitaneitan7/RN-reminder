import {format} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {Alert, Button, FlatList, Text, View} from 'react-native';
import {
  completeReminder,
  fetchReminders,
  snoozeReminder,
} from '../api/reminders';

const ReminderScreen = () => {
  const [reminders, setReminders] = useState([]);

  const loadReminders = async () => {
    try {
      const data = await fetchReminders();
      setReminders(data);
    } catch (err) {
      Alert.alert('Error', 'Failed to load reminders');
    }
  };

  useEffect(() => {
    loadReminders();
  }, []);

  const handleComplete = async (id: string) => {
    await completeReminder(id);
    loadReminders();
  };

  const handleSnooze = async (id: string) => {
    // Just snoozes for 30 mins for now
    await snoozeReminder(id, 30);
    loadReminders();
  };

  const renderItem = ({item}: any) => (
    <View style={{padding: 10, borderBottomWidth: 1}}>
      <Text>{item.title}</Text>
      <Text>{format(new Date(item.time), 'PPpp')}</Text>
      <Text>Importance: {item.importance}</Text>
      <Text>Status: {item.completed ? 'Completed' : 'Active'}</Text>
      {item.snoozedUntil && (
        <Text>
          Snoozed Until: {format(new Date(item.snoozedUntil), 'PPpp')}
        </Text>
      )}
      <View style={{flexDirection: 'row', marginTop: 5}}>
        {!item.completed && (
          <>
            <Button title="Complete" onPress={() => handleComplete(item.id)} />
            <View style={{width: 10}} />
            <Button title="Snooze 30m" onPress={() => handleSnooze(item.id)} />
          </>
        )}
      </View>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={reminders}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        onRefresh={loadReminders}
        refreshing={false}
      />
    </View>
  );
};

export default ReminderScreen;
