import React, { useState } from 'react';
import LoginImg from "../../assets/images/LoginImg.jpeg";
import Loginlogo from "../../assets/images/LoginLogo.jpeg";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import GoogleBtn from "../../assets/images/googleLogin.jpeg";
import Notification from '../../components/Notification/Notification';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../store/authSlice';
import { verifyUser } from '../../http';
import "./Login.css";

const Login = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    async function handleSubmit(){
        try {
            setLoading(true)
            const { data } = await verifyUser({ email, pass });
            const { user, auth, accessToken, refreshToken } = data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            // dispatch(setAuth(data));
            dispatch(setAuth({ user, auth }));
            setLoading(false)
        } catch (error) {
            console.log(error)
            let message = error.response.data.message
            setNotify({
                isOpen: true,
                message: message,
                type: 'error'
            })
            setLoading(false)
            // addNotification(message);
        }
    }
    return (
        <div>
            <div id="loginMainDiv">
                <div id="loginLeftDiv">
                    <img src={LoginImg} id="LoginImg" />
                </div>

                <div id="loginRightDiv">
                    <img src={Loginlogo} id="loginLogo" />

                    <div id="loginInput">
                        <Form.Control placeholder="Full Name" id="loginInput" />
                        <Form.Control placeholder="Email address" onChange={(e) => setEmail(e.target.value)} id="loginInput" />
                        <Form.Control placeholder="Password" onChange={(e) => setPassword(e.target.value)} id="loginInput" />
                    </div>

                    <div id="remberMeDiv">
                        <Form.Check aria-label="option 1" id="checkBoxRememberMe" />
                        <p id="rememberMe">Remember me</p>
                    </div>

                    <div id="loginBtnGroup">
                        <Button disabled={loading} onClick={handleSubmit} variant="primary" size="lg">
                            {!loading ? "Login" : "Logging in.."}
                        </Button>
                    </div>
                </div>
            </div>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
    )
}

export default Login
