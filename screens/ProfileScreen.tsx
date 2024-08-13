import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, TextInput, DefaultTheme, PaperProvider, Switch } from 'react-native-paper';
import { AppDispatch, RootState } from '../src/redux/store';
import { logout, setTemperatureUnit } from '../src/redux/slices/userSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../src/types';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const theme = {
  ...DefaultTheme,
  roundness: 10, 
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { email, username, role, temperatureUnit } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleTemperatureUnitChange = () => {
    dispatch(setTemperatureUnit(temperatureUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius'));
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <TextInput value={username} mode="outlined" style={styles.input} disabled />
        <TextInput value={email} mode="outlined" style={styles.input} disabled />
        <TextInput value={role} mode="outlined" style={styles.input} disabled />
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Temperature Unit:</Text>
          <Switch
            value={temperatureUnit === 'Fahrenheit'}
            onValueChange={handleTemperatureUnitChange}
          />
          <Text style={styles.switchLabel}>
            {temperatureUnit === 'Celsius' ? 'Celsius' : 'Fahrenheit'}
          </Text>
        </View>
        <Button mode="contained" onPress={handleLogout} style={styles.button}>
          Logout
        </Button>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#19196f',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    borderRadius: 0,
    fontWeight: 'bold',
    paddingBottom: 30,
    alignSelf: 'center',
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'brown',
    borderRadius: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  switchLabel: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ProfileScreen;