import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, DefaultTheme, PaperProvider, Switch, TextInput,  } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, removeTask, updateTask } from '../src/redux/slices/taskSlice';
import { AppDispatch, RootState } from '../src/redux/store';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList, WeatherResponse } from '../src/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getWeather } from '../src/services/weatherService';

type CreateEditTaskScreenRouteProp = RouteProp<RootStackParamList, 'CreateEditTask'>;

const theme = {
    ...DefaultTheme,
    roundness: 10,
    colors: {
      ...DefaultTheme.colors,
      primary: '#249ef0',
      accent: '#380de0',
      background: '#19196f',
      surface: '#fff',
      text: '#000',
    },
  };
  

const CreateEditTaskScreen = () => {
  const route = useRoute<CreateEditTaskScreenRouteProp>();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const taskId = route.params?.taskId;
  const tasks = useSelector((state: RootState) => state.tasks.items);

  const userRole = useSelector((state: RootState) => state.user.role);
  const isViewOnly = userRole !== 'admin';

  const task = taskId ? tasks.find(t => t.id === taskId) : null;

  const [name, setName] = useState(task?.name || '');
  const [description, setDescription] = useState(task?.description || '');
  const [location, setLocation] = useState(task?.location || 'Tallinn');
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  const celsius = useSelector((state: RootState) => state.user.temperatureUnit)

  const handleSave = () => {
    if (taskId) {
      dispatch(updateTask({ id: taskId, name, description, location, completed: task?.completed || false, createdAt: task?.createdAt || ''}));
    } else {
      dispatch(createTask({ name, description, location, completed: false, createdAt: new Date().toISOString() }));
    }
    // Handle navigation back
    navigation.goBack();
  };

  const handleDelete = () => {
    if (taskId) {
        dispatch(removeTask(taskId));
        navigation.goBack();
      }
  };

  useEffect(() => {
    if (taskId) {
      // Only fetch weather when you already know location
      const fetchWeather = async () => {
        setWeatherLoading(true);
        try {
          const weatherData = await getWeather(location);
          setWeather(weatherData);
        } catch (error) {
          console.error('Error fetching weather:', error);
        }
        setWeatherLoading(false);
      };

      fetchWeather();
    }
  }, [location, taskId, isViewOnly]);


    const weatherInfo = weather
    ? `Weather: ${Math.round(celsius === 'Celsius' ? weather.main.temp : (weather.main.temp * 9/5) + 32)}°${celsius === 'Celsius' ? 'C' : 'F'}, ${weather.name}, ${weather.sys.country}`
    : weatherLoading
    ? 'Loading weather...'
    : '';

  return (
    <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>{isViewOnly ? 'View Task' : (taskId ? 'Edit Task' : 'Create Task')}</Text>
        <TextInput
            label="Task Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            editable={!isViewOnly}
        />
        <TextInput
            label="Task Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            editable={!isViewOnly}
        />
        {!taskId && (
          <TextInput
            label="Task City"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
          />
        )}
        {isViewOnly || taskId ? (
          <Text style={styles.weather}>{weatherInfo}</Text>
        ) : null}
        <View style={styles.buttonsContainer}>
          {!isViewOnly && (
            <>
              <Button 
                style={[styles.buttons, styles.activeDeleteButton]} 
                mode="contained" 
                onPress={handleDelete}
              >
                Delete
              </Button>
              <Button 
                style={[styles.buttons,]} 
                mode="contained" 
                onPress={handleSave}
              >
                Save
              </Button>
            </>
          )}
        </View>
        
        </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#19196f',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 20,
    borderRadius: 14,
  },
  label: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    paddingBottom: 30,
    alignSelf: 'center',
  },
  weather: {
    marginTop: 20,
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  switchContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttons: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  activeDeleteButton: {
    backgroundColor: '#380de0',
    
  },
  deleteButton: {
    backgroundColor: '#6186c2',
    opacity: 0.6,
  }
});

export default CreateEditTaskScreen;
