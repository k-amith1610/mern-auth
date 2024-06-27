import React, { useEffect, useState } from 'react'

const Home = () => {
    const [imgUrl, setImgUrl] = useState("");

    useEffect(() => {
        const setImg = () => {
            setImgUrl("https://static1.cbrimages.com/wordpress/wp-content/uploads/2024/01/solo-leveling-sung-jinwoo-rises-to-the-occasion.jpg");
        }
        setImg();
    }, [])

    const handleClick = () => {
        setImgUrl(prevUrl =>
            prevUrl === "https://static1.cbrimages.com/wordpress/wp-content/uploads/2024/01/solo-leveling-sung-jinwoo-rises-to-the-occasion.jpg"
                ? "https://preview.redd.it/everything-about-solo-leveling-anime-is-great-so-far-my-v0-puoz37wt5udc1.png?width=640&crop=smart&auto=webp&s=2ffa010e9fd71a6c1dea8b29fec37218abe7cd34"
                : "https://static1.cbrimages.com/wordpress/wp-content/uploads/2024/01/solo-leveling-sung-jinwoo-rises-to-the-occasion.jpg"
        );
    }
    return (
        <div className='h-screen flex justify-center items-center'>
            <img src={imgUrl} onClick={handleClick} className='w-96 cursor-pointer' alt="" />
        </div>
    )
}

export default Home
