import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import waiterSmile from "../../assets/img/waiter-smile.svg"

export default function Contact({ job }) {
    const [emailSent, setEmailSent] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(
            process.env.REACT_APP_EMAILJS_SERVICE_ID,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            e.target,
            process.env.REACT_APP_EMAILJS_USER_ID
        )
            .then((result) => {
                console.log(result.text);
            })
            .catch((err) => console.log(err));
        e.target.reset();
        setEmailSent(true);
    };


    return (
        <>
            {emailSent ? (
                <div className="alert text-center" role="alert">
                    Your message was sent!

                    <img
                        alt=""
                        src={waiterSmile}
                        width="150"
                        height="150"
                        className=""
                    />
                </div>
            ) : (
                <div className="container contact-form-freelancer">
                    <h4>Contact the Company</h4>
                    <form
                        onSubmit={sendEmail}
                    >
                        <div className="form-row align-items-center">
                            <div className="form-group col-auto">
                                <label htmlFor="name">Company Name</label>
                                <input
                                    type="text"
                                    name="to_name"
                                    className="form-control"
                                    value={job.created_by.company_Name}
                                    readOnly
                                />
                            </div>
                            <div className="form-group col-auto">
                                <label htmlFor="email">Company Email</label>
                                <input
                                    type="email"
                                    name="to_email"
                                    className="form-control"
                                    value={job.created_by.email}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="form-row align-items-center">
                            <div className="form-group col-auto">
                                <label htmlFor="name">Your Name</label>
                                <input
                                    type="text"
                                    name="from_name"
                                    className="form-control"
                                    placeholder="Max Mustermann"
                                    maxLength="50"
                                    required
                                />
                            </div>
                            <div className="form-group col-auto">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    name="from_email"
                                    className="form-control"
                                    placeholder="max@mustermann.com"
                                    maxLength="50"
                                />
                            </div>

                        </div>
                        <div className="form-row">
                            <div className="form-group col-auto">
                                <label htmlFor="phone">Contact Number</label>
                                <input
                                    type="tel"
                                    name="from_phone"
                                    className="form-control"
                                    placeholder="+49 123456789"
                                    maxLength="20"
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    type="textarea"
                                    name="from_message"
                                    className="form-control"
                                    placeholder="Message"
                                    required
                                    rows={5}
                                    maxLength={500}
                                />
                            </div>
                        </div>
                        <div className="text-end m-2">
                            <button
                                type="submit"
                                className="btn btn-outline-secondary col-3 "
                                value="Send"
                            >Send</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}