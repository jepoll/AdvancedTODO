// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../src/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage/lib/typescript/AsyncStorage';
import { User } from '../src/types';


type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

interface MockUsers {
    [email: string] : Omit<User, 'jwt'>
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mockUsers: MockUsers = {
    'user@example.com': { email: 'user@example.com', username: 'user1', password: 'user', role: 'user' },
    'admin@example.com': { email: 'admin@example.com', username: 'admin1', password: 'admin', role: 'admin' },
  };

  const handleLogin = async () => {

    const user = mockUsers[email];

    if (user && user.password === password) {
      await AsyncStorage.setItem('userRole', user.role);
      await AsyncStorage.setItem('username', user.username);
    } else {
      Alert.alert('Invalid credentials');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        paddingBottom: 30,
        alignSelf: 'center',
      }}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Email"
        placeholderTextColor='gray'
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor='gray'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={ styles.buttonText}>Log In</Text>
      </TouchableOpacity>
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
  input: {
    height: 50,
    color: 'black',
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 10,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#119bff',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default LoginScreen;
