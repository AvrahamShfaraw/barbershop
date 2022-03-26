// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { View } from 'react-native';
// import { RootStackParamList } from './types';
import { StyleSheet } from 'react-native';
import { Routes } from './router/Routes';

// const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Routes />
      </View>
    </View>
  );

}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    heghit: 'auto'
  },
  wrapper: {
    flex: 1,
    padding: 100,
    backgroundColor: '#F5FCFF',
    widht: 'auto%'
  }
})