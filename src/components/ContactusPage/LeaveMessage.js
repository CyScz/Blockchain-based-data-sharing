import React, { useState } from "react";
import '../../styles/Contactus.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMediaQuery } from 'react-responsive';

const FORM_ENDPOINT = ""; // TODO - fill on the later step


function LeaveMessage() {

    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = () => {
        setTimeout(() => {
        setSubmitted(true);
        }, 100);
    };

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1068px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1067px)'})

    return (
        <div className="message-layout">
            <h1>Leave us a message !</h1>
            <hr className="hr-style"></hr>
            <form
                action={FORM_ENDPOINT}
                onSubmit={handleSubmit}
                method="POST"
                target="_blank"
            >

                <div className="form-layout mb-4 pt-0">
                    <input
                    type="text"
                    placeholder="Your name"
                    name="name"
                    className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    required
                    />
                </div>

                <div className="mb-4 pt-0">
                    <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    required
                    />
                </div>

                <div className="mb-4 pt-0">
                    <textarea
                    placeholder="Your message"
                    cols="50"
                    name="message"
                    className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    required
                    />
                </div>

                <div className="form-layout mb-3 pt-0">
                    <button
                    className="bg-blue-500 text-black active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    >
                        Send a message
                    </button>
                </div>
            </form>
        </div>
    );

}

export default LeaveMessage;