import { Song } from '@interfaces';

export interface SongsState {
    songs: Song[];
    page: number;
    totalPages: number;
    loading: boolean;
}
