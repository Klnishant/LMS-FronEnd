import React, { useState } from 'react'
import toast from "react-hot-toast"
import axiosInstance from "../Helpers/axiosInstance"

function Contact() {

    const [userInput,setUserInput] = useState({
        name:"",
        email:"",
        message:"",
    });

    const handleInputChange = (e) =>{
        const {name,value} = e.target;

        setUserInput({
            ...userInput,
            [name]:value
        });
    }

    const handleFormSubmit = async (e)=> {
        e.preventDefault();

        if (!userInput.name || !userInput.email || !userInput.message) {
            toast.error("all fields are mandatory");
            return;
        }

        try {
            const response = axiosInstance.post("/contact",userInput);
            toast.promise(response,{
                loading:"sumbiting your message",
                success:"form submited successfully",
                error:"failed to submit the form"
            });
    
            const contactResponse = await response;
    
            if (contactResponse?.data?.success) {
                setUserInput({
                    name:"",
                    email:"",
                    message:"",
                });
            }
        } catch (err) {
            toast.error("operation failed");
        }
    }
  return (
    <>
        <div className='flex items-center justify-center h-[100vh]'>
            <form 
             noValidate
             onSubmit={handleFormSubmit}
             className='flex flex-col items-center justify-center text-white gap-2 p-5 rounded-md shadow-[0_0_10px_black] w-[22rem] '
            >
                <h1 className='text-3xl font-semibold'>
                    Contact Form
                </h1>
                <div className='flex flex-col w-full gap-1'>
                    <label htmlFor='name' className='text-xl font-semibold'>Name</label>
                    <input type="text"
                     id='name'
                     name='name'
                     value={userInput.name}
                     placeholder='Enter Your Name...'
                     onChange={handleInputChange}
                     className='bg-transparent border px-2 py-1 rounded-sm' />
                </div>
                <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="email" className='text-xl font-semibold'>email</label>
                    <input 
                     type="email"
                     name='email'
                     id='email'
                     value={userInput.email}
                     placeholder='Enter Your email..'
                     onChange={handleInputChange}
                     className='bg-transparent border px-2 py-1 rounded-sm' />
                </div>
                <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="message" className='text-xl font-semibold'>message</label>
                    <textarea name="message" 
                     id="message" 
                     value={userInput.message}
                     placeholder='Enter your message'
                     onChange={handleInputChange}
                     className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"></textarea>
                </div>
                <button type='submit' className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
                    Submit
                </button>
            </form>
        </div>
    </>
  )
}

export default Contact