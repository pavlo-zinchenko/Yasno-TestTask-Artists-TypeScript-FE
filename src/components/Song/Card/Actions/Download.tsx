import { IconButton } from '@mui/material';
import { Download as DownloadUI } from '@mui/icons-material';
import { downloadFile } from '@services/DownloadService';
import { ExtendedSongProps } from '@interfaces';

export default function Download({ song }: ExtendedSongProps) {
  const handleDownload = () => {
    downloadFile(song.url, song.name, song.artist_id);
  };

  return (
    <IconButton
      onClick={handleDownload}
      sx={{
        padding: 0,
        color: 'primary.main',
        transition: 'color 0.2s ease',
        '&:hover': { color: 'primary.dark' },
      }}
    >
      <DownloadUI sx={{
        backgroundColor: 'background.paper',
        borderRadius: '0 7px 0 0',
        fontSize: '2rem',
        padding: '6px 6px 2px 2px',
      }} />
    </IconButton>
  );
}
