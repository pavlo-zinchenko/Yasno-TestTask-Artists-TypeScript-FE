import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getArtists, getArtist } from '@services/ArtistService';
import { notifyError } from '@utils/ToastNotifications';
import { Artist, ArtistsState } from '@interfaces';
import { AppDispatch, RootState } from '@store/index';

const initialState: ArtistsState = {
  artists: [],
  selectedArtist: null,
  loading: false,
};

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setArtist: (state, action: PayloadAction<Artist>) => {
      state.selectedArtist = action.payload;
      state.loading = false;
    },
    setArtists: (state, action: PayloadAction<Artist[]>) => {
      state.artists = action.payload;
      state.loading = false;
    },
    clearArtist: (state) => {
      state.selectedArtist = null;
    },
    clearArtists: (state) => {
      state.artists = [];
    },
  },
});

export const {
  setLoading,
  setArtist,
  setArtists,
  clearArtist,
  clearArtists,
} = artistsSlice.actions;

export const fetchArtists = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const artistsSlice: ArtistsState = getState().artists;
  const artists: Artist[] = artistsSlice.artists;

  if (artists.length > 0) return;

  dispatch(setLoading());

  try {
    const response: Artist[] = await getArtists();
    dispatch(setArtists(response));
  } catch (error) {
    notifyError('Failed to load artists');
  }
};

export const fetchArtist = (artistId: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const artistsSlice: ArtistsState = getState().artists;
  const selectedArtist: Artist | null = artistsSlice.selectedArtist;

  if (selectedArtist && selectedArtist.id === artistId) return;

  dispatch(setLoading());

  try {
    const response: Artist = await getArtist(artistId);
    dispatch(setArtist(response));
  } catch (error) {
    notifyError('Failed to load artist details');
  }
};

export const clearSelectedArtist = () => (dispatch: AppDispatch) => {
  dispatch(clearArtist());
};

export const clearSelectedArtists = () => (dispatch: AppDispatch) => {
  dispatch(clearArtists());
};

export default artistsSlice.reducer;
