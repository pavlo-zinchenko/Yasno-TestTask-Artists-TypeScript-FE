export interface Artist {
    id: number;
    name: string;
    avatar: string;
    songs_count: number;
}

export interface ArtistCardData extends Artist {
    liked_count: number;
    total_duration: string;
}

export interface ArtistCardInfo {
    artist: ArtistCardData;
}
