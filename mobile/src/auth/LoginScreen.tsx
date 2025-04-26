import React, {useState, useContext} from 'react';
import {View, TextInput, Button, Text, Alert} from 'react-native';
import {loginUser} from '../api/auth';
import {AppContext} from '../context/AppContext';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AppContext);

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);
      login(data.token);
    } catch (err) {
      Alert.alert('Login Failed', 'Invalid credentials');
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
      <Button title="Login" onPress={handleLogin} />
      <Text
        onPress={() => navigation.navigate('Register')}
        style={{marginTop: 20, color: 'blue'}}>
        Don't have an account? Register
      </Text>
    </View>
  );
};

export default LoginScreen;
