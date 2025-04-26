import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Boot from './src/navigation/Boot';
import {AppProvider} from './src/context/AppContext';

const App = () => (
  <AppProvider>
    <NavigationContainer>
      <Boot />
    </NavigationContainer>
  </AppProvider>
);

export default App;
