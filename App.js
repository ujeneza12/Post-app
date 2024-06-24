import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Post from "./screens/NewPost";
import Comments from "./screens/Comments";
import HomeScreen from "./screens/HomeScreen";
import CommentScreen from "./screens/CommentScreen";
import SignupScreen from './screens/SignUpScreen';
import LoginScreen from "./screens/LoginScreen";






const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      	<Stack.Screen name="Home"  component={HomeScreen}   options={{ headerShown: false }}/>
        <Stack.Screen name="Login"  component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Signup"  component={SignupScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Post"  component={Post}   options={{ headerShown: false }}/> 
        <Stack.Screen name="Comments"  component={Comments}   options={{ headerShown: false }}/> 
        <Stack.Screen name="Screen"  component={CommentScreen}   options={{ headerShown: false }}/> 


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
