import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { addLectures } from '../../Redux/Slices/lectureSlice';
import { AiOutlineArrowLeft } from "react-icons/ai"

function AddLecture() {
    const courseDetails = useLocation().state;
    console.log(courseDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput,setUserInput] = useState({
        courseId:courseDetails._id,
        title:"",
        description:"",
        lecture:undefined,
        videoSrc:"",
    });

    const handleUserInput = (e)=> {
        const {name,value} = e.target;

        setUserInput({
            ...userInput,
            [name]:value,
        });
    }

    const handleVideo = async (e)=> {
        const video = e.target.files[0];
        const source = window.URL.createObjectURL(video);
        console.log(video);
        console.log(source);

        setUserInput({
            ...userInput,
            lecture:video,
            videoSrc:source
        });
    }

    const handleFormSubmit = async (e)=> {
        e.preventDefault();

        if (!userInput.title || !userInput.description || !userInput.lecture) {
            toast.error("All fields are required");
            return;
        }

        const res = await dispatch(addLectures(userInput));
        console.log(res.payload);

        if (res.payload.success) {
            navigate(-1);
        }
    }

    useEffect(()=>{
        if (!courseDetails) {
            navigate("/courses");
        }
    },[])

  return (
    <>
        <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16">
            <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
                <header className="flex items-center justify-center relative">
                    <button onClick={()=>{navigate(-1)}} className="absolute left-2 text-xl text-green-500">
                        <AiOutlineArrowLeft />
                    </button>
                    <h1 className="text-xl text-yellow-500 font-semibold">
                        Add New Lecture
                    </h1>
                </header>
                <form noValidate onSubmit={handleFormSubmit} className="flex flex-col gap-3">
                    <input type="text"
                     name='title'
                     value={userInput.title}
                     placeholder='Enter your title...'
                     onChange={handleUserInput}
                     className="bg-transparent px-3 py-1 border"
                     />
                    <textarea name="description"
                     value={userInput.description}
                     placeholder='Enter the Description of the lecture...'
                     onChange={handleUserInput}
                     className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36"
                     />
                     {userInput.videoSrc ? (
                        <video
                         muted
                         src={userInput.videoSrc}
                         controls
                         controlsList='nodownload nofullscreen'
                         disablePictureInPicture
                         className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                         />
                     ) : (
                        <div className="h-48 border flex items-center justify-center cursor-pointer">
                            <label htmlFor="lecture" className="font-semibold text-cl cursor-pointer">Choose Your Video</label>
                            <input type="file" id='lecture' name='lecture' onChange={handleVideo} className='hidden' accept='video/*' />
                        </div>
                     )}
                     <button type='submit' className="btn btn-primary py-1 font-semibold text-lg">
                        Add New Lecture
                     </button>
                </form>
            </div>
        </div>
    </>
  )
}

export default AddLecture