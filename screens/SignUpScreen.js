import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "./axios.config";

export default function SignupScreen({ navigation }) {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!firstname || !lastname || !email || !password) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address (e.g., divineujeneza@gmail.com).');
      return;
    }

    try {
      const response = await axios.post('/register', {
        firstname,
        lastname,
        email,
        password,
      });

      if (response.data.message) {
        Alert.alert('Success', response.data.message);
        navigation.navigate('Login');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        Alert.alert('Error', error.response.data.error);
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
    }
  };

  const validateEmail = (email) => {
    const re =/^[^\s@]+@(?:gmail|outlook|yahoo)\.com$/;
    return re.test(email);
  };
 
  return (
    <View className="flex-1 items-center justify-center bg-blue-400">
      <View className="w-full bg-white h-[740px] mt-[129px] rounded-t-lg">
        <View className="flex flex-row items-center justify-center mt-[80px]">
          <Text className="text-[40px] font-bold">Post</Text>
          <Text className="text-[40px] font-bold text-blue-400">App</Text>
        </View>
        <View className="items-center justify-center mt-[15px]">
          <Text className="font-bold text-blue-900">Welcome ...</Text>
          <Text className="font-bold text-stone-300">Please fill in the information</Text>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="person-outline"
            size={24}
            color="#222222"
            style={styles.inputIcon}
          />
          <TextInput
            value={firstname}
            placeholder="First Name"
            onChangeText={(text) => setFirstName(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="person-outline"
            size={24}
            color="#222222"
            style={styles.inputIcon}
          />
          <TextInput
            value={lastname}
            placeholder="Last Name"
            onChangeText={(text) => setLastName(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="#222222"
            style={styles.inputIcon}
          />
          <TextInput
            value={email}
            placeholder="Your Email"
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={24}
            color="#222222"
            style={styles.inputIcon}
          />
          <TextInput
            value={password}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className="py-4 items-center justify-center rounded-lg bg-blue-400 text-white mt-[20px] w-[330px] ml-[20px]"
          onPress={handleSignup}
        >
          <Text className="text-white font-bold">Sign Up</Text>
        </TouchableOpacity>
        
        <View className="flex flex-row items-center justify-center mt-[10px]">
          <Text className="text-[13px] text-stone-400">Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="text-[13px] text-blue-400">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#F7941D",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "80%",
    padding: 5,
    marginLeft: 24,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    marginTop: 6,
  },
  inputIcon: {
    marginRight: 10,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    height: "85%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  }
});
