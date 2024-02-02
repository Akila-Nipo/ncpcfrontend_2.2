import React, {useContext, useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";

import bkash from "../Assets/Images/bkash.jpg";
import InfoDiv from "../MyComponents/InfoDiv";
import FormValidationAlert from "../MyComponents/FormValidataionAlert";
import FormSuccessAlert from "../MyComponents/FormSuccessAlert";
import {Navigate} from "react-router-dom";
import FormContext from "./Context/FormContext";
import axios from "axios";
import PaymentView from "../Payment/PaymentView";


function Payment({fourthCall,valid,response,postDataToBackend,submit}) {
    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [clicked, setClicked] = useState(false);
    const [payTeamExist, setPayTeamExist] = useState(false);

    const {data} = useContext(FormContext);
    const teamName = data.teamName;

    const authenticate = async (e) => {
        e.preventDefault();
        setClicked(true)

        try {
            const response = await axios.get(`https://pc.cse.juniv.edu/api/bkash/payment/create/${teamName}` );
            console.log(response.data);
            if(response.data==="Team already exist please change your team name"){
                setPayTeamExist(true);
                return;
            }
            setUrl(response.data);
            setClicked(false);
        } catch (error) {
            console.error("Error during authentication:", error);
        }
    };

    useEffect(() => {
        if (url) {
            setLoading(false);
            window.open(url, '_blank');
        }
    }, [url]);

    return (
        <Container fluid="true" className=" mt-4 mb-3 responsiveRegi pt-4">
            <InfoDiv info="Payment" gradient='linear-gradient(45deg, #1a237e 30%, #283593 90%)'/>
            <h4 className="title mx-3 mt-5 text-dark">Payment Instructions </h4>
            <h5 className="description mx-5 mt-3 text-dark">1. Payment will start soon. </h5>
            <h5 className="description mx-5 text-dark">2. Please submit your registration. </h5>
            {/*<h4 className="description text-dark">1. <b>Check the information. Make sure emails are valid.</b> </h4>*/}
            {/*<h5 className="description mt-3  text-dark">2. Click the BKash image button.</h5>*/}
            {/*<h5 className="description text-dark">3. Complete payment. Please do not close the current tab.</h5>*/}
            {/*<h5 className="description text-dark">4. Come back to this tab once your payment is successful. </h5>*/}

            {/*<h5 className="description text-dark">6. Do not refresh the browser. </h5>*/}
            {/*<h5 className="description text-dark">7. Press submit once everything is done. </h5>*/}
            {/*<h5 className="title mt-3 text-dark"> When registration is successful, you will get an email confirmation.</h5>*/}
            <div className="m-5 text-center">
                {/*{*/}
                {/*   !payTeamExist && loading && clicked ?<div>loading...</div>: <img onClick={authenticate} className="PaymentImg" src={bkash} alt=""/>*/}
                {/*}*/}
                {
                   !payTeamExist && loading && clicked ?<div>loading...</div>:<PaymentView authenTicate={authenticate}/>
                }
                {
                    payTeamExist && clicked && (
                        <div className="mt-4">
                            <FormValidationAlert info="Team already exist please change your team name."/>
                        </div>
                    )
                }
            </div>

            {
                 !response && submit && (
                    <div className="mt-3">
                        <FormValidationAlert info="Loading..." gradient='linear-gradient(45deg, #1a237e 30%, #283593 90%)'/>
                    </div>
                )
            }

            {
                 response==="Team already exist please change your team name" && (
                    <div className="mt-4">
                        <FormValidationAlert info={response}/>
                    </div>
                )
            }
            {
                response==="Payment not completed." && (
                    <div className="mt-4">
                        <FormValidationAlert info={response}/>
                    </div>
                )
            }
            {
                 response==="Registration Successful." && (
                    <div className="mt-4 text-white">
                        <FormSuccessAlert info="Registration Successful. Please check your E-mail"/>
                        {
                            setTimeout(function (){
                                window.location.href="https://pc.cse.juniv.edu"
                            },3000)
                        }

                    </div>
                )
            }

            <div className="d-flex position-relative">
                <Button className="backBtn" onClick={fourthCall} >Back</Button>
            </div>
            <div className="text-center">
                <button
                    className="submitBtn btn btn-success"
                    onClick={postDataToBackend}
                    // disabled={registrationOff}
                >
                    Submit
                </button>
            </div>
        </Container>
    );
}

export default Payment;
