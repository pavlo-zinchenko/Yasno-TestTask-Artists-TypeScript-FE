import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Typography, Box } from '@mui/material';
import { fetchArtist } from '@slices/artistsSlice';
import { setPage, fetchArtistSongs } from '@slices/songsSlice';
import Progress from '@common/Progress';
import Pagination from '@components/Pagination';
import SongsList from '../components/Song/List';
import { baseURL } from '@constants';
import { RootState, AppDispatch } from '@store/index';
import { ArtistPageParams } from '@types';

export default function ArtistPage() {
  const params = useParams<ArtistPageParams>();
  const artistId: number | null = params.artistId ? +params.artistId : null;
  
  const dispatch: AppDispatch = useDispatch();

  const { songs, loading: loadingSongs, totalPages, page } = useSelector((state: RootState) => state.songs);
  const { selectedArtist, loading: loadingArtist } = useSelector((state: RootState) => state.artists);
  const [currentSongId, setCurrentSongId] = useState<number | null>(null);

  useEffect(() => {
    if (artistId) {
      dispatch(fetchArtist(artistId));
      dispatch(fetchArtistSongs(artistId, page));
    }
  }, [artistId, page, dispatch]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  if (!selectedArtist) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Typography>Artist not found</Typography>
      </Box>
    );
  }

  if (loadingArtist || loadingSongs) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Progress />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Avatar
          alt={selectedArtist.name}
          src={
            selectedArtist.avatar
              ? `${baseURL}/uploads/avatars/${selectedArtist.avatar}`
              : '/default-avatar.png'
          }
          sx={{ width: 150, height: 150, margin: '0 auto', mb: 2 }}
        />
        <Typography variant="h4">{selectedArtist.name}</Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}>
        {!songs?.length ? (
          <Typography>No songs available for this artist</Typography>
        ) : (
          <SongsList
            songs={songs}
            currentSongId={currentSongId}
            setCurrentSongId={setCurrentSongId}
          />
        )}

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            onPageChange={handlePageChange}
          />
        )}
      </Box>
    </Box>
  );
}
