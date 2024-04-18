import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { deleteLecture, getLectures } from "../../Redux/Slices/lectureSlice";
import { getCourses } from "../../Redux/Slices/courseSlice";
import { useLocation, useNavigate } from "react-router-dom";

function DisplayLectures() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const dispatch = useDispatch();
    const lectures = useSelector((state)=>state?.lectures?.lectures);
    const {role} = useSelector((state)=>state?.auth);
    console.log(role);
    console.log(state);
    console.log(lectures);

    const [currentVideo,setCurrentVideo] = useState(0);

    const handleDelete = async (lectureId,courseId)=> {
        console.log(lectureId,courseId);
        const res = await dispatch(deleteLecture({courseId:courseId,lectureId:lectureId}));
        console.log(res);
        await dispatch(getLectures(courseId));
    }

    useEffect(()=>{
        if (!state) {
            navigate("/courses");
        }
        dispatch(getLectures(state?._id));
    },[]);
  return (
    <>
        <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-wihte mx-[5%]">
            <div className="text-center text-2xl font-semibold text-yellow-500">
                Course Name: {state.title}
            </div>
            {(lectures && lectures.length>0) ?
            (<div className="flex justify-center gap-10 w-full">
                <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                    <video src={lectures && lectures[currentVideo]?.lectures?.secure_url}
                     controls
                     disablePictureInPicture
                     muted
                     controlsList="nodownload"
                     className="object-fill rounded-tl-lg rounded-tr-lg w-full" 
                    >

                    </video>
                    <div>
                        <h1>
                            <span className="text-yellow-500">Title: {" "}</span>
                            {lectures && lectures[currentVideo]?.title}
                        </h1>
                        <p>
                            <span className="text-yellow-500 line-clamp-4">Description: {" "}</span>
                            {lectures && lectures[currentVideo]?.description}
                        </p>
                    </div>
                </div>
                <div>
                    <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                        <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                            <p>Lecture List</p>
                            {role === "ADMIN" && (
                            <button onClick={()=>navigate("/add/lecture",{state: {...state}})} className="btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                                Add Lecture
                            </button>
                            )}
                        </li>
                            {lectures && lectures.map((lecture,idx)=>(
                                <li  className="space-y-2" key={lecture._id}>
                                    <p className="cursor-pointer" onClick={()=> setCurrentVideo(idx)}>
                                        <span>Lecture {idx+1} : {" "}</span>
                                        {lecture.title}
                                    </p>
                                    {role === "ADMIN" && (
                                        <button onClick={()=>{handleDelete(state?._id,lecture?._id)}} className="btn-accent px-2 py-1 rounded-md font-semibold text-sm">
                                            Delette Lecture
                                        </button>
                                    )}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>): (
                role === "ADMIN" && (
                    <button onClick={()=>navigate("/add/lecture",{state: {...state}})} className="btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                        ADD New Lecture
                    </button>
                )
            )}
        </div>
    </>
  )
}

export default DisplayLectures