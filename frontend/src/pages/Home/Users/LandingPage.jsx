import React from "react";
import './LandingPage.css';
import TopImg from "../../../assets/images/main image.jpg";
import Bot from "../../../assets/images/bot.png";
import iconTwo from "../../../assets/images/Group 5.png";
import { Link, useHistory } from "react-router-dom";
import iconThree from "../../../assets/images/Group 7.png";
import iconFour from "../../../assets/images/Group 9.png";
import Testomonial from "../../Documents/Testomonial"
import { useSelector } from 'react-redux';

const LandingPage = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <div className="flex-main">
        <div className="flex-left">
          <h1 className="topHeading">Verify Your<br /> KYC Online in<br /> Minutes!!!</h1>
        </div>
        <div className="flex-right">
          <img src={TopImg} className="topImg" />
        </div>
      </div>
      <div className="div_2">
        <div className="botImgSection">
          <img src={Bot} className="botImg" />
        </div>
        <div className="botMsg">
          <h2 className="botMsgText">Hello {user ? user.name+' ': ""}!! <br />Let's Verify your KYC !!</h2>
        </div>
      </div>
      <div className="iconsSection">
        <div id="iconOne">
         <img src={iconTwo} className="iconTwo" />
          <img src={iconThree} className="iconThree" />
          <img src={iconFour} className="iconFour" />
        </div>
      </div>
      <div id="iconText">
        <h1 className="iconTextOne">Upload <br /> Documents</h1>
        <h1 className="iconTextTwo">Request video <br /> verification </h1>
        <h1 className="iconTextTwo">Credit <br /> worthiness </h1>
      </div>
      <Testomonial />
    </div>
  )
}

export default LandingPage