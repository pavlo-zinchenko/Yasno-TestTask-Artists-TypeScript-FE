import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import ArtistCard from '@components/ArtistCard/index';
import { fetchArtists } from '@slices/artistsSlice';
import Progress from '@common/Progress';
import { RootState, AppDispatch } from '@store/index';
import { Artist } from '@interfaces';

export default function ArtistsPage() {
  const dispatch: AppDispatch = useDispatch();
  const { artists, loading } = useSelector((state: RootState) => state.artists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  if (loading) {
    return <Progress />;
  }

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          textAlign: 'center',
          margin: '20px 0'
        }}
      >
        Artists
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {artists.map((artist: Artist) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
          />
        ))}
      </Box>
    </Box>
  );
}
