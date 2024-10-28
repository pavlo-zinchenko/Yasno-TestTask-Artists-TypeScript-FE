import { Artist, ArtistCardData } from '@interfaces';

export interface ArtistsState {
    artists: ArtistCardData[];
    selectedArtist: Artist | null;
    loading: boolean;
}
