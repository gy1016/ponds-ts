import axios from 'axios';

export function uploadFile(data: any, onUploadProgress: (e: any) => any) {
  const instance = axios.create();
  return instance({
    baseURL: 'http://121.199.160.202:5001',
    url: '/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
}
