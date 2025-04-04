import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,Tooltip } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import {FaUsers} from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getStats } from '../../Redux/Slices/statsSlice';
import { getAllPayment } from '../../Redux/Slices/paymentSlice';
import { deleteCourse, getCourses } from "../../Redux/Slices/courseSlice";
ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip);

function DashBoard() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state)=>state?.stats);
    const {allPayments} = useSelector((state)=>state?.payment);
    console.log(data);
    console.log(allPayments);
    const monthlySalesRecord = [1, 3, 7, 8, 10, 0, 5]

    const userData = {
        labels:["RegisteredUser","EnrolledUser"],
        fontColor:"white",
        datasets: [
            {
                label:"User Details",
                data:[data?.userCount,data?.subscriberCount],
                backgroundColor:["yellow","green"],
                borderWidth:1,
                borderColor:["yellow","green"]
            }
        ]
    }

    const salesData = {
        labels:["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],
        fontColor:"white",
        datasets:[
            {
                label:"sales/month",
                data:monthlySalesRecord,
                backgroundColor:["red"],
                borderColor:["white"],
                borderWidth:2,
            }
        ]
    }

    const myCourses = useSelector((state)=>state?.course?.courseData);
    console.log(myCourses);

    const handleDelete = async (id)=>{
        if (window.confirm("Are you sure to delete course")) {
            const res = await dispatch(deleteCourse(id));
            console.log(res);
            if (res?.payload?.success) {
                await dispatch(getCourses());
            }
        }
    }

    useEffect(()=>{
        (
            async ()=> {
                await dispatch(getStats());
                await dispatch(getAllPayment());
                await dispatch(getCourses());
            }
        )()
    },[]);

  return (
    <>
        <div className="min-h-[90vh] pt-5 flex flex-col md:flex-wrap gap-10 text-white">
            <h1 className="text-center text-5xl font-semibold text-yellow-500">
                Admin Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:mx-auto md:w-[90%] lg:w-[80%] xl:w-[70%] p-5">
    {/* Left Section */}
    <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
        {/* Pie Chart */}
        <div className="w-full md:w-80 md:h-80">
            <Pie data={userData} />
        </div>
        
        {/* Registered Users Box */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 p-5">
            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md w-full">
                <div className="flex flex-col items-center">
                    <p className="font-semibold">Registered Users</p>
                    <h3 className="text-4xl font-bold">{data?.userCount}</h3>
                </div>
                <FaUsers className="text-green-500 text-5xl shrink-0" />
            </div>
        </div>
    </div>

    {/* Right Section */}
    <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
        {/* Bar Chart */}
        <div className="h-40 md:h-80 w-full relative">
            <Bar className="absolute bottom-0 h-40 md:h-80 w-full border" data={salesData} />
        </div>

        {/* Subscription & Revenue Stats */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Subscription Count */}
            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md w-full">
                <div className="flex flex-col items-center">
                    <p className="font-semibold">Subscription Count</p>
                    <h3 className="text-4xl font-bold">{allPayments?.allPayment?.count}</h3>
                </div>
                <FcSalesPerformance className="text-yellow-500 text-5xl" />
            </div>

            {/* Total Revenue */}
            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md w-full">
                <div className="flex flex-col items-center">
                    <p className="font-semibold">Total Revenue</p>
                    <h3 className="text-4xl font-bold">{allPayments?.allPayment?.count * 499}</h3>
                </div>
                <GiMoneyStack className="text-green-500 text-5xl" />
            </div>
        </div>
    </div>
</div>

<div className="w-full px-4 md:px-10 lg:px-20 flex flex-col items-center gap-10 mb-10">
    {/* Header Section */}
    <div className="flex flex-col md:flex-row w-full items-center justify-between gap-5">
        <h1 className="text-center text-2xl md:text-3xl font-semibold">Course Overview</h1>
        <button 
            onClick={() => navigate("/create/course")}
            className="bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer"
        >
            Create New Course
        </button>
    </div>

    {/* Table Container for Horizontal Scroll on Small Screens */}
    <div className="w-full overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 shadow-lg rounded-lg">
            <thead className="">
                <tr className="text-left">
                    <th className="p-3">S no.</th>
                    <th className="p-3">Course Title</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Instructor</th>
                    <th className="p-3">Lectures</th>
                    <th className="p-3">Description</th>
                    <th className="p-3 text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                {myCourses?.map((course, idx) => (
                    <tr key={course?._id} className="border-t border-gray-200">
                        <td className="p-3">{idx + 1}</td>
                        <td className="p-3">
                            <textarea 
                                readOnly 
                                value={course?.title} 
                                className="w-40 h-auto bg-transparent resize-none"
                            ></textarea>
                        </td>
                        <td className="p-3">{course?.category}</td>
                        <td className="p-3">{course?.createdBy}</td>
                        <td className="p-3">{course?.numberOfLectures}</td>
                        <td className="p-3 max-w-xs truncate">
                            <textarea 
                                readOnly 
                                value={course?.description} 
                                className="w-full h-auto no-scrollbar border-none focus:outline-none bg-transparent resize-none"
                            ></textarea>
                        </td>
                        <td className="p-3 flex items-center justify-center gap-4">
                            {/* View Lectures Button */}
                            <button 
                                onClick={() => navigate("/course/displaylectures", { state: { ...course } })}
                                className="bg-green-500 hover:bg-green-600 transition-all duration-300 text-xl py-2 px-4 rounded-md font-bold"
                            >
                                <BsCollectionPlayFill />
                            </button>
                            {/* Delete Button */}
                            <button 
                                onClick={() => handleDelete(course?._id)} 
                                className="bg-red-500 hover:bg-red-600 transition-all duration-300 text-xl py-2 px-4 rounded-md font-bold"
                            >
                                <BsTrash />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

        </div>
    </>
  )
}

export default DashBoard;