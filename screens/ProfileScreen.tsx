import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, TextInput } from 'react-native-paper';
import { RootState } from '../src/redux/store';
import { logout } from '../src/redux/slices/userSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../src/types';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { email, username, role } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TextInput value={username} mode="outlined" style={styles.input} disabled />
      <TextInput value={email} mode="outlined" style={styles.input} disabled />
      <TextInput value={role} mode="outlined" style={styles.input} disabled />
      <Button mode="contained" onPress={handleLogout} style={styles.button}>
        Logout
      </Button>
    </SafeAreaView>
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
    fontWeight: 'bold',
    paddingBottom: 30,
    alignSelf: 'center',
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'brown',
  },
});

export default ProfileScreen;
