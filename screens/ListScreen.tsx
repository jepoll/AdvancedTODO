import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FAB, Text, Button, IconButton, useTheme, Switch } from 'react-native-paper';
import { useNavigation  } from '@react-navigation/native';
import { RootStackParamList, Task } from '../src/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppDispatch, RootState } from '../src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { markTaskAsCompleted, removeTask } from '../src/redux/slices/taskSlice';

// Define the navigation prop type for the ListScreen
type ListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'List'>;

const ListScreen = () => {
  const navigation = useNavigation<ListScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

  const theme = useTheme();
  // Use Task[] type for tasks
  const tasks: Task[] = useSelector((state: RootState) => state.tasks.items) as Task[];



  // Get user information 
  const role: String = useSelector((state: RootState) => state.user.role)


  const handleEditTask = (taskId: string) => {
    navigation.navigate('CreateEditTask', { taskId });
  };

  const handleRemoveTask = (taskId: string) => {
    dispatch(removeTask(taskId));
  };

  const openProfile = () => {
    navigation.navigate('Profile');
  };

  const addTask = () => {
    navigation.navigate('CreateEditTask', {});
  }; 

  const [showCompleted, setShowCompleted] = useState(false);

  // Filter tasks
  const filteredTasks = showCompleted ? tasks : tasks.filter(task => !task.completed);


  const sortedTasks: Task[] = filteredTasks.slice().sort((a, b) => {
    // First sort by completion status: completed tasks go first
    if (a.completed && !b.completed) return -1;
    if (!a.completed && b.completed) return 1;
  
    // If two tasks have the same status, sort by date
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA; // New tasks are above
  });

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskContainer}>
      <View style={styles.taskContent}>
        <IconButton
          icon={item.completed ? 'check-circle' : 'checkbox-blank-circle-outline'}
          iconColor={item.completed ? '#4caf50' : theme.colors.background}
          size={22}
          onPress={() => dispatch(markTaskAsCompleted(item.id))}
        />
        <TouchableOpacity onPress={() => handleEditTask(item.id)} style={styles.taskInfo}>
          <Text style={{ color: theme.colors.background, fontSize: 18,}}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Switch to toggle showing completed tasks */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Show Completed Tasks</Text>
        <Switch
          value={showCompleted}
          onValueChange={() => setShowCompleted(prev => !prev)}
          thumbColor={showCompleted ? '#4caf50' : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
      </View>

      <FlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <FAB
        style={styles.menuFab}
        small
        icon="account"
        onPress={() => openProfile()}
      />
      {role === 'admin' && (
        <FAB
          style={styles.addFab}
          small
          icon="plus"
          onPress={() => addTask()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19196f',
    padding: 20,
  },
  taskContainer: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 10,
    marginBottom: 30,
    elevation: 3,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskInfo: {
    flex: 1,
    marginLeft: 10,
  },
  menuFab: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    backgroundColor: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  addFab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
});

export default ListScreen;
