import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from 'redux/counter/counterSlice';
import genshinCharactersReducer from 'redux/genshinCharacters/genshinCharactersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    genshinCharacters: genshinCharactersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
