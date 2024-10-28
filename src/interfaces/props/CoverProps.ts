import { Dispatch, SetStateAction, MutableRefObject } from 'react';
import { ExtendedSong } from '@interfaces';
import AudioPlayer from 'react-h5-audio-player';

export interface CoverProps {
    coverUrl: string;
    song: ExtendedSong;
    currentSongId: number | null;
    setCurrentSongId: Dispatch<SetStateAction<number | null>>;
    isPlaying: boolean;
    setIsPlaying: Dispatch<SetStateAction<boolean>>;
    audioRef: MutableRefObject<AudioPlayer | null>;
}
