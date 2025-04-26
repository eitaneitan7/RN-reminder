import React, {useState, useContext} from 'react';
import {View, TextInput, Button, Text, Alert} from 'react-native';
import {registerUser} from '../api/auth';
import {AppContext} from '../context/AppContext';

const RegisterScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AppContext);

  const handleRegister = async () => {
    try {
      const data = await registerUser(email, password);
      login(data.token);
    } catch (err) {
      Alert.alert('Registration Failed', 'User might already exist');
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{borderWidth: 1, marginBottom: 10}}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={{borderWidth: 1, marginBottom: 10}}
      />
      <Button title="Register" onPress={handleRegister} />
      <Text
        onPress={() => navigation.navigate('Login')}
        style={{marginTop: 20, color: 'blue'}}>
        Already have an account? Login
      </Text>
    </View>
  );
};

export default RegisterScreen;
