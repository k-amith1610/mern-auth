import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useRef } from "react";
import { MdEdit } from "react-icons/md";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
const Profile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const fileRef = useRef(null);
    const [image, setImage] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [formData, setFormData] = useState({});
    // console.log(formData);

    useEffect(() => {
        if (image) {
            handleFileUpload(image);
        }
    }, [image]);

    const handleFileUpload = async (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePercent(Math.round(progress));
            },
            (error) => {
                setImageError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        setFormData((prevFormData) => ({ ...prevFormData, profilePicture: downloadURL }));
                    });
            }
        );
    };


    // console.log(image);
    return (
        //     allow read;
        //   allow write: if
        //   request.resource.size < 2 * 1024 * 1024 &&
        //   request.resource.contentType.matches("image/.*")
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-center text-2xl font-semibold my-6"><span className="border p-2 border-red-500 bg-slate-800 text-white border-y-[2px] border-x-[9px] rounded-full">_Profile_</span></h1>
            <form className="flex flex-col gap-4">
                <input onChange={(e) => setImage(e.target.files[0])} hidden type="file" ref={fileRef} accept="image/*" />
                <div className='flex justify-center items-center'>
                    <img onClick={() => fileRef.current.click()} src={formData.profilePicture || currentUser.profilePicture} className="w-28 h-28 border-red-500 border-y-4 border-x-4 rounded-full self-center cursor-pointer" alt="" />
                    <span className="absolute mt-20 ml-20 rounded-full bg-red-600 p-1"><MdEdit className="text-red-100" /></span>
                </div>
                <p className="self-center">{imageError ? (
                    <span className="text-red-500 text-sm font-semibold">Error: Please upload an image file under 2MB</span>) : (
                    imagePercent > 0 && imagePercent < 100 ? (
                        <span className="text-slate-800 font-semibold">{`Uploading: ${imagePercent}%`}</span>
                    ) : imagePercent === 100 ? (
                        <span className="text-green-500 font-semibold">Image Uploaded Successfully!!</span>
                    ) : ""
                )}</p>
                <input defaultValue={currentUser.username} type="text" id="username" placeholder="Username" className="outline-none bg-slate-100 rounded-lg p-3 text-lg font-semibold" />
                <input defaultValue={currentUser.email} type="email" id="email" placeholder="Email" className="outline-none bg-slate-100 rounded-lg p-3 text-lg" />
                <input type="password" id="password" placeholder="Password" className="outline-none bg-slate-100 rounded-lg p-3 text-lg" />
                <button className="uppercase font-bold border bg-slate-700 text-white rounded-lg p-3 hover:bg-opacity-95">update</button>
            </form>
            <div className="flex justify-between mt-3">
                <span className="border p-2 rounded-lg border-slate-600 border-y-4 border-x-4 hover:opacity-90 cursor-pointer bg-red-400 font-semibold">Delete Account</span>
                <span className="border p-2 rounded-lg border-slate-600 border-y-4 border-x-4 hover:opacity-90 cursor-pointer bg-green-400 font-semibold">Sign out</span>
            </div>
        </div>
    )
}

export default Profile
