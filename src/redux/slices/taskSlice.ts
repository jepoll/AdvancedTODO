import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, Task } from '../../types';

  
  const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // Add task
        createTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
            const newTask = {
              ...action.payload,
              id: Date.now().toString(), // Generate a unique ID
              createdAt: new Date().toISOString(), // Set creation time
            };
            state.items.push(newTask);
          },
        // Update Task 
        updateTask(state, action: PayloadAction<Task>) {
            const index = state.items.findIndex(t => t.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        // Delete task
        removeTask(state, action: PayloadAction<string>) {
            state.items = state.items.filter(t => t.id !== action.payload);
        },
        // Mark task as completed
        markTaskAsCompleted(state, action: PayloadAction<string>) {
            const task = state.items.find(t => t.id === action.payload);
            if (task) {
                task.completed = true;
            }
        },
    },
});

  
export const { createTask, updateTask, removeTask, markTaskAsCompleted } = tasksSlice.actions;
export default tasksSlice.reducer;