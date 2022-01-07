import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from 'react-redux';
import { getAppointment } from "../../../http/index";
import { addNotification } from '../../../components/Notification/Notification';

function Summary() {
    const { user } = useSelector((state) => state.auth);
    const [appointment, setAppointment] = useState(null);
    console.log(user);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await getAppointment();
                setAppointment(data.appointment);
            } catch (error) {
                console.log(error)
            }
        })();
    }, []);

    function createData(name, value) {
        if(value || value == 0){
            return { name, value };
        }else{
            return { name, value: "Not submitted yet" }
        }
    }

    const rows = [
        createData("Name", user.firstName+" "+user.lastName),
        createData("KYC Email", user.kycEmail),
        createData("Father's Name", user.fatherName),
        createData("Mother's Name", user.motherName),
        createData("Aadhar Front Url", user.aadharFront),
        createData("Aadhar Back Url", user.aadharBack),
        createData("Pan Front Url", user.panFront),
        createData("Pan Back Url", user.panBack),        
        createData("Bank Account No.", user.bankAccountNumber),
        createData("IFSC Code", user.bankIfscCode),
        createData("Signature Url", user.signatureUrl),
        createData("Photo Url", user.userPhotoUrl),
        createData("Latitude", user.locationLatitude),
        createData("Longitude", user.locationLongitude),
        createData("Interview Requested Date", appointment ? appointment.requestDate: null),
        createData("Status", appointment ? appointment.status: null),
        createData("Interview Date", appointment ? appointment.interviewDate: null),
        createData("Meeting Code", appointment ? appointment.meetingCode: null),
        createData("Recorded Video Link", appointment ? appointment.recordedVideo: null),
        createData("Credit Worthiness", appointment ? appointment.creditWorthiness: null),
    ];

    return (
        <TableContainer component={Paper} style={{width: "60%", margin: "auto"}}>
        <h1 className="basicDetailsHeading" id="panHeading" align="center">My Dashboard</h1>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="left">{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Summary
