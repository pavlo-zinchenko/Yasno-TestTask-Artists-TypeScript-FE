import { Song } from '@interfaces';

export interface ExtendedSong extends Song {
  url: string;
}

export interface ExtendedSongProps {
  song: ExtendedSong;
}
