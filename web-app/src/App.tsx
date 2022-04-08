// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ActivityIndicator, ImageBackground, Text, View } from 'react-native';
// import { RootStackParamList } from './types';
import { StyleSheet } from 'react-native';
import { Routes } from './router/Routes';
import { observer } from 'mobx-react-lite';
import { useStore } from './stores/store';
import Background from './component/Background';
import Logo from './component/Logo';
import Header from './component/Header';
import Paragraph from './component/Paragraph';
import { stylesRegister } from './style';
function App() {
  const { commonStore, userStore } = useStore();


  React.useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])


  if (!commonStore.appLoaded) return <View style={appStyles.container}>
    <Background>
      <Logo />
      <Header children={undefined}></Header>
      <Header children={undefined}></Header>
      <Header children={undefined}></Header>
      <Header children={undefined}></Header>
      <Header children={undefined}></Header>
      <Header children={undefined}></Header>
      <Header children={undefined}></Header>
      <ActivityIndicator size="large" color="red" />
      <Header children={undefined}></Header>
      <Text style={stylesRegister.link}>Salamon&Yehuda</Text>




    </Background>
  </View>

  return (
    <ImageBackground
      source={require('./assets/backgruondImage.png')}
    >
      <View style={appStyles.container}>

        <Routes />
      </View>
    </ImageBackground>
  );

}

export default observer(App);

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    padding: 100,
    widht: 'auto%'
  },

})