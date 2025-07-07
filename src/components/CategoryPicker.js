import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CATEGORY_ENDPOINT = 'https://theconnectgame.com/wp-json/wp/v2/categories?per_page=100';

const CategoryPicker = ({ selected, onChange }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(CATEGORY_ENDPOINT);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <Picker
      selectedValue={selected}
      onValueChange={onChange}
      style={styles.picker}
    >
      <Picker.Item label="All" value={null} />
      {categories.map((cat) => (
        <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    marginVertical: 12,
  },
  loader: {
    marginVertical: 12,
  },
  error: {
    color: 'red',
    marginVertical: 12,
  },
});

export default CategoryPicker;
