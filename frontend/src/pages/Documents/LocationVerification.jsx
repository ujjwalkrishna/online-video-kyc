import React from "react";
import Button from 'react-bootstrap/Button';
import "./LocationVerification.css";
import { storeLatLng } from "../../http/index";
import { geolocated } from "react-geolocated";
import PropTypes from "prop-types";
import Bot from "../../assets/images/bot.jpg";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { setAuth } from '../../store/authSlice';
import SuccessfullyUploaded from "../../components/shared/SuccessfullyUploaded";

class Demo extends React.Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };
    render() {
        // const dispatch = useDispatch();
        const { location, history } = this.props;
        async function handleSubmit(locationLatitude, locationLongitude, setAuth) {
            try {
                const { data } = await storeLatLng({ locationLatitude, locationLongitude, setAuth })
                setAuth(data);
                history.push('/users/congratulations');
            } catch (error) {
                let message = error.response.data.message
                console.log(message);
            }
        }
        return !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <>
                <h1 className="congratulationsHeading" style={{ marginBottom: "40px" }}>Please verify your current location</h1>
                <p id="congoPra">Please allow us access to your current location</p>
                <div>Geolocation is not enabled</div>
                <div className="basicDetailsBottomImgDiv">
                    <img src={Bot} style={{ marginLeft: "2%" }} id="locBottomImg" />
                    <p className="basicDetailsText">Please allow us to verify your current location.</p>
                    <Button size="md" id="continueBtnLoc" onClick={() => handleSubmit(this.props.coords.latitude, this.props.coords.longitude, this.props.setAuth)} >
                        Submit
                    </Button>

                </div>
            </>
        ) : this.props.coords ? (
            <>
                <h1 className="congratulationsHeading" style={{ marginBottom: "40px" }}>Please verify your current location</h1>
                <p id="congoPra">Your current coordinates are as follows:</p>
                <p id="congoPra"><b>Latitude:</b> {this.props.coords.latitude}</p>
                <p id="congoPra"><b>Longitude:</b> {this.props.coords.longitude}</p>
                <div className="basicDetailsBottomImgDiv">
                    <img src={Bot} style={{ marginLeft: "2%" }} id="locBottomImg" />
                    <p className="basicDetailsText">Please allow us to verify your current location.</p>
                    <Button size="md" id="continueBtnLoc" onClick={() => handleSubmit(this.props.coords.latitude, this.props.coords.longitude, this.props.setAuth)} >
                        Submit
                    </Button>

                </div>
            </>
        ) : (
            <div>Getting the location data&hellip; </div>
        );
    }
}
const ShowTheLocationWithRouter = withRouter(Demo);

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(connect(null, { setAuth })(ShowTheLocationWithRouter));