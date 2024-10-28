import { Dispatch, SetStateAction } from 'react';
import SongCard from '../Card';
import { Song } from '@interfaces';

interface SongsListProps {
  songs: Song[];
  currentSongId: number | null;
  setCurrentSongId: Dispatch<SetStateAction<number | null>>;
}

export default function SongsList({ songs, currentSongId, setCurrentSongId }: SongsListProps) {
  return (
    <>
      {songs.map((song) => (
        <SongCard
          key={song.id}
          song={song}
          currentSongId={currentSongId}
          setCurrentSongId={setCurrentSongId}
        />
      ))}
    </>
  );
}
