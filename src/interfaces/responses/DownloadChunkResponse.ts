import { HttpHeaders } from '@types';

export interface DownloadChunkResponse {
    data: Blob;
    status: number;
    headers: HttpHeaders;
}
