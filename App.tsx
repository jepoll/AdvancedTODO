import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { StyleSheet } from 'react-native';


import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerScreenProps } from '@react-navigation/drawer';
import { Appbar, FAB } from 'react-native-paper';
import { format } from 'date-fns';

import { Text, View } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import ListScreen from './screens/ListScreen';
import ProfileScreen from './screens/ProfileScreen';
import { DrawerParamList, ProfileScreenPropsStack, RootStackParamList } from './src/types';
import { PaperProvider } from 'react-native-paper';


const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();


const CustomHeader = () => {
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  
  return (
    <Appbar.Header style={{ backgroundColor: '#19196f' }}>
      <Appbar.Content title="To-Do." titleStyle={{ color: '#fff', fontSize: 24, fontWeight: 'bold'}} />
      <Text style={{ color: '#fff', marginRight: 10, fontWeight: 'bold' }}>{currentDate}</Text>
    </Appbar.Header>
  );
};

const DrawerNavigator: React.FC<ProfileScreenPropsStack> = ({ navigation }) => {
  return (
    <Drawer.Navigator initialRouteName='List'>
    <Drawer.Screen
      name="List"
      component={ListScreen}
      options={{
        header: () => <CustomHeader />,
        drawerLabel: () => null
      }}
    />
    <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{headerShown: false}} 
      />  </Drawer.Navigator>
    );
};


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          {/* <Stack.Screen
            name="List"
            component={DrawerNavigator}
            options={{headerShown:false}}
          /> */}
        </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Расположить кнопку внизу
    alignItems: 'flex-end', // Расположить кнопку справа
    margin: 16, // Отступы от краев
  },
  fab: {
    backgroundColor: '#6200ee', // Цвет кнопки
  },
});

export default App;

