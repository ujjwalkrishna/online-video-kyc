import React, { useState, useEffect } from 'react';
import Popup from "../../components/shared/Popup";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/shared/useTable";
import Controls from "../../components/shared/controls/Controls";
import { getAllIntRequest } from "../../http/index";
import { confirmAppointment } from "../../http/index";
import { Search } from "@material-ui/icons";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
import UserPopup from "./UserPopup.js";
import Notification from "../../components/Notification/Notification";
import PageHeader from "../../components/shared/PageHeader";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '100%',
        paddingLeft: '0px'
    }
}))

export default function Home() {

    useEffect(() => {
        (async () => {
            try {
                const { data } = await getAllIntRequest();
                let result = JSON.parse(data.data);
                setRecords(result);
                //console.log(result);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const headCells = [
        { id: 'name', label: 'User Name' },
        { id: 'email', label: 'Email Address' },
        { id: 'mobileNumber', label: 'Mobile Number' },
        { id: 'requestDate', label: 'Request Date' },
        { id: 'interviewDate', label: 'Interview Date' },
        { id: 'action', label: 'Action', disableSorting: true },
    ]

    const classes = useStyles();
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [openPopup, setOpenPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const [isView, setIsView] = useState(false);

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        console.log(target.value)
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.email.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = async (item) => {
        try {
            const { data } = await confirmAppointment({ interviewDate: item.interviewDate, userId: item.id, kycEmail: item.kycEmail, status: item.status, creditWorthiness: item.creditWorthiness, meetingCode: item.meetingCode });
            setIsLoading(false);

        } catch (error) {
            console.log(error);
            setNotify({
                isOpen: true,
                message: 'Details Updated Successfully',
                type: 'error'
            })
            setIsLoading(false);
        }
        try {
            const { data } = await getAllIntRequest();
            let result = JSON.parse(data.data);
            setRecords(result);
            //console.log(result);
        } catch (error) {
            console.log(error);
            setNotify({
                isOpen: true,
                message: 'Details Updated Successfully',
                type: 'error'
            })
        }
        setRecordForEdit(null);
        setOpenPopup(false);
        setNotify({
            isOpen: true,
            message: 'Details Updated Successfully',
            type: 'success'
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    return (
        <>
            <PageHeader
                title="Requested Interviews"
                subTitle="Please review details and fix an online personal interviews with users."
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Search Employees"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                            (<TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.mobileNumber}</TableCell>
                                <TableCell>{item.requestDate}</TableCell>
                                <TableCell>{item.interviewDate}</TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                        color="primary"
                                        onClick={() => { setIsView(true); openInPopup(item) }}>
                                        <EyeOutlined fontSize="small" />
                                    </Controls.ActionButton>
                                    <Controls.ActionButton
                                        color="primary"
                                        onClick={() => { setIsView(false); openInPopup(item) }}>
                                        <EditOutlined fontSize="small" />
                                    </Controls.ActionButton>
                                </TableCell>
                            </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title={isView ? "User Details" : "Edit Meeting details"}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <UserPopup
                    recordForEdit={recordForEdit}
                    setIsLoading={setIsLoading}
                    isLoading={isLoading}
                    addOrEdit={addOrEdit}
                    isView={isView}
                />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}