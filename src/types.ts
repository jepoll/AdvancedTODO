export type RootStackParamList = {
  Login: undefined;
  List: undefined;
  Profile: undefined;
  CreateEditTask: {
    taskId?: string;
  };
};

// Define the shape of a user
export interface User {
    email: string,
    username: string;
    password: string;
    role: string;
    jwt?: string;
}

// Define the shape of a task object
export interface Task {
  id: string;
  name: string;
  description: string;
  location: string;
  completed: boolean;
  createdAt: string;
}

// Define the shape of the tasks slice state
export interface TasksState {
  items: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define the initial state with the correct type
export const initialState: TasksState = {
  items: [],
  status: 'idle',
  error: null,
};

export interface WeatherResponse {
  main: {
    temp: number;
  };
  name: string,
  sys: {
    country: string,
  }
}
  