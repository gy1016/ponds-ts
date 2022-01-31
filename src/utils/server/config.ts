const devBaseURL = 'http://121.199.160.202:5000/api';
const proBaseURL = 'http://121.199.160.202:5000/api';
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;

export const TIMEOUT = 5000;
