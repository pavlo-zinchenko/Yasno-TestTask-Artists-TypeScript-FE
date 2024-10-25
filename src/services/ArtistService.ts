import axiosInstance from './api';
import { executeRequest } from '@utils/executeRequest';
import { SONGS_PER_PAGE } from '@constants';
import { Artist, ArtistSongsResponse } from '@interfaces';

export const getArtists = async (): Promise<Artist[]> => {
    const favouriteSongs: { id: number }[] = JSON.parse(localStorage.getItem('favouriteSongs') || '[]');
    const ids: number[] = favouriteSongs.map((favSong) => favSong.id) || [];
    return await executeRequest(() =>
        axiosInstance.post('/artists', {
            ids,
        })
    );
};

export const getArtist = async (artistId: number): Promise<Artist> => {
    return await executeRequest(() => axiosInstance.get(`/artists/${artistId}`));
};

export const getArtistSongs = async (
    artistId: number,
    page: number = 1,
    limit: number = SONGS_PER_PAGE
): Promise<ArtistSongsResponse> => {
    return await executeRequest(() => axiosInstance.get(`/artists/${artistId}/songs?page=${page}&limit=${limit}`));
};
