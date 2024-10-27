import { createSlice } from '@reduxjs/toolkit';
import { ThemeModeEnum } from '@enums';
import { ThemeState } from '@interfaces';

const initialState: ThemeState = {
  mode: ThemeModeEnum.LIGHT,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === ThemeModeEnum.LIGHT ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
