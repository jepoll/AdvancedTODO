import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaskScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Task details</Text>
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

export default TaskScreen;
