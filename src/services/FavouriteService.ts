import axiosInstance from './api';
import { executeRequest } from '@utils/executeRequest';
import { SONGS_PER_PAGE } from '@constants';
import { Song } from '@interfaces';
import { loadFavouritesFromStorage } from '@store/slices/favouritesSlice';

export const getFavourites = async (): Promise<Song[]> => {
    const response = await executeRequest(() => axiosInstance.get('/favourites'));
    return response.favouriteSongs;
};

export const getFavouritesPagination = async (
    page = 1,
    limit = SONGS_PER_PAGE
): Promise<Song[]> => {
    const favouriteSongs: Song[] = loadFavouritesFromStorage();
    const ids: number[] = favouriteSongs.map((favSong) => favSong.id) || [];
    return await executeRequest(() =>
        axiosInstance.post('/favourites/pagination', {
            page,
            limit,
            ids,
        })
    );
};

export const addFavourite = async (song_id: number): Promise<void> => {
    await executeRequest(() => axiosInstance.post('/favourites', { song_id }));
};

export const removeFavourite = async (song_id: number): Promise<void> => {
    await executeRequest(() => axiosInstance.delete('/favourites', { data: { song_id } }));
};
