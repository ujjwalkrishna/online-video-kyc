import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    avatar: '',
    aadharFront: '',
    aadharBack: ''
};

export const activateSlice = createSlice({
    name: 'activate',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setAvatar: (state, action) => {
            state.avatar = action.payload;
        },
        setAadharFront: (state, action) => {
            state.aadharFront = action.payload;
        },
        setAadharBack: (state, action) => {
            state.aadharBack = action.payload;
        }
    },
});

export const { setName, setAvatar, setAadharFront,  setAadharBack } = activateSlice.actions;

export default activateSlice.reducer;
