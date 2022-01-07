import React from "react";
import { NavLink } from "react-router-dom";
import "./SideNavbar.css";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { useSelector } from 'react-redux';

const SideNavbar = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <div id="sideNavbody">
            <div id="sideNavbar">
                <div className="SideNavList">
                    <NavLink className="link" to="/users/basic-details" activeClassName="active1"><h1>Basic Details {user && user.permanentAddress && <CheckCircleTwoTone style={{float: "right", marginRight: "5%"}} twoToneColor="#52c41a" />}</h1> </NavLink>
                    <NavLink className="link" to="/users/aadhar-details" activeClassName="active1"><h1>Aadhar Details {user && user.aadharFront && <CheckCircleTwoTone style={{float: "right", marginRight: "5%"}} twoToneColor="#52c41a" />}</h1></NavLink>
                    <NavLink className="link" to="/users/pan-details" activeClassName="active1"><h1>Pan Details {user && user.panFront && <CheckCircleTwoTone style={{float: "right", marginRight: "5%"}} twoToneColor="#52c41a" />}</h1></NavLink>
                    <NavLink className="link" to="/users/cheque-details" activeClassName="active1"><h1>Bank Account Details {user && user.bankAccountNumber && <CheckCircleTwoTone style={{float: "right", marginRight: "5%"}} twoToneColor="#52c41a" />}</h1></NavLink>
                    <NavLink className="link" to="/users/signature" activeClassName="active1"><h1>Digital Signature {user && user.signatureUrl && <CheckCircleTwoTone style={{float: "right", marginRight: "5%"}} twoToneColor="#52c41a" />}</h1></NavLink>
                    <NavLink className="link" to="/users/photo-verification" activeClassName="active1"><h1>Photo Verification {user && user.userPhotoUrl && <CheckCircleTwoTone style={{float: "right", marginRight: "5%"}} twoToneColor="#52c41a" />}</h1></NavLink>
                    <NavLink className="link" to="/users/loc-verification" activeClassName="active1"><h1>Location Verification {user && user.locationLatitude && <CheckCircleTwoTone style={{float: "right", marginRight: "5%"}} twoToneColor="#52c41a" />}</h1></NavLink>
                    <NavLink className="link" to="/users/congratulations" activeClassName="active1"><h1>Congratulations</h1></NavLink>
                </div>
            </div>
        </div>
    )
}

export default SideNavbar
