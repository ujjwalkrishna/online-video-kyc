import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuth } from '../store/authSlice';
import { setName } from '../store/activateSlice'

export function useLoadingWithRefresh() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const accessTokenPrev = localStorage.getItem('accessToken');
    const refreshTokenPrev = localStorage.getItem('refreshToken');

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/refresh`,
                    { headers: { 'Authorization': `${accessTokenPrev} ${refreshTokenPrev}`}}
                );
                //console.log(data);
                const { user, auth, accessToken, refreshToken } = data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                // dispatch(setAuth(data));
                dispatch(setAuth({ user, auth }));
                //dispatch(setAuth(data));
                dispatch(setName(data.user.name));
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        })();
    }, []);

    return { loading };
}
