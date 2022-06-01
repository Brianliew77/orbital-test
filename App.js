import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, KeyboardAvoidingView} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './firebase';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigating = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigating.replace("Home")
      }
    })
    return unsubscribe
  }, [])

  const handleSignUp = () => {
    auth
    .createUserWithEmailAndPassword(email,password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Registered with:',user.email);
    })
    .catch(error => alert(error.message))
  }
  
  const handleLogin = () => {
    auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Logged in with:', user.email);
    })
    .catch(error => alert(error.message))
  }
  
  return (
    <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Screen{"\n"}</Text>
      <Text style={styles.baseText}>Welcome to Food Hitch!{"\n"}</Text>


      <View style={styles.inputView}>
  <TextInput
    style={styles.TextInput}
    placeholder="Email"
    placeholderTextColor="#003f5c"
    onChangeText={(email) => setEmail(email)}
  />
</View>
 
<View style={styles.inputView}>
  <TextInput
    style={styles.TextInput}
    placeholder="Password"
    placeholderTextColor="#003f5c"
    secureTextEntry={true}
    onChangeText={(password) => setPassword(password)}
  />
</View>

<Button
    title="Login"
    onPress={handleLogin}
    />

<Button
    title="Register"
    onPress={handleSignUp}
    />
  </KeyboardAvoidingView>
  );
}

function HomeScreen() {

  const navigating = useNavigation();

  const handleSignOut = () => {
    auth
    .signOut()
    .then(() => {
      navigating.replace("Login")
    })
    .catch(error => alert(error.message))
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen {"\n"}</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Button
        title="Sign Out"
        onPress={handleSignOut}
    />
    </View>
  );
}
  

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  baseText: {
    fontWeight: 'bold'
  },

  inputView: {
    backgroundColor: "#ADD8E6",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

});
