export type HttpHeaders = Record<string, string | undefined>

export interface DownloadChunkResponse {
    data: Blob;
    status: number;
    headers: HttpHeaders;
}
