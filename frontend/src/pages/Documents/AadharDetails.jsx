import React, { useState } from 'react';
import "./AadharDetails.css";
import Bot from "../../assets/images/bot.jpg";
import Image from "../../assets/images/ei_image.png";
import Button from 'react-bootstrap/Button';
import Dropzone from "react-dropzone";
import TextField from '@mui/material/TextField';
import { useHistory } from "react-router-dom";
import { storeDocumentsImage } from "../../http/index";
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../store/authSlice';
import SuccessfullyUploaded from "../../components/shared/SuccessfullyUploaded";
import { setAadharBack, setAadharFront } from '../../store/activateSlice';
import Notification from '../../components/Notification/Notification';

const Aadhar = () => {
    const [isLoading, setLoading] = useState(false);
    const history = useHistory();
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [docNumber, setDocNumber] = useState("");
    const [fileName1, setFileName1] = useState("");
    const [fileName2, setFileName2] = useState("");
    const [image1, setImage1] = useState(Image);
    const [image2, setImage2] = useState(Image);

    async function handleSubmit() {
        setLoading(true);
        try {
            const { data } = await storeDocumentsImage({ docNumber, imageFront: image1, imageBack: image2, document: "aadhar" })
            dispatch(setAuth(data));
            setLoading(false);
            history.push('/users/pan-details');
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
            {user && user.aadharFront ? (<SuccessfullyUploaded />) : (<div className="aadhar-container">
                <h1 className="basicDetailsHeading" id="panHeading">Upload your Aadhar Details </h1>
                <div className="panDetailsDiv">
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="Aadhar card number"
                        name="aadharNo"
                        value={docNumber}
                        onChange={(e) => setDocNumber(e.target.value)}
                    />
                </div>

                <div className="uploadAadhardiv">
                    <Dropzone onDrop={handleDrop1}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: "dropzone-left-aadhar" })}>
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
                            <div {...getRootProps({ className: "dropzone-right-aadhar" })}>
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
                    <p className="basicDetailsText">{user ? user.name + ', ' : ""}Please please upload front and back side of you Aadhar card and enter no..</p>
                    <Button disabled={isLoading} size="md" id="continueBtnAadhar" onClick={handleSubmit} >
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

export default Aadhar
