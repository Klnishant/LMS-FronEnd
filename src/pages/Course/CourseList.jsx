import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourses } from '../../Redux/Slices/courseSlice';
import CourseCard from '../../Components/Cards/CourseCard';

function CourseList() {
    const dispatch = useDispatch();
    
    const courseData = useSelector((state)=>state?.course?.courseData);
    console.log(courseData);

    const loadCourses = async ()=> {
        await dispatch(getCourses());
    }

    useEffect(()=>{
        loadCourses();
    },[]);

  return (
    <>
        <div className="min-h-[90vh] pt-12 md:pl-20 flex flex-col gap-10 text-white">
            <h1 className="text-center text-3xl font-semibold mb-5">
                Explore the courses made by &nbsp;
                <span className="font-bold text-yellow-500">
                    Industry experts
                </span>
            </h1>
            <div className="mb-10 flex flex-wrap gap-14">
                {courseData.map((course)=>(
                    <CourseCard key={course._id} course={course} />
                ))}
            </div>
        </div>
    </>
  )
}

export default CourseList