import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { toggleFavourite } from '@slices/favouritesSlice';
import { RootState, AppDispatch } from '@store/index';
import { ExtendedSongProps } from '@interfaces';

export default function AddFavourite({ song }: ExtendedSongProps) {
  const dispatch: AppDispatch = useDispatch();
  const isFavorited = useSelector((state: RootState) =>
    state.favourites.songs.map((favSong) => favSong.id).includes(song.id)
  );

  function handleFavourite() {
    dispatch(toggleFavourite(song));
  }

  return (
    <IconButton
      onClick={handleFavourite}
      sx={{
        padding: 0,
        color: isFavorited ? 'error.main' : 'text.primary',
        transition: 'color 0.2s ease',
        '&:hover': { color: 'error.light' },
      }}
    >
      {isFavorited ? (
        <Favorite
          sx={{
            fontSize: '2rem',
            backgroundColor: 'background.paper',
            borderRadius: '7px 0 0',
            padding: '6px 2px 2px 6px',
          }}
        />
      ) : (
        <FavoriteBorder
          sx={{
            fontSize: '2rem',
            backgroundColor: 'background.paper',
            borderRadius: '7px 0 0',
            padding: '6px 2px 2px 6px',
          }}
        />
      )}
    </IconButton>
  );
}
