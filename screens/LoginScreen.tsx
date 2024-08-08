import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, User } from '../src/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, Button } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import { login } from '../src/redux/slices/userSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

interface MockUsers {
  [email: string]: Omit<User, 'jwt'>;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const mockUsers: MockUsers = {
    'user@mock.com': { email: 'user@mock.com', username: 'user1', password: 'user', role: 'user' },
    'admin@mock.com': { email: 'admin@mock.com', username: 'admin1', password: 'admin', role: 'admin' },
  };

  const handleLogin = async () => {
    const user = mockUsers[email];
    if (user && user.password === password) {
      dispatch(login({ email: user.email, username: user.username, role: user.role }));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );
    } else {
      Alert.alert('Invalid credentials');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
  <Text style={styles.title}>Log In</Text>
  <TextInput
    label={email === '' ? 'Enter Your Email' : ''}
    mode="outlined"
    style={styles.input}
    value={email}
    onChangeText={setEmail}
    theme={{ colors: { text: 'black' } }}
  />
  <TextInput
    label={password === '' ? 'Password' : ''}
    mode="outlined"
    style={styles.input}
    value={password}
    onChangeText={setPassword}
    secureTextEntry
    theme={{ colors: { text: 'black' } }}
  />
  <Button mode="contained" onPress={handleLogin} style={styles.button}>
    Log In
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
  },
});

export default LoginScreen;
