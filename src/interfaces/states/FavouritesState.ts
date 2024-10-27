import { Song } from '@interfaces';

export interface FavouritesState {
    favouriteSongs: Song[];
    page: number;
    totalPages: number;
}
