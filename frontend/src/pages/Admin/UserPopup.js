import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Controls from "../../components/shared/controls/Controls";
import { useForm, Form } from '../../components/shared/useForm';
// import * as employeeService from "../../services/employeeService";


const initialFValues = {
    id: '',
    phone: '',
    name: '',
    email: '',
    role: '',
    firstName: '',
    lastName: '',
    aadharFront: '',
    aadharBack: '',
    panFront: '',
    panBack: '',
    permanentAddress: '',
    occupation: '',
    gender: '',
    kycEmail: '',
    fatherName: '',
    motherName: '',
    bankAccountNumber: '',
    bankIfscCode: '',
    accountHolderName: '',
    mobileNumber: '',
    creditWorthiness: '',
    meetingCode: '',
    status: '',
    signatureUrl: '',
    userPhotoUrl: '',
    requestDate: '',
    locationLongitude: '',
    locationLatitude: '',
    recordedVideo: '',
    interviewDate: '',
}

export default function EmployeeForm(props) {
    const { addOrEdit, recordForEdit, isLoading, setIsLoading, isView } = props

    const [disabled, setDisabled] = useState(false);

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true);

    const handleSubmit = e => {
        e.preventDefault();
        setIsLoading(true)
        addOrEdit(values)
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <>
            {isView ? (<Form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={6}>
                        <Controls.Input
                            name="firstName"
                            label="First Name"
                            value={values.firstName}
                            onChange={handleInputChange}
                            disabled={disabled}
                        />

                        <Controls.Input
                            label="Email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange} disabled={disabled}

                        />
                        <Controls.Input
                            label="Father's Name"
                            name="fatherName"
                            value={values.fatherName}
                            onChange={handleInputChange} disabled={disabled}
                        />
                        <Controls.Input
                            label="Gender"
                            name="gender"
                            value={values.gender}
                            onChange={handleInputChange} disabled={disabled}
                        />
                        <Controls.Input
                            label="Address"
                            name="permanentAddress"
                            value={values.permanentAddress}
                            onChange={handleInputChange} disabled={disabled}
                        />
                        <Controls.Input
                            label="Account Holder Name"
                            name="accountHolderName"
                            value={values.accountHolderName} disabled={disabled}
                            onChange={handleInputChange}
                        />
                        <Controls.Input
                            label="Bank Ifsc Code"
                            name="bankIfscCode"
                            value={values.bankIfscCode} disabled={disabled}
                            onChange={handleInputChange}
                        />
                        <Controls.Input
                            label="Aadhar Front Url"
                            name="aadharFront"
                            value={values.aadharFront}
                            onChange={handleInputChange} disabled={disabled}
                        />
                        <Controls.Input
                            label="Pan Front Url"
                            name="panFront"
                            value={values.panFront}
                            onChange={handleInputChange} disabled={disabled}
                        />
                        <Controls.Input
                            label="Location Latitude"
                            name="locationLatitude"
                            value={values.locationLatitude}
                            onChange={handleInputChange} disabled={disabled}
                        />
                        <Controls.Input
                            label="User Photo Url"
                            name="userPhotoUrl"
                            value={values.userPhotoUrl}
                            onChange={handleInputChange} disabled={disabled}
                        />
                    </Grid>
                    <Grid item xs={6}>

                        <Controls.Input
                            label="Last Name"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleInputChange} disabled={disabled}
                        />


                        <Controls.Input
                            label="KYC Email"
                            name="kycEmail"
                            value={values.kycEmail}
                            onChange={handleInputChange}
                            disabled={disabled}
                        />

                        <Controls.Input
                            label="Mother's Name"
                            name="motherName"
                            value={values.motherName}
                            onChange={handleInputChange}
                            disabled={disabled}
                        />
                        <Controls.Input
                            label="Occupation"
                            name="occupation"
                            value={values.occupation}
                            onChange={handleInputChange}
                            disabled={disabled}
                        />
                        <Controls.Input
                            label="Mobile Number"
                            name="mobileNumber"
                            value={values.mobileNumber}
                            onChange={handleInputChange}
                            disabled={disabled}
                        />
                        <Controls.Input
                            label="Bank Account Number"
                            name="bankAccountNumber"
                            value={values.bankAccountNumber}
                            onChange={handleInputChange}
                            disabled={disabled}
                        />
                        <Controls.Input
                            label="Signature Url"
                            name="signatureUrl"
                            value={values.signatureUrl}
                            onChange={handleInputChange} disabled={disabled}
                        />
                        <Controls.Input
                            label="Aadhar Back Url"
                            name="aadharBack"
                            value={values.aadharBack}
                            onChange={handleInputChange} disabled={disabled}
                        />
                        <Controls.Input
                            label="Pan Back Url"
                            name="panBack"
                            value={values.panBack}
                            onChange={handleInputChange} disabled={disabled}
                        />
                        <Controls.Input
                            label="Location Longitude"
                            name="locationLongitude"
                            value={values.locationLongitude}
                            onChange={handleInputChange} disabled={disabled}
                        />
                        <Controls.Input
                            label="Recorded Videos Link"
                            name="recordedVideo"
                            value={values.recordedVideo}
                            onChange={handleInputChange} disabled={disabled}
                        />
                    </Grid>

                </Grid>
            </Form>) : 
            
            (<Form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={6}>
                        <Controls.Input
                            label="Enter Credit Worthiness"
                            name="creditWorthiness"
                            value={values.creditWorthiness}
                            onChange={handleInputChange}
                        />
                        <Controls.Input
                            label="Status of Meeting"
                            name="status"
                            value={values.status}
                            onChange={handleInputChange}
                        />


                    </Grid>
                    <Grid item xs={6}>
                        <Controls.DateTimePicker
                            label="Fix Interview Date & Time"
                            name="interviewDate"
                            value={values.interviewDate}
                            onChange={handleInputChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <Controls.Input
                            label="Meeting Code"
                            name="meetingCode"
                            value={values.meetingCode}
                            onChange={handleInputChange}
                        />
                        <div>
                            <Controls.Button
                                disabled={isLoading}
                                type="submit"
                                text={isLoading ? 'Submitting...' : 'Fix or Update Interview Deatils'} />
                        </div>
                    </Grid>

                </Grid>
            </Form>)}
        </>
    )
}