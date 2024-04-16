import React from 'react'
import { useNavigate } from 'react-router-dom'

function CourseCard({course}) {
    const navigate = useNavigate();
  return (
    <>
        <div onClick={() => {navigate("/course/description", {state: {...course}})}} 
            className="text-white w-[22rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700 m-auto p-5">
            <div className='overflow-hidden flex flex-col gap-2'>
                        <div className='flex flex-col justify-center items-center'>
                            <img src={course?.thumbnail?.secure_url} className='h-[200px] w-full' />
                        </div>
                        <div className='flex flex-col justify-center items-center mt-5'>
                            <label htmlFor="title" className='font-semibold text-xl'>{(course?.title).toUpperCase()}</label>
                        </div>
                        <div className='flex flex-col justify-start items-start'>
                            <label htmlFor="description" className='font-semibold'>{course?.description}</label>
                        </div>
                        <div>
                            <label htmlFor="category" className='font-medium'><span>Category : </span>{course?.category}</label>
                        </div>
                        <div>
                            <label htmlFor="totalLectures" className='font-medium'><span>Total Lecture : </span>{course?.numberOfLectures}</label>
                        </div>
                        <div className='flex flex-col justify-end items-end text-lg'>
                            <label htmlFor="createdBy" className='font-medium'><span>Instructur : </span>{course?.createdBy}</label>
                        </div>
            </div>
        </div>
    </>
  )
}

export default CourseCard