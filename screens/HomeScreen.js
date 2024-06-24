import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Posts App</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Create New Post"
          onPress={() => navigation.navigate("Post")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="View Posts"
          onPress={() => navigation.navigate("Comments")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: "80%",
  },
});

export default HomeScreen;
