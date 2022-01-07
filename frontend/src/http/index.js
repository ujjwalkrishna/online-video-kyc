import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    // withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});

// List of all the endpoints
export const sendOtp = (data) => api.post('/api/send-otp', data);

export const verifyOtp = (data) => api.post('/api/verify-otp', data);

export const verifyUser = (data) => api.post('/api/verify-user', data);

export const storeDocumentsImage = (data) => api.post('/api/store-doc-images', data);

export const storeUserBiometric = (data) => api.post('/api/store-user-biometric', data);

export const storeBasicInfo = (data) => api.post('/api/store-basic-info', data);

export const storeBankInfo = (data) => api.post('/api/store-bank-info', data);

export const searchUser = (data) => api.post('/api/search-user', data);

export const getUserData = (data) => api.post('/api/get-user-data', data);

export const storeRecordedVideo = (data) => api.post('/api/store-recorded-video', data);

export const storeLatLng = (data) => api.post('/api/store-lat-lng', data);

export const reqAppointment = () => api.get('/api/req-appointment');

export const confirmAppointment = (data) => api.post('/api/confirm-appointment', data);

export const getAllIntRequest = () => api.get('/api/get-all-intreq');

export const getAppointment = () => api.get('/api/get-appointment');

export const logout = () => api.post('/api/logout');

// Interceptors
api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest.isRetry = true;
            try {
                const accessTokenPrev = localStorage.getItem('accessToken');
                const refreshTokenPrev = localStorage.getItem('refreshToken');
                let { data } = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/refresh`,
                    { headers: { 'Authorization': `${accessTokenPrev} ${refreshTokenPrev}` } }
                );
                const { user, auth, accessToken, refreshToken } = data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                return api.request(originalRequest);
            } catch (err) {
                console.log(err.message);
            }
        }
        throw error;
    }
);

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            config.headers['Authorization'] = `${accessToken} ${refreshToken}`;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        throw error
    });

export default api;
