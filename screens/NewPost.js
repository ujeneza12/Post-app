import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from "./axios.config";

const NewPost = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/posts', {
        userId: Number(userId),
        title,
        body,
      });
      Alert.alert('New Post', 'Post created successfully', [
        { text: 'OK', onPress: () => navigation.navigate('Comments') }
      ]);
    } catch (error) {
      setErrorMessage('Failed to create post');
      Alert.alert('Error creating post', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Welcome, create a new post here</Text>
      <Text style={styles.label}>User ID:</Text>
      <TextInput
        style={styles.input}
        value={userId}
        onChangeText={setUserId}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Body:</Text>
      <TextInput
        style={[styles.input, styles.bodyInput]}
        value={body}
        onChangeText={setBody}
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  bodyInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default NewPost;
