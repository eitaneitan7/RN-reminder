import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RemindersScreen from '../reminders/ReminderScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false, animation: 'slide_from_left'}}>
    <Stack.Screen name="Reminders" component={RemindersScreen} />
  </Stack.Navigator>
);

export default MainNavigator;
