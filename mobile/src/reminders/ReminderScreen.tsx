import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {AppContext} from '../context/AppContext';

const RemindersScreen = () => {
  const {logout} = useContext(AppContext);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Reminders will go here</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default RemindersScreen;
