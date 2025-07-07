import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import RandomPosts from './src/components/RandomPosts';
import CategoryPicker from './src/components/CategoryPicker';

const App = () => {
  const [categoryId, setCategoryId] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <CategoryPicker selected={categoryId} onChange={setCategoryId} />
      <RandomPosts categoryId={categoryId} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default App;
