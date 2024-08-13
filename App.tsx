import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appbar } from 'react-native-paper';
import { format } from 'date-fns';

import { Text, TouchableOpacity } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import ListScreen from './screens/ListScreen';
import ProfileScreen from './screens/ProfileScreen';
import { RootStackParamList } from './src/types';
import { PaperProvider } from 'react-native-paper';
import { theme } from './src/theme';
import CreateEditTaskScreen from './screens/CreateEditTaskScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();


const CustomHeader = () => {
  const currentDate = format(new Date(), 'yyyy-MM-dd');

  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
      <Appbar.Content title="To-Do" titleStyle={{ color: theme.colors.text, fontSize: 24, fontWeight: 'bold' }} />
      <Text style={{ color: theme.colors.text, marginRight: 10, fontWeight: 'bold' }}>{currentDate}</Text>
    </Appbar.Header>
  );
};

// Define the type for the BackButton props
type BackButtonProps = { onPress: () => void}; 

// Custom back button component
const BackButton: React.FC<BackButtonProps> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
    <Text style={{ color: '#fff', fontWeight: 'bold' }}>{'<'} BACK</Text>
  </TouchableOpacity>
);


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="List"
              component={ListScreen}
              options={{ header: CustomHeader }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={({ navigation }) => ({
                headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
                headerStyle: { backgroundColor: 'transparent', elevation: 0 },
                headerTitle: '',
                headerShadowVisible: false,
                headerTransparent: true,
                headerTintColor: '#fff',
              })}
            />
            <Stack.Screen name="CreateEditTask" component={CreateEditTaskScreen} options={({ navigation }) => ({
                headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
                headerStyle: { backgroundColor: 'transparent', elevation: 0 },
                headerTitle: '',
                headerShadowVisible: false,
                headerTransparent: true,
                headerTintColor: '#fff',
              })} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;