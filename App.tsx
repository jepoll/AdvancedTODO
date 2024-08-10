import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Appbar } from 'react-native-paper';
import { format } from 'date-fns';

import { Text } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import ListScreen from './screens/ListScreen';
import ProfileScreen from './screens/ProfileScreen';
import { RootStackParamList } from './src/types';
import { PaperProvider } from 'react-native-paper';


const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();


const CustomHeader = () => {
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  
  return (
    <Appbar.Header style={{ backgroundColor: '#19196f' }}>
      <Appbar.Content title="To-Do." titleStyle={{ color: '#fff', fontSize: 24, fontWeight: 'bold'}} />
      <Text style={{ color: '#fff', marginRight: 10, fontWeight: 'bold' }}>{currentDate}</Text>
    </Appbar.Header>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="List">
    <Drawer.Screen
      name="List"
      component={ListScreen}
      options={{
        header: () => <CustomHeader />,
      }}
    />
  </Drawer.Navigator>
  );
};


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="Home"
            component={DrawerNavigator}
            options={{headerShown:false}}
          />
        </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
