import React, { useState } from "react";
import '../../styles/Contactus.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const FORM_ENDPOINT = ""; // TODO - fill on the later step

function LeaveMessageMobile() {

    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = () => {
        setTimeout(() => {
        setSubmitted(true);
        }, 100);
    };

    return (
        <div className="message-layout-mobile">
            <h1 className="form-layout-mobile ">Leave us a message !</h1>
            <hr className="hr-style"></hr>
            <form
                action={FORM_ENDPOINT}
                onSubmit={handleSubmit}
                method="POST"
                target="_blank"
            >

                <div className="form-layout-mobile-mt mb-4 pt-0">
                    <input
                    type="text"
                    placeholder="Your name"
                    name="name"
                    className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    required
                    />
                </div>

                <div className="form-layout-mobile mb-4 pt-0">
                    <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    required
                    />
                </div>

                <div className="form-layout-mobile mb-4 pt-0">
                    <textarea
                    placeholder="Your message"
                    cols="22"
                    name="message"
                    className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    required
                    />
                </div>

                <div className="form-layout-mobile mb-3 pt-0">
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

export default LeaveMessageMobile;