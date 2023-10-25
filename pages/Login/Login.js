
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
        navigation.navigate('ViewSurvey'); 
      } else {
        setIsAuthenticated(false);
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      setIsAuthenticated(false);
      setError('An error occurred during login. Please try again.');
    }
  };


  // const handleLogin = () => {
  //   // Simulate a simple login logic for demonstration purposes
  //   // In a real application, you would make an API call to authenticate the user

  //   // Replace the following with your actual authentication logic
  //   if (email === 'user@example.com' && password === 'password') {
  //     setIsAuthenticated(true);
  //     navigation.navigate('ViewSurvey'); // Navigate to the Survey screen after successful login
  //   } else {
  //     setIsAuthenticated(false);
  //     alert('Invalid email or password. Please try again.');
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>
          Sign up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  signupText: {
    fontSize: 16,
    textAlign: 'center',
  },
  signupLink: {
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default Login;