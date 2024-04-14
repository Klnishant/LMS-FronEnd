import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';
import { createAccount } from '../Redux/Slices/AuthSlice';
import { BsPersonCircle } from "react-icons/bs";

function SignUp() {
  const [signUpData,setSignUpData] = useState({
    fullName:"",
    email:"",
    password:"",
  })

  const [previewImage,setPreviewImage] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserInput = (e)=>{
    const {name,value}=e.target;
    setSignUpData({
      ...signUpData,
      [name]:value,
    });
  }

  const handleImage = (e)=>{
    e.preventDefault();
    const uploadImage = e.target.files[0];

    if (uploadImage) {
      setSignUpData({
        ...signUpData,
        avatar:uploadImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load",function (){
      setPreviewImage(this.result);
      });
    }
  }

  const cresteNewAccount = async (e)=> {
    e.preventDefault();

    if (!fullName || !email || !password) {
      toast.error("All fields are mandatory");
      return;
    }

    const formData = new FormData();
    formData.append("fullName",signUpData.fullName);
    formData.append("email",signUpData.email);
    formData.append("password",signUpData.password);
    formData.append("avatar",signUpData.avatar);

    const res = await dispatch(createAccount(formData));

    if (res?.payload?.success) {
      navigate("/");
    }

    setSignUpData({
      fullName:"",
      email:"",
      password:"",
      avatar:"",
    });

    setPreviewImage("");
  }
  return (
    <>
      <div className='flex overflow-x-auto items-center justify-center h-[100vh]'>
          <form noValidate onSubmit={cresteNewAccount} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]' >
            <h1 className="text-center text-2xl font-bold">Registration Page</h1>
            <label htmlFor="image_upload" className="cursor-pointer">
              {previewImage ? (<img src={previewImage} className="w-24 h-24 rounded-full m-auto" />) : (<BsPersonCircle className="w-24 h-24 rounded-full m-auto" />)}
            </label>
            <input type="file"
             name='image_upload'
             id='image_upload'
             onChange={handleImage}
             accept='.jpg,.jpeg,.png,.svg'
             className='hidden' />
            <div className='flex flex-col gap-1'>
              <label htmlFor="fullName" className='font-semibold'>FullName</label>
              <input type="text"
               name='fullName'
               id='fullName'
               required
               value={signUpData.fullName}
               onChange={handleUserInput}
               placeholder='Enter Your FullName'
               className="bg-transparent px-2 py-1 border" />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="email" className='font-semibold'>Email</label>
              <input type="email"
               name='email'
               id='email'
               required
               value={signUpData.email}
               onChange={handleUserInput}
               placeholder='Enter Your Email'
                className="bg-transparent px-2 py-1 border"/>
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="password" className='font-semibold'>Password</label>
              <input type="password"
               name='password'
               id='password'
               required
               value={signUpData.password}
               onChange={handleUserInput}
               placeholder='Enter Your Password'
               className="bg-transparent px-2 py-1 border" />
            </div>
            <button type="submit" className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
              Create account
            </button>

            <p className="text-center">
              Already have an account ? <Link to="/login" className='link text-accent cursor-pointer'> Login</Link>
            </p>
          </form>
      </div>
    </>
  )
}
export default SignUp