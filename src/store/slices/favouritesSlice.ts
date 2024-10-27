import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFavourites, addFavourite, removeFavourite, getFavouritesPagination } from '@services/FavouriteService';
import { SONGS_PER_PAGE } from '@constants';
import { Song, FavouritesState } from '@interfaces';
import { AppDispatch } from '@store/index';

const initialState: FavouritesState = {
  favouriteSongs: [],
  page: 1,
  totalPages: 1,
};

const saveFavSongsToLocaleStorage = (songs: Song[]): void => {
  localStorage.setItem('favouriteSongs', JSON.stringify(songs));
}

export const loadFavouritesFromStorage = (): Song[] => {
  const storedFavourites: string | null = localStorage.getItem('favouriteSongs');
  const parsedFavourites: Song[] = storedFavourites ? JSON.parse(storedFavourites) : [];
  return parsedFavourites.filter((song) => song !== null);
};

export const loadFavourites = async (isAuthenticated: boolean, dispatch: AppDispatch): Promise<void> => {
  if (!isAuthenticated) {
    const storageFavourites: Song[] = loadFavouritesFromStorage();
    dispatch(loadFavouritesSuccess(storageFavourites));
    return;
  }

  try {
    const data: Song[] = await getFavourites();
    dispatch(loadFavouritesSuccess(data.length > 0 ? data : loadFavouritesFromStorage()));
  } catch (error) {
    dispatch(loadFavouritesSuccess(loadFavouritesFromStorage()));
  }
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavourite: (state: FavouritesState, action: PayloadAction<Song>): void => {
      const song: Song = action.payload;
      const songId: number = song.id;
      const isAuthenticated: boolean = Boolean(localStorage.getItem('token'));
      const isSongInFavourites: boolean = state.favouriteSongs.some((favSong: Song) => favSong.id === songId);

      if (isSongInFavourites) {
        state.favouriteSongs = state.favouriteSongs.filter((favSong: Song) => favSong.id !== songId);

        if (isAuthenticated) {
          removeFavourite(songId);
        }
      } else {
        state.favouriteSongs.push(song);

        if (isAuthenticated) {
          addFavourite(songId);
        }
      }

      state.totalPages = Math.ceil(state.favouriteSongs.length / SONGS_PER_PAGE);
      if (state.page > state.totalPages) state.page -= 1;
      saveFavSongsToLocaleStorage(state.favouriteSongs);
    },

    loadFavouritesSuccess: (state: FavouritesState, action: PayloadAction<Song[]>): void => {
      state.favouriteSongs = action.payload;
      saveFavSongsToLocaleStorage(state.favouriteSongs);
    },

    setFavouritesPage: (state: FavouritesState, action: PayloadAction<number>): void => {
      state.page = action.payload;
    },

    setFavouritesTotalPages: (state: FavouritesState, action: PayloadAction<number>): void => {
      state.totalPages = action.payload;
    },
  },
});

export const {
  toggleFavourite,
  loadFavouritesSuccess,
  setFavouritesPage,
  setFavouritesTotalPages
} = favouritesSlice.actions;

export default favouritesSlice.reducer;

export const fetchFavouritesSongs = (page: number = 1) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const offset: number = (page - 1) * SONGS_PER_PAGE;
    const songs: Song[] = await getFavouritesPagination(SONGS_PER_PAGE, offset);
    const totalPages: number = Math.ceil(songs.length / SONGS_PER_PAGE);
    dispatch(loadFavouritesSuccess(songs));
    dispatch(setFavouritesTotalPages(totalPages));
  } catch (error) {
    console.error('Error fetching favourite songs:', error);
  }
};
