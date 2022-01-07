import React, { useState } from 'react';
import LoginImg from "../../assets/images/LoginImg.jpeg";
import Loginlogo from "../../assets/images/LoginLogo.jpeg";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { sendOtp } from '../../http';
import { verifyOtp } from '../../http';
import Notification from '../../components/Notification/Notification';
import { setAuth } from '../../store/authSlice';
import "./Login.css";

const SignUp = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [pass, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [flag, setFlag] = useState(false);
    const [hash, setHash] = useState('');
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    async function handleSubmit() {
        if (!flag) {
            try {
                setLoading(true)
                const { data } = await sendOtp({ email });
                console.log(data);
                setFlag(true);
                setHash(data.hash);
                setLoading(false)
            } catch (error) {
                setFlag(false);
                let message = error.response.data.message
                // addNotification(message);
                setNotify({
                    isOpen: true,
                    message: message,
                    type: 'error'
                })
                setLoading(false)
            }
        } else {
            try {
                setLoading(true)
                const { data } = await verifyOtp({ name, email, phone, pass, otp, hash });
                setFlag(false);

                const { user, auth, accessToken, refreshToken } = data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                dispatch(setAuth({ user, auth }));

                //dispatch(setAuth(data));
                setLoading(false)
            } catch (error) {
                let message = error.response.data.message
                // addNotification(message);
                setNotify({
                    isOpen: true,
                    message: message,
                    type: 'error'
                })
                setLoading(false)
            }
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
                        <Form.Control placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} id="loginInput" />
                        <Form.Control placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} id="loginInput" />
                        <Form.Control placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} id="loginInput" />
                        <Form.Control placeholder="Password" value={pass} onChange={(e) => setPassword(e.target.value)} id="loginInput" />
                        {flag && <Form.Control placeholder="Please enter otp" value={otp} onChange={(e) => setOtp(e.target.value)} id="loginInput" />}
                    </div>

                    <div id="remberMeDiv">
                        <Form.Check aria-label="option 1" id="checkBoxRememberMe" />
                        <p id="rememberMe">Remember me</p>
                    </div>

                    <div id="loginBtnGroup">
                        <Button disabled={loading} onClick={handleSubmit} variant="primary" size="lg">
                            {!loading ? "Sign Up" : "Signing up.."}
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
};

export default SignUp;