import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const POSTS_ENDPOINT =
  'https://theconnectgame.com/wp-json/wp/v2/posts?per_page=10&orderby=rand';
const RandomPosts = ({ categoryId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const url =
        categoryId != null ? `${POSTS_ENDPOINT}&categories=${categoryId}` : POSTS_ENDPOINT;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <View style={styles.container}>
      <Button title="Refresh" onPress={fetchPosts} />
      {loading && <Text style={styles.message}>Loading...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <Text style={styles.title}>{item.title.rendered}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  postItem: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    marginVertical: 8,
  },
  error: {
    color: 'red',
    marginVertical: 8,
  },
});

export default RandomPosts;
