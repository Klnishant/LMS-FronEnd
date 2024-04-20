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
        <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
            <h1 className="text-center text-5xl font-semibold text-yellow-500">
                Admin Dashboard
            </h1>
            <div className="grid grid-cols-2 gap-5 m-auto mx-10">
                <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                    <div className="w-80 h-80">
                        <Pie data={userData} />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                            <div className="flex flex-col items-center">
                                <p className="font-semibold">Registerd Users</p>
                                <h3 className="text-4xl font-bold">{data?.userCount}</h3>
                            </div>
                            <FaUsers  className="text-green-500 text-5xl"/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                    <div className="h-80 w-full relative">
                        <Bar className="absolute bottom-0 h-80 w-full" data={salesData} />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                            <div className="flex flex-col items-center">
                                <p className="font-semibold">Subscription Count</p>
                                <h3 className="text-4xl font-bold">{allPayments?.allPayment?.count}</h3>
                            </div>
                            <FcSalesPerformance className="text-yellow-500 text-5xl" />
                        </div>
                        <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                            <div className="flex flex-col items-center">
                                <p className="font-semibold">Total revenue</p>
                                <h3 className="text-4xl font-bold">{allPayments?.allPayment?.count * 499}</h3>
                            </div>
                            <GiMoneyStack className="text-green-500 text-5xl" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
                <div className="flex w-full items-center justify-between">
                    <h1 className="text-center text-3xl font-semibold">Course overview</h1>
                    <button onClick={()=>{
                        navigate("/create/course");
                    }}
                    className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer"
                    >
                        Create New Course
                    </button>
                </div>
                <table className="table overflow-x-scroll">
                    <thead>
                        <tr>
                            <th>S no.</th>
                            <th>Course title</th>
                            <th>Course category</th>
                            <th>Instrucer</th>
                            <th>Total Lectures</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myCourses?.map((course,idx)=>(
                            <tr key={course?._id}>
                                <td>{idx+1}</td>
                                <td>
                                    <textarea readOnly value={course?.title} className="w-40 h-auto bg-transparent resize-none"></textarea>
                                </td>
                                <td>{course?.category}</td>
                                <td>{course?.createdBy}</td>
                                <td>{course?.numberOfLectures}</td>
                                <td className="max-w-30 overflow-hidden text-ellipsis whitespace-nowrap">
                                    <textarea value={course?.description} readOnly className="w-full h-auto bg-transparent resize-none"></textarea>
                                </td>
                                <td className="flex items-center gap-4">
                                    <button onClick={()=>{navigate("/course/displaylectures",{state:{...course}})}}
                                    className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                    >
                                        <BsCollectionPlayFill />
                                    </button>
                                    <button onClick={()=>handleDelete(course?._id)} className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold">
                                        <BsTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default DashBoard;