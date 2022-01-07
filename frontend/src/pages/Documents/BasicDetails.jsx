import React, { useState, useRef } from 'react'
import { Grid, } from '@material-ui/core';
import "./BasicDetails.css";
import Bot from "../../assets/images/bot.jpg";
import Controls from "../../components/shared/controls/Controls";
import { useHistory } from "react-router-dom";
import { useForm, Form } from '../../components/shared/useForm';
import { usePlacesWidget } from "react-google-autocomplete";
import { storeBasicInfo } from "../../http/index";
import Notification from '../../components/Notification/Notification';
import { useSelector, useDispatch } from 'react-redux';
import SuccessfullyUploaded from "../../components/shared/SuccessfullyUploaded";
import { setAuth } from '../../store/authSlice';
import Button from 'react-bootstrap/Button';

const initialFValues = {
    firstName: '',
    lastName: '',
    fathersName: '',
    mothersName: '',
    email: '',
    mobile: '',
    permanentAddress: '',
    gender: '',
    occupation: '',
    zipCode: ''
}

const getGenderCollection = () => ([
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
])

export default function EmployeeForm() {

    const inputRef = useRef(null);
    const { user } = useSelector((state) => state.auth);
    const history = useHistory();
    const dispatch = useDispatch();
    const [country, setCountry] = useState("in");
    const [permanentAddress, setAddress] = useState("");
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [isLoading, setLoading] = useState(false);

    const { ref: materialRef } = usePlacesWidget({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        onPlaceSelected: (place) => {
            setAddress(place.formatted_address)
        },
        inputAutocompleteValue: "country",
        options: {
            componentRestrictions: { country },
        },
    });

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
        console.log(arr);
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
                if (permanentAddress != "") {
                    values["permanentAddress"] = permanentAddress
                }
                const { data } = await storeBasicInfo({ basicInfo: JSON.stringify(values) });
                //console.log(data);
                setLoading(false);
                dispatch(setAuth(data));
                history.push('/users/aadhar-details');
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
        } else {
            setNotify({
                isOpen: true,
                message: "All fields are required",
                type: 'warning'
            })
        }
    }

    return (
        <>
            {user && user.permanentAddress ? (<SuccessfullyUploaded />) :

                (<div className="basicPageDiv">
                    <h1 className="basicDetailsHeading" id="bs-details">Please enter your basic details</h1>
                    <div id="basicDetailsFormSection">
                        <Form onSubmit={handleSubmit}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Controls.Input
                                        name="firstName"
                                        label="First Name"
                                        value={values.firstName}
                                        onChange={handleInputChange}
                                    />
                                    <Controls.Input
                                        name="fathersName"
                                        label="Father's Name"
                                        value={values.fathersName}
                                        onChange={handleInputChange}
                                    />
                                    <Controls.Select
                                        name="gender"
                                        label="Gender"
                                        value={values.gender}
                                        onChange={handleInputChange}
                                        options={getGenderCollection()}
                                    />
                                    <Controls.Input
                                        label="Phone Number"
                                        name="mobile"
                                        value={values.mobile}
                                        onChange={handleInputChange}
                                    />
                                    <Controls.Input
                                        inputRef={materialRef}
                                        label="Address"
                                        name="permanentAddress"
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controls.Input
                                        label="Last Name"
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleInputChange}
                                    />
                                    <Controls.Input
                                        name="mothersName"
                                        label="Mother's Name"
                                        value={values.mothersName}
                                        onChange={handleInputChange}
                                    />
                                    <Controls.Input
                                        label="Email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleInputChange}
                                    />

                                    <Controls.Input
                                        label="Occupation"
                                        name="occupation"
                                        value={values.occupation}
                                        onChange={handleInputChange}
                                    />
                                    <Controls.Input
                                        name="zipCode"
                                        label="Zip Code"
                                        value={values.zipCode}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                            </Grid>
                            <div id="basicDetailsBottomImgDiv">
                                <img src={Bot} id="basicDetailsBottomImg" />
                                <p className="basicDetailsText">{user ? user.name + ', ' : ""}Please Fill Your Basic Details here.</p>
                                <Button disabled={isLoading} size="md" type="submit" id="continueBtnBasic" >
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


