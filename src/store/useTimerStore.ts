// store/useTimerStore.ts
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Timer } from '../types/timer';

const LOCAL_STORAGE_KEY = 'timers';

// Load initial state from localStorage
const loadInitialState = () => {
  try {
    const storedTimers = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedTimers ? JSON.parse(storedTimers) : [];
  } catch (error) {
    console.error('Error loading timers from localStorage:', error);
    return [];
  }
};

const initialState = {
  timers: loadInitialState() as Timer[],
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    addTimer: (state, action) => {
      state.timers.push({
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      });
    },
    deleteTimer: (state, action) => {
      state.timers = state.timers.filter(timer => timer.id !== action.payload);
    },
    toggleTimer: (state, action) => {
      const timer = state.timers.find((timer) => timer.id === action.payload);
      if (timer) {
        const wasRunning = timer.isRunning;
        timer.isRunning = !timer.isRunning;

        // If any one timer was just started, stop all other timers.
        if (!wasRunning) {
          state.timers.forEach((other) => {
            if (other.id !== action.payload) other.isRunning = false;
          });
        }
      }
    },
    updateTimer: (state, action) => {
      const timer = state.timers.find(timer => timer.id === action.payload);
      if (timer && timer.isRunning) {
        timer.remainingTime = Math.max(0, timer.remainingTime - 1);
        timer.isRunning = timer.remainingTime > 0;
      }
    },
    restartTimer: (state, action) => {
      const timer = state.timers.find(timer => timer.id === action.payload);
      if (timer) {
        timer.remainingTime = timer.duration;
        timer.isRunning = false;
      }
    },
    editTimer: (state, action) => {
      const timer = state.timers.find(timer => timer.id === action.payload.id);
      if (timer) {
        Object.assign(timer, action.payload.updates);
        timer.remainingTime = action.payload.updates.duration || timer.duration;
        timer.isRunning = false;
      }
    },
  },
});

// localStorage middleware
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type.startsWith('timer/')) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store.getState().timers));
    } catch (error) {
      console.error('Error saving timers:', error);
    }
  }
  return result;
};

const timerStore = configureStore({
  reducer: timerSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export { timerStore };

export const {
  addTimer,
  deleteTimer,
  toggleTimer,
  updateTimer,
  restartTimer,
  editTimer,
} = timerSlice.actions;

export const useTimerStore = () => {
  const dispatch = useDispatch();
  const timers = useSelector((state: { timers: Timer[] }) => state.timers);

  return {
    timers,
    addTimer: (timer: Omit<Timer, 'id' | 'createdAt'>) => dispatch(addTimer(timer)),
    deleteTimer: (id: string) => dispatch(deleteTimer(id)),
    toggleTimer: (id: string) => dispatch(toggleTimer(id)),
    updateTimer: (id: string) => dispatch(updateTimer(id)),
    restartTimer: (id: string) => dispatch(restartTimer(id)),
    editTimer: (id: string, updates: Partial<Timer>) => dispatch(editTimer({ id, updates })),
  };
};