
import { Dispatch, SetStateAction } from 'react';
import { Song } from '@interfaces';

export interface SongCardProps {
  song: Song;
  currentSongId: number | null;
  setCurrentSongId: Dispatch<SetStateAction<number | null>>;
}
