import { Artist } from '@interfaces';

export interface ArtistsState {
    artists: Artist[];
    selectedArtist: Artist | null;
    loading: boolean;
}
