import React, { useEffect, useState } from 'react';
import Meteors from "../components/magicui/meteors";
import ShineBorder from '../components/magicui/shine-border';
import IconCloud from "../components/magicui/icon-cloud";

const slugs = [
    "typescript",
    "javascript",
    "dart",
    "java",
    "react",
    "angular",
    "svelte",
    "jquery",
    "bootstrap",
    "tailwindcss",
    "sass",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "nestjs",
    "django",
    "flask",
    "springboot",
    "mongodb",
    "mysql",
    "sqlite",
    "postgresql",
    "firebase",
    "nginx",
    "docker",
    "kubernetes",
    "git",
    "github",
    "gitlab",
    "bitbucket",
    "visualstudiocode",
    "androidstudio",
    "xcode",
    "postman",
    "swagger",
    "jira",
    "confluence",
    "figma",
];


const Home = () => {
    const [imgUrl, setImgUrl] = useState("");

    useEffect(() => {
        // Initial image URL
        setImgUrl("https://static1.cbrimages.com/wordpress/wp-content/uploads/2024/01/solo-leveling-sung-jinwoo-rises-to-the-occasion.jpg");
    }, []);

    const handleClick = () => {
        // Toggle between two image URLs
        setImgUrl(prevUrl =>
            prevUrl === "https://static1.cbrimages.com/wordpress/wp-content/uploads/2024/01/solo-leveling-sung-jinwoo-rises-to-the-occasion.jpg"
                ? "https://preview.redd.it/everything-about-solo-leveling-anime-is-great-so-far-my-v0-puoz37wt5udc1.png?width=640&crop=smart&auto=webp&s=2ffa010e9fd71a6c1dea8b29fec37218abe7cd34"
                : "https://static1.cbrimages.com/wordpress/wp-content/uploads/2024/01/solo-leveling-sung-jinwoo-rises-to-the-occasion.jpg"
        );
    };

    return (
        <div className='fixed h-screen flex justify-center items-center'>

            {/* Main content container */}
            <div className='flex flex-col md:flex-row md:space-x-32 justify-between items-center w-full h-full p-3'>
                {/* Meteors component */}
                <Meteors number={30} />
                {/* IconCloud component */}
                <IconCloud iconSlugs={slugs} />

                {/* Image and text container */}
                <div className='flex flex-col items-center justify-center overflow-y-auto max-h-full md:ml-50'>
                    <ShineBorder
                        className="text-center text-2xl font-bold capitalize"
                        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                    >
                        <img src={imgUrl} onClick={handleClick} className={`${imgUrl === "https://static1.cbrimages.com/wordpress/wp-content/uploads/2024/01/solo-leveling-sung-jinwoo-rises-to-the-occasion.jpg" ? "w-[600px]" : "w-[310px]"} cursor-pointer`} alt="" />
                        <p className='text-sm mt-2 cursor-pointer'>Click me</p>
                    </ShineBorder>
                </div>
            </div>
        </div>
    );
};

export default Home;
