import React, { useState } from 'react';
import Bot from "../../assets/images/bot.jpg";
import Button from 'react-bootstrap/Button';
import { reqAppointment } from "../../http/index";
import "./Congratulations.css";
import { useSelector, useDispatch } from 'react-redux';
import Notification from '../../components/Notification/Notification';
import SuccessfullyUploaded from "../../components/shared/SuccessfullyUploaded";

const Congratulations = () => {
    const [isLoading, setLoading] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const { user } = useSelector((state) => state.auth);

    async function handleClick() {
        setLoading(true);
        try {
            const { data } = await reqAppointment();
            console.log(data);
            setLoading(false);
            setNotify({
                isOpen: true,
                message: "You have successfully requested for appointment",
                type: 'success'
            })
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
    return (
        <>
            {user && user.permanentAddress && user.aadharFront && user.panFront && user.bankAccountNumber && user.signatureUrl && user.userPhotoUrl && user.locationLatitude ? (<div>
                <h1 className="congratulationsHeading">Congratulations !!</h1>
                <p id="congoPra">You have successfully uploaded all the documents !!</p>
                <div className="dongratulationsDiv">
                    <div id="congoBotdiv">
                        <img src={Bot} id="congoImg" />
                    </div>
                    <div id="congoBotdivText">
                        <p className="congBotText">Now, next step is personal video interview with our agent. Please click on request interview button for an appointment.</p>
                        <Button disabled={isLoading} variant="primary" size="lg" id="startVideoBtn" onClick={handleClick}>
                            {isLoading ? 'Submitting...' : 'Request Interview'}
                        </Button>
                    </div>
                </div>
            </div>) :
                (<div>
                    <h1 className="congratulationsHeading">All documents required</h1>
                    <p id="congoPra">You have not uploaded all the documents. Please upload all the documents!!</p>
                    <div className="dongratulationsDiv">
                        <div id="congoBotdiv">
                            <img src={Bot} id="congoImg" />
                        </div>
                        <div id="congoBotdivText" style={{marginTop: "5%"}}>
                            <p className="congBotText">Next step will be personal video interview with our agent. So please fill all the required fields before procedding on this page. Then request appointment for video verification.</p>
                        </div>
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

export default Congratulations
