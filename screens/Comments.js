import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from './axios.config';

const Comments = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`/posts/${postId}/comments`);
      setComments(response.data);
      setSelectedPostId(postId);
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
    }
  };

  const handlePostPress = (postId) => {
    fetchComments(postId);
    navigation.navigate('CommentsScreen', { postId });
  };

  const handleDeletePost = (postId) => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => deletePost(postId) }
      ]
    );
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`/posts/${postId}`);
      fetchPosts();
      setSelectedPostId(null);
      setComments([]);
    } catch (error) {
      console.error(`Error deleting post ${postId}:`, error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.postItem}>
      <TouchableOpacity onPress={() => handlePostPress(item.id)}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text>{item.body}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeletePost(item.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const renderComments = () => (
    <FlatList
      data={comments}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.commentItem}>
          <Text style={styles.commentName}>{item.name}</Text>
          <Text>{item.body}</Text>
        </View>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.postsContainer}>
        <Text style={styles.heading}>Posts</Text>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
      {selectedPostId && (
        <View style={styles.commentsContainer}>
          <Text style={styles.heading}>Comments for Post {selectedPostId}</Text>
          {comments.length > 0 ? renderComments() : (
            <View style={styles.noCommentsContainer}>
              <Text style={styles.noCommentsText}>No comments on this post</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  postsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  postItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  deleteButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  commentsContainer: {
    flex: 1,
  },
  commentItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  commentName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  noCommentsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCommentsText: {
    fontSize: 20,
    color: '#666',
  },
});

export default Comments;
