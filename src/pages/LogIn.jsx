import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import { logIn } from '../Redux/Slices/AuthSlice';
import SignUp from './SignUp';

function LogIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logInData, setLogInData] = useState({
        email:"",
        password:"",
    });

    const handleInput = (e)=>{
        const {name,value} = e.target;
        setLogInData({
            ...logInData,
            [name]:value
        });
    }

    async function handleLogIn(e){
        e.preventDefault();
        
        if (!logInData.email || !logInData.password) {
            toast.error("All fields are mandatory");
            return;
        }

        const res = await dispatch(logIn(logInData));
        if (res?.payload?.success) {
            navigate("/");
        }

        setLogInData({
            email:"",
            password:"",
        });
    }
  return (
    <>
        <div className='flex overflow-x-auto items-center justify-center h-[100vh]'>
            <form noValidate onSubmit={handleLogIn} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]' >
                <h1 className="text-center text-2xl font-bold">
                    LogIn Page
                </h1>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="email" className='font-semibold'>
                        Email
                    </label>
                    <input type="email"
                     id='email'
                     name='email' 
                     className="bg-transparent px-2 py-1 border"
                     onChange={handleInput}
                     placeholder='Enter Your Email...'
                     value={logInData.email}
                     required
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="password" className='font-semibold'>Password</label>
                    <input type="password"
                     id='password'
                     name='password' 
                     className="bg-transparent px-2 py-1 border"
                     onChange={handleInput}
                     placeholder='Enter Your Paasword...'
                     value={logInData.password}
                     required
                    />
                </div>
                <button type='submit' className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                    LogIn
                </button>
                <p className='text-center'>
                    Don't Have An Account ? <Link to="/signUp" className='link text-accent cursor-pointer'>SignUp</Link>
                </p>
            </form>
        </div>
    </>
  )
}

export default LogIn