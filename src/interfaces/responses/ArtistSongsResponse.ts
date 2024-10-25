import { Song } from '@interfaces';

export interface ArtistSongsResponse {
    songs: Song[];
    totalPages: number;
}
