import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import Customer_1 from "../../assets/images/customer 4.png";
import StarImg from "../../assets/images/pngfind 1.png";
import LocationOnOutlined from '@material-ui/icons/LocationOnOutlined';
import Customer_2 from "../../assets/images/customer 2.png";
import Customer_3 from "../../assets/images/customer 3.png";
import Customer_4 from "../../assets/images/customer 1.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Testimonial.css";

const Testimonial = () => {
    return (
        <div>
            <div>
                <h1 className="topHeadingTestomonial"> Happy Customer's Review </h1>
            </div>

            <div id="testomonialCards">
                <Card style={{ width: '19rem' }} className="card_Body">
                    <Card.Img variant="top" src={Customer_1} id="customer_1_Img" />
                    <Card.Body>
                        <Card.Title className="cardTitle">Shubham Joshi</Card.Title>
                        <img src={StarImg} className="starImg" />
                        <div className="location">
                            <LocationOnOutlined />
                            <h1>Mumbai,India</h1>
                        </div>

                        <Card.Text className="cardText">
                            Such a great experience to verify my KYC Online.It was really quick and the agent
                            was very friendly.Definitely going to recommend It to my friends!!
                        </Card.Text>

                    </Card.Body>
                </Card>
                {/* Second Card */}

                <Card style={{ width: '20rem' }} id="card_2" className="card_Body">
                    <Card.Img variant="top" src={Customer_2} id="customer_2_Img" />
                    <Card.Body>
                        <Card.Title className="cardTitle">Shubham Joshi</Card.Title>
                        <img src={StarImg} className="starImg" />
                        <div className="location">
                            <LocationOnOutlined />
                            <h1>Mumbai,India</h1>
                        </div>

                        <Card.Text className="cardText">
                            Such a great experience to verify my KYC Online.It was really quick and the agent
                            was very friendly.Definitely going to recommend It to my friends!!
                        </Card.Text>

                    </Card.Body>
                </Card>
                {/* Third Card */}
                <Card style={{ width: '20rem' }} id="card_2" className="card_Body">
                    <Card.Img variant="top" src={Customer_3} id="customer_2_Img" />
                    <Card.Body>
                        <Card.Title className="cardTitle">Shubham Joshi</Card.Title>
                        <img src={StarImg} className="starImg" />
                        <div className="location">
                            <LocationOnOutlined />
                            <h1>Mumbai,India</h1>
                        </div>

                        <Card.Text className="cardText">
                            Such a great experience to verify my KYC Online.It was really quick and the agent
                            was very friendly.Definitely going to recommend It to my friends!!
                        </Card.Text>

                    </Card.Body>
                </Card>
                {/* Four Card */}
                <Card style={{ width: '20rem' }} id="card_2" className="card_Body">
                    <Card.Img variant="top" src={Customer_4} id="customer_2_Img" />
                    <Card.Body>
                        <Card.Title className="cardTitle">Shubham Joshi</Card.Title>
                        <img src={StarImg} className="starImg" />
                        <div className="location">
                            <LocationOnOutlined />
                            <h1>Mumbai,India</h1>
                        </div>

                        <Card.Text className="cardText">
                            Such a great experience to verify my KYC Online.It was really quick and the agent
                            was very friendly.Definitely going to recommend It to my friends!!
                        </Card.Text>

                    </Card.Body>
                </Card>


            </div>
            <div id="commentSection">
                <textarea rows="4" cols="120" id="testomonialTextArea">
                </textarea>
                <Button variant="primary" id="testomonialBtn">Enter </Button>{' '}

            </div>
        </div>
    )
}

export default Testimonial
