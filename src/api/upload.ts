import axios from 'axios';

const instance = axios.create();
const CancelToken = axios.CancelToken;
let source = CancelToken.source();

export function uploadFile(data: any, onUploadProgress: (e: any) => any) {
  return instance({
    baseURL: 'http://121.199.160.202:5001',
    url: '/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
    cancelToken: source.token,
  });
}

export function mergeFile(size: number, fileName: string) {
  return instance({
    baseURL: 'http://121.199.160.202:5001',
    url: '/merge',
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify({
      size,
      fileName,
    }),
  });
}

export function verifyUpload(fileName: string) {
  return instance({
    baseURL: 'http://121.199.160.202:5001',
    url: '/verify',
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify({
      fileName,
    }),
  });
}

export function pauseUpload() {
  source.cancel('中断上传!');
  // 重置source，确保能续传
  source = CancelToken.source();
}
