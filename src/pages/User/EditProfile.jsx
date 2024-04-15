import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';
import { getProfile, updateProfile } from '../../Redux/Slices/AuthSlice';
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";

function EditProfile() {
    const dispatch = useDispatch();
    const userData = useSelector((state)=>state?.auth?.data);
    const navigate = useNavigate();

    const [data,setData] = useState({
        fullName:"",
        email:"",
    });

    const [previewImage,setPreviewImage] = useState("");

    const handleUserInput = async (e)=>{
       const {name,value} = e.target;
       setData({
        ...data,
        [name] : value,
       });
    }

    const handleImage = (e)=> {
        e.preventDefault();
        const uploadImage = e.target.files[0]

        if (uploadImage) {
            setData({
                ...data,
                avatar:uploadImage
            });

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener("load",function (){
                setPreviewImage(this.result);
            });
        }
    }

    const handleUpdate = async (e)=> {
        e.preventDefault();

        if (!(data.fullName || data.email)) {
            toast.error("At least one field are mandatory");
        }

        const formData = new FormData();
        formData.append("fullName",data.fullName);
        formData.append("email",data.email);
        formData.append("avatar",data.avatar);

        const res = await dispatch(updateProfile(formData));
        console.log(res);

        if (res?.payload?.success) {
            navigate("/profile");
        }
    }
  return (
    <>
        <div className="flex items-center justify-center h-[100vh]">
            <form noValidate
             onSubmit={handleUpdate}
             className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
             >
                <h1 className="text-center text-2xl font-semibold">Update Profile</h1>
                <label htmlFor="image_upload" className="cursor-pointer">
                    {previewImage ? (<img src={previewImage} className="w-24 h-24 rounded-full m-auto" />) : (<BsPersonCircle className="w-24 h-24 rounded-full m-auto" />)}
                </label>
                <input type="file"
                 name='image_upload'
                 id='image_upload'
                 onChange={handleImage}
                 accept='.jpg,.jpeg,.png,.svg'
                 className='hidden'
                 />
                <div className="flex flex-col gap-1">
                    <label htmlFor="fullName" className="text-lg font-semibold">FullName</label>
                    <input type="text"
                     name='fullName'
                     id='fUllName'
                     value={data.fullName}
                     placeholder='Enter FullName...'
                     onChange={handleUserInput}
                     className="bg-transparent px-2 py-1 border"
                     />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-lg font-semibold">Email</label>
                    <input type="email"
                     name='email'
                     id='email'
                     value={data.email}
                     placeholder='Enter Email..'
                     onChange={handleUserInput}
                     className="bg-transparent px-2 py-1 border"
                     />
                </div>
                <button type='submit' className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer">
                    Update Profile
                </button>
                    <Link to="/profile">
                        <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
                            <AiOutlineArrowLeft /> Go back to profile
                        </p>
                    </Link>
            </form>
        </div>
    </>
  )
}

export default EditProfile