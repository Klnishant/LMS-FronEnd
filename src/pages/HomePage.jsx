import React from 'react'
import { Link } from 'react-router-dom'
import HomePageImage from '../assets/images/homePageMainImage.png'

function HomePage() {
  return (
    <>
        <div className="pt-10 text-white flex flex-col md:flex-row items-center justify-center gap-10 mx-16 overflow-y-auto h-[90vh]">
                <div className="flex flex-col items-center justify-center space-y-6">
                    <div className='w-full flex justify-start'>
                    <h1 className="text-4xl md:text-5xl font-semibold">
                        Find out best
                        <span className="text-yellow-500 font-bold">
                            Online Courses
                        </span>
                    </h1>
                    </div>
                    <p className="text-lg md:text-xl text-gray-200">
                        We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost.
                    </p>

                    <div className="flex flex-col md:flex-row gap-5 w-full md:justify-center">
                        <Link to="/courses">
                            <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                Explore courses
                            </button>
                        </Link>

                        <Link to="/contact">
                            <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="flex-shrink-0 w-full h-200 md:w-1/2 flex items-center justify-center">
                    <img alt="homepage image" src={HomePageImage} className='hidden md:block' />
                </div>

            </div>
    </>
  )
}

export default HomePage