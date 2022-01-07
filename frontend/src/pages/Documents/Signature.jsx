import React, { useState } from 'react';
import "./Signature.css";
import Bot from "../../assets/images/bot.jpg";
import Image from "../../assets/images/ei_image.png";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropzone from "react-dropzone";
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../store/authSlice';
import { useHistory } from "react-router-dom";
import { storeUserBiometric } from "../../http/index";
import Notification from '../../components/Notification/Notification';
import SuccessfullyUploaded from "../../components/shared/SuccessfullyUploaded";


const Signature = () => {
    const [isLoading, setLoading] = useState(false);
    const [fileName, setFileName] = useState("");

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [image, setImage] = useState(Image);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    async function handleSubmit() {
        setLoading(true);
        try {
            const { data } = await storeUserBiometric({ image: image, document: "user-sign" })
            dispatch(setAuth(data));
            setLoading(false)
            history.push('/users/photo-verification');
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

    async function fileReader(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setImage(reader.result);
        }
    }
    const handleDrop = (acceptedFiles) => {
        setFileName(acceptedFiles[0].name);
        const file = acceptedFiles[0];
        fileReader(file)
    }

    return (
        <>
            {user && user.signatureUrl ? (<SuccessfullyUploaded />) :

                (<div className="sign-container">
                    <h1 className="basicDetailsHeading" id="panHeading">Upload your Signature </h1>
                    <p>Upload a scanned signature. Sign a blank white paper and capture a photo to upload. If the image captured is blurred recapture and upload it.</p>

                    <div className="uploadPandiv">
                        <Dropzone onDrop={handleDrop}>
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps({ className: "dropzone-left-sign" })}>
                                    <img src={image} id="panUploadImg" />
                                    <p align="center" className="panUploadText_3">{fileName}</p>
                                    <input {...getInputProps()} />
                                    <p align="center" className="panUploadText_1">Drag and drop front side</p>
                                    <p align="center" className="panUploadText_2">or</p>
                                    <Button variant="secondary" id="panBtn" className="text-center">Browse files</Button>
                                </div>
                            )}
                        </Dropzone>
                    </div>

                    <div className="basicDetailsBottomImgDiv">
                        <img src={Bot} id="basicDetailsBottomImg" />
                        <p className="basicDetailsText">{user ? user.name + ', ' : ""}Please upload your digital signature here.</p>
                        <Button disabled={isLoading} size="md" id="continueBtnSign" onClick={handleSubmit} >
                            {isLoading ? 'Submitting...' : 'Continue'}
                        </Button>
                    </div>
                </div>)}

                <Notification
                notify={notify}
                setNotify={setNotify}
                />
        </>
    )
}

export default Signature
