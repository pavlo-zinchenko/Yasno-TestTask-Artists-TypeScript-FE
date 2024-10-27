import axiosInstance from './api';
import { notifyError } from '@utils/ToastNotifications';
import { CHUNK_SIZE } from '@constants';
import { DownloadChunkResponse, HttpHeaders } from '@interfaces';

function sanitizeHeaders(headers: any): HttpHeaders {
  const sanitizedHeaders: HttpHeaders = {};
  Object.entries(headers).forEach(([key, value]) => {
    sanitizedHeaders[key] = value != null ? String(value) : undefined;
  });
  return sanitizedHeaders;
}

const downloadChunk = async (
  url: string,
  artistId: string,
  start: number,
  end: number
): Promise<DownloadChunkResponse> => {
  try {
    const response = await axiosInstance.get(`${url}?artist_id=${artistId}`, {
      headers: {
        Range: `bytes=${start}-${end}`,
      },
      responseType: 'blob',
    });
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as HttpHeaders,
    };
  } catch (error) {
    console.error(`Error downloading chunk: ${start}-${end}`, error);
    throw error;
  }
};

export const downloadFile = async (url: string, name: string, artist_id: string): Promise<void> => {
  try {
    const artistId: string = encodeURIComponent(artist_id);
    const downloadUrl: string = url.replace('uploads', 'downloads');

    const response = await axiosInstance.head(`${downloadUrl}?artist_id=${artistId}`);
    const headers: HttpHeaders = sanitizeHeaders(response.headers);

    if (!headers['accept-ranges']) {
      throw new Error('Server does not support range requests.');
    }

    const totalSize: number = parseInt(headers['content-length'] ?? '0', 10);

    if (isNaN(totalSize) || totalSize === 0) {
      throw new Error('Unable to determine the file size.');
    }

    let start: number = 0;
    const chunks: Blob[] = [];

    while (start < totalSize) {
      const end: number = Math.min(start + CHUNK_SIZE - 1, totalSize - 1);
      const chunkResponse: DownloadChunkResponse = await downloadChunk(downloadUrl, artistId, start, end);

      if (chunkResponse.status !== 206 && start !== 0) {
        throw new Error('Failed to download a chunk of the file.');
      }

      chunks.push(chunkResponse.data);
      start += CHUNK_SIZE;
    }

    const blob = new Blob(chunks, { type: 'audio/mpeg' });
    const objectUrl: string = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = objectUrl;
    downloadLink.download = `${name}.mp3`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    window.URL.revokeObjectURL(objectUrl);
  } catch (error) {
    const message: string = error instanceof Error ? error.message : 'An unknown error occurred';
    notifyError(`Failed to download the file. ${message}`);
  }
};
