import React, { useState } from 'react';
import "./PanDetails.css";
import Bot from "../../assets/images/bot.jpg";
import Image from "../../assets/images/ei_image.png";
import Button from 'react-bootstrap/Button';
import Dropzone from "react-dropzone";
import TextField from '@mui/material/TextField';
import { storeDocumentsImage } from "../../http/index";
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../store/authSlice';
import { useHistory } from "react-router-dom";
import { setAadharBack, setAadharFront } from '../../store/activateSlice';
import Notification from '../../components/Notification/Notification';
import SuccessfullyUploaded from "../../components/shared/SuccessfullyUploaded";

const Pan = () => {
    const [isLoading, setLoading] = useState(false);

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [docNumber, setDocNumber] = useState("");
    const [fileName1, setFileName1] = useState("");
    const [fileName2, setFileName2] = useState("");
    const [image1, setImage1] = useState(Image);
    const [image2, setImage2] = useState(Image);

    async function handleSubmit() {
        setLoading(true);
        try {
            const { data } = await storeDocumentsImage({ docNumber, imageFront: image1, imageBack: image2, document: "pan" })
            dispatch(setAuth(data));
            setLoading(false)
            history.push('/users/cheque-details');
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

    async function fileReader(file, value) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            //console.log(reader.result);
            if (value == 1) {
                setImage1(reader.result);
                dispatch(setAadharFront(reader.result))
            } else {
                setImage2(reader.result);
                dispatch(setAadharBack(reader.result))
            }
        }
    }
    const handleDrop1 = (acceptedFiles) => {
        setFileName1(acceptedFiles[0].name);
        const file = acceptedFiles[0];
        fileReader(file, 1)
    }
    const handleDrop2 = (acceptedFiles) => {
        setFileName2(acceptedFiles[0].name);
        const file = acceptedFiles[0];
        fileReader(file, 2)
    }

    return (
        <>
            {user && user.panFront ? (<SuccessfullyUploaded />) :

                (<div className="pan-container">
                    <h1 className="basicDetailsHeading">Upload your Pan Details </h1>
                    <div className="panDetailsDiv">
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="Pan card number"
                            name="panNo"
                            value={docNumber}
                            onChange={(e) => setDocNumber(e.target.value)}
                        />
                    </div>
                    <div className="uploadPandiv">
                        <Dropzone onDrop={handleDrop1}>
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps({ className: "dropzone-left-pan" })}>
                                    <img src={image1} id="panUploadImg" />
                                    <p align="center" className="panUploadText_3">{fileName1}</p>
                                    <input {...getInputProps()} />
                                    <p align="center" className="panUploadText_1">Drag and drop front side</p>
                                    <p align="center" className="panUploadText_2">or</p>
                                    <Button variant="secondary" id="panBtn" className="text-center">Browse files</Button>
                                </div>
                            )}
                        </Dropzone>
                        <Dropzone onDrop={handleDrop2}>
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps({ className: "dropzone-right-pan" })}>
                                    <img src={image2} id="panUploadImg" />
                                    <p align="center" className="panUploadText_3">{fileName2}</p>
                                    <input {...getInputProps()} />
                                    <p align="center" className="panUploadText_1">Drag and drop back side </p>
                                    <p align="center" className="panUploadText_2">or</p>
                                    <Button variant="secondary" id="panBtn" className="text-center">Browse files</Button>
                                </div>
                            )}
                        </Dropzone>
                    </div>
                    <div className="basicDetailsBottomImgDiv">
                        <img src={Bot} id="basicDetailsBottomImg" />
                        <p className="basicDetailsText">{user ? user.name + ', ' : ""}Please please upload front and back side of you Pan card and enter card no.</p>
                        <Button disabled={isLoading} size="md" id="continueBtnPan" onClick={handleSubmit} >
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

export default Pan