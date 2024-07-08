import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">About MERN Auth</h1>
                <p className="text-gray-700 mb-4">
                    Welcome to MERN Auth! This website is designed to demonstrate authentication functionalities,
                    including sign-in and sign-out. It also features OAuth integration with Google Firebase for seamless
                    sign-in and sign-up processes.
                </p>
                <p className="text-gray-700 mb-4">
                    Our goal is to provide a simple and effective authentication solution using the MERN stack (MongoDB,
                    Express, React, Node.js) along with Firebase for OAuth.
                </p>
                <p className="text-gray-700">
                    Feel free to explore and test the authentication features. We hope this serves as a helpful
                    resource for understanding and implementing authentication in your own projects.
                </p>
            </div>
        </div>
    );
}

export default About;
