import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, CardMedia } from '@mui/material';
import CustomCard from '@common/CustomCard';
import { baseURL } from '@constants';
import { RootState } from '@store/index';
import { Artist } from '@interfaces';

const baseAvatarUrl = `${baseURL}/uploads/avatars/`;

export default function ScrollableLine() {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const artists = useSelector((state: RootState) => state.artists.artists);
  const navigate = useNavigate();

  useEffect(() => {
    if (!artists.length) return;

    let animationFrameId: number;

    const smoothScroll = () => {
      if (lineRef.current && artists.length > 1) {
        lineRef.current.scrollLeft += 1;

        const firstChild = lineRef.current.firstChild as HTMLDivElement;
        const firstChildWidth = firstChild.getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(lineRef.current).gap) || 0;

        if (lineRef.current.scrollLeft >= firstChildWidth + gap) {
          lineRef.current.scrollLeft -= firstChildWidth + gap;
          lineRef.current.appendChild(firstChild);
        }
      }

      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    animationFrameId = requestAnimationFrame(smoothScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [artists.length]);

  return (
    <Box
      ref={lineRef}
      sx={{
        display: 'flex',
        overflowX: 'hidden',
        whiteSpace: 'nowrap',
        alignItems: 'center',
        gap: '40px',
        maxWidth: '1000px',
        width: '100%',
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      {artists.map((artist: Artist, index: number) => (
        <CustomCard
          key={`${artist.id}-${index}`}
          onClick={() => navigate(`/artists/${artist.id}`)}
          sx={{
            width: '150px',
            height: '200px',
            marginRight: '20px',
            borderRadius: 0,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            margin: 0,
          }}
        >
          <CardMedia
            component="img"
            sx={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
            image={artist.avatar ? baseAvatarUrl + artist.avatar : baseAvatarUrl + 'default-avatar.png'}
            alt={artist.name}
          />
        </CustomCard>
      ))}
    </Box>
  );
}
