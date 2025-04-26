import React, {useContext, useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {View, Text, ActivityIndicator} from 'react-native';
import {AppContext} from '../context/AppContext';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const Boot = () => {
  const {isLoggedIn} = useContext(AppContext);
  const [internetConnected, setInternetConnected] = useState(true);
  const [checkingConnection, setCheckingConnection] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setInternetConnected(state.isConnected ?? true);
      setCheckingConnection(false);
    });
    return () => unsubscribe();
  }, []);

  if (checkingConnection) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!internetConnected) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No Internet Connection</Text>
      </View>
    );
  }

  return isLoggedIn ? <MainNavigator /> : <AuthNavigator />;
};

export default Boot;
