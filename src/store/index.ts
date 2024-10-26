import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@slices/themeSlice';
import artistsReducer from '@slices/artistsSlice';
import songsReducer from '@slices/songsSlice';
import favouritesReducer from '@slices/favouritesSlice';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    favourites: favouritesReducer,
    theme: themeReducer,
    songs: songsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
