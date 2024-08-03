import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>List of tasks</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

export default ListScreen;
