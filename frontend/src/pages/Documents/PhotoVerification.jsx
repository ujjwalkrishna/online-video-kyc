import React, { useState } from 'react';
import Webcam from "react-webcam";
import "./PhotoVerification.css";
import Bot from "../../assets/images/bot.jpg";
import Image from "../../assets/images/ei_image.png";
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../store/authSlice';
import { useHistory } from "react-router-dom";
import CameraImg from "../../assets/images/camera 1.png";
import { storeUserBiometric } from "../../http/index";
import Notification from '../../components/Notification/Notification';
import SuccessfullyUploaded from "../../components/shared/SuccessfullyUploaded";

const videoConstraints = {
    width: 315,
    height: 320,
    facingMode: "user"
};

const PhotoVerification = () => {
    const [isLoading, setLoading] = useState(false);

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [isVideo, setVideo] = useState(false);
    const [image, setImage] = useState('');

    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        () => {
            console.log('Hey')
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
        },

        [webcamRef]
    );

    async function handleSubmit() {
        if (image == '') {
            // addNotification("Please save image first");
            setNotify({
                isOpen: true,
                message: "Please save image first",
                type: 'warning'
            })
        } else {
            try {
                setLoading(true);
                const { data } = await storeUserBiometric({ image: image, document: "user-photo" })
                dispatch(setAuth(data));
                setLoading(false);
                history.push('/users/loc-verification');
            } catch (error) {
                let message = error.response.data.message
                console.log(message)
                //addNotification(message);
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
        <>
            {user && user.userPhotoUrl ? (<SuccessfullyUploaded />) :

                (<div className="photo-container">
                    <h1 className="basicDetailsHeading" id="panHeading">Photo Verification </h1>
                    {isVideo == false ? (<div className="uploadSigndiv">
                        <h1>Instructions to capture photo</h1>
                        <p>Once you click start. You shall give us the access to allow your camera.</p>
                        <img src={CameraImg} id="CameraImg" />
                        <Button variant="secondary" id="signBtn" onClick={(e) => { e.preventDefault(); setVideo(true) }} >Start</Button>
                    </div>) :
                        (
                            <div className="uploadSigndiv_1">
                                {image == '' ? (<Webcam
                                    id="customerImg"
                                    audio={false}
                                    height={315}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    width={320}
                                    videoConstraints={videoConstraints}
                                />) :
                                    <img src={image} id="customerImg" />
                                }
                                <div id="photoBtnGroup">
                                    <Button variant="secondary" id="photoBtn_1" size="sm" onClick={(e) => { e.preventDefault(); capture() }}>Save </Button>
                                    <Button variant="secondary" id="photoBtn_1" size="sm" onClick={(e) => { e.preventDefault(); setImage('') }}>Retry </Button>

                                </div>
                            </div>
                        )
                    }
                    <p style={{ marginTop: "20px" }}>Please keep your face in the center of your screen to capture your photo.</p>
                    <div className="basicDetailsBottomImgDiv">
                        <img src={Bot} id="basicDetailsBottomImg" />
                        <p className="basicDetailsText">{user ? user.name + ', ' : ""}Please Allow us to take your picture.</p>
                        <Button size="md" disabled={isLoading} id="continueBtnPhoto" onClick={handleSubmit}>
                            {isLoading ? 'Submitting...' : 'Continue'}
                        </Button>

                    </div>
                </div>)
            }
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}

export default PhotoVerification
