import React, { useState, useRef } from 'react';
import { Grid, } from '@material-ui/core';
import "./CancelledCheque.css";
import Bot from "../../assets/images/bot.jpg";
import Button from 'react-bootstrap/Button';
import Controls from "../../components/shared/controls/Controls";
import { useForm, Form } from '../../components/shared/useForm';
import { storeBankInfo } from "../../http/index";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../store/authSlice';
import SuccessfullyUploaded from "../../components/shared/SuccessfullyUploaded";
import Notification from '../../components/Notification/Notification';

const initialFValues = {
    bankAccountNumber: '',
    bankIfscCode: '',
    accountHolderName: '',
    mobileNumber: ''
}

export default function Cheque() {
    const { user } = useSelector((state) => state.auth);
    const [isLoading, setLoading] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
        address,
        changeAddress
    } = useForm(initialFValues, true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const arr = Object.values(values);
        let isFieldEmpty = false;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == '') {
                isFieldEmpty = true;
                break;
            }
        }
        if (!isFieldEmpty) {
            setLoading(true)
            try {
                const { data } = await storeBankInfo(values);
                dispatch(setAuth(data));
                setLoading(false)
                history.push('/users/signature');
            } catch (error) {
                let message = error.response.data.message
                console.log(message);
                setNotify({
                    isOpen: true,
                    message: message,
                    type: 'error'
                })
                setLoading(false)
            }
        } else {
            //addNotification("All fields are required");
            setNotify({
                isOpen: true,
                message: "All fields are required",
                type: 'warning'
            })
        }
    }

    return (
        <>
            {user && user.bankAccountNumber ? (<SuccessfullyUploaded />) : (

                <div>
                    <h1 className="BankDetailsHeading" id="bs-details">Please fill your bank details</h1>
                    <div id="basicDetailsFormSection">
                        <Form onSubmit={handleSubmit}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Controls.Input
                                        label="Account Holder Name"
                                        name="accountHolderName"
                                        value={values.accountHolderName}
                                        onChange={handleInputChange}
                                    />
                                    <Controls.Input
                                        name="mobileNumber"
                                        label="Mobile Number"
                                        value={values.mobileNumber}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controls.Input
                                        name="bankAccountNumber"
                                        label="Account Number"
                                        value={values.bankAccountNumber}
                                        onChange={handleInputChange}
                                    />
                                    <Controls.Input
                                        name="bankIfscCode"
                                        label="IFSC Code"
                                        value={values.bankIfscCode}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                            </Grid>
                            <div id="basicDetailsBottomImgDiv">
                                <img src={Bot} id="basicDetailsBottomImg" />
                                <p className="basicDetailsText">{user ? user.name + ', ' : ""}Please Fill Your Basic Details here.</p>
                                <Button disabled={isLoading} size="md" id="continueBtnBank" onClick={handleSubmit} >
                                    {isLoading ? 'Submitting...' : 'Continue'}
                                </Button>
                            </div>
                        </Form>
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
