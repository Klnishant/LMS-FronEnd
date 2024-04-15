import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { createCourse } from '../../Redux/Slices/courseSlice';
import { TiImageOutline } from "react-icons/ti";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CreateCourse() {
    const [courseData, setCourseData] = useState({
        title:"",
        description:"",
        category:"",
        createdBy:"",
        thumbnail:"",
    });

    const [priviewImage,setPreviewImage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUserInput = (e)=> {
        const {name,value} = e.target;

        setCourseData({
            ...courseData,
            [name]:value,
        });
    }

    const handleImage = (e)=>{
        e.preventDefault();
        const uploadImage = e.target.files[0];

        if (uploadImage) {
            setCourseData({
                ...courseData,
                thumbnail:uploadImage,
            });
        }

        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadImage);
        fileReader.addEventListener("load",function (){
            setPreviewImage(this.result);
        });
    }

    const handleFormData = async (e)=>{
        e.preventDefault();

        if ([courseData.title,courseData.description,courseData.category,courseData.createdBy,courseData.thumbnail].some((fields)=>{fields.trim === ""})) {
            toast.error("All fields are mandatory");
        }

        const formData = new FormData();
        formData.append("title",courseData.title);
        formData.append("description",courseData.description);
        formData.append("category",courseData.category);
        formData.append("createdBy",courseData.createdBy);
        formData.append("thumbnail",courseData.thumbnail);

        const res = await dispatch(createCourse(formData));

        if (res?.payload?.success) {
            navigate("/course");
        }
    }
  return (
    <>
        <div className='flex overflow-x-auto items-center justify-center h-[100vh]'>
            <form noValidate onSubmit={handleFormData} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
                <Link className="absolute  top-28 text-2xl link text-accent cursor-pointer">
                    <AiOutlineArrowLeft />
                </Link>
                <h3 className="text-center text-2xl font-bold">Create Course</h3>
                <label htmlFor="uploadImage" className="cursor-pointer">
                    {priviewImage ? (<img src={priviewImage} className="w-24 h-24  m-auto" />) : (<TiImageOutline className="w-24 h-24 m-auto " />)}
                </label>
                <input
                 type="file"
                 name='uploadImage'
                 id='uploadImage'
                 onChange={handleImage}
                 accept='.jpg,.jpeg,.png,.svg'
                 className='hidden'
                />

                <div className='flex flex-col gap-1'>
                    <label htmlFor="title" className='font-semibold'>Title</label>
                    <input
                     type="text"
                     name='title'
                     id='title'
                     onChange={handleUserInput}
                     value={courseData.title}
                     placeholder='Enter Title...'
                     required
                     className="bg-transparent px-2 py-1 border"
                      />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="description" className='font-semibold'>Description</label>
                    <input
                     type="text"
                     id='description'
                     name='description'
                     onChange={handleUserInput}
                     value={courseData.description}
                     required
                     placeholder='Enter Description...'
                     className="bg-transparent px-2 py-1 border"
                      />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="category" className='font-semibold'>Category</label>
                    <input
                     type="text"
                     id='category'
                     name='category'
                     onChange={handleUserInput}
                     value={courseData.category}
                     placeholder='Enter Your Category...'
                     required
                     className="bg-transparent px-2 py-1 border"
                      />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="createdBy" className='font-semibold'>Created By</label>
                    <input
                     type="text"
                     id='createdBy'
                     name='createdBy'
                     onChange={handleUserInput}
                     required
                     placeholder='Enter Your Name...'
                     className="bg-transparent px-2 py-1 border"
                      />
                </div>
                <button type="submit" className="w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300">
                    Create Course
                </button>

            </form>
        </div>
    </>
  )
}

export default CreateCourse;