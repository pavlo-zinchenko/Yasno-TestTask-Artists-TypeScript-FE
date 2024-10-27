import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getArtistSongs } from '@services/ArtistService';
import { notifyError } from '@utils/ToastNotifications';
import { SONGS_PER_PAGE } from '@constants';
import { ArtistSongsResponse, Song, SongsState } from '@interfaces';
import { AppDispatch } from '@store/index';

const initialState: SongsState = {
  songs: [],
  page: 1,
  totalPages: 1,
  loading: true,
};

export const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setSongs: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.loading = false;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
});

export const { setLoading, setSongs, setPage, setTotalPages } = songsSlice.actions;

export const fetchArtistSongs = (artistId: number, page = 1) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  try {
    const { songs, totalPages }: ArtistSongsResponse = await getArtistSongs(artistId, page, SONGS_PER_PAGE);
    dispatch(setSongs(songs));
    dispatch(setTotalPages(totalPages));
  } catch (error) {
    notifyError('Failed to load artist songs');
  }
};

export default songsSlice.reducer;
