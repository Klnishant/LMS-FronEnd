import { Route, createBrowserRouter,createRoutesFromElements,RouterProvider } from "react-router-dom";


import LayOut from "./LayOut";
import HomePage from "./pages/HomePage";
import Denied from "./pages/Denied";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Profile from "./pages/User/Profile";
import EditProfile from "./pages/User/EditProfile";
import CreateCourse from "./pages/Course/CreateCourse";
import CourseList from "./pages/Course/CourseList";
import CourseDetails from "./pages/Course/CourseDetails";
import CheckOut from "./pages/Payment/CheckOut";
import CheckOutSuccess from "./pages/Payment/CheckOutSuccess";
import CheckOutFailure from "./pages/Payment/CheckOutFailure";


function App (){

  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='' element={<LayOut />}>
            <Route path='/' element={<HomePage />} />
            <Route path="/denied" element={<Denied />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit/profile" element={<EditProfile />} />
            <Route path="/create/course" element={<CreateCourse />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/course/description" element={<CourseDetails />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/checkout/success" element={<CheckOutSuccess />} />
            <Route path="checkout/fail" element={<CheckOutFailure />} />

            <Route path="*" element={<NotFound />} />
        </Route>
    )
)

  return(
    <>
      <RouterProvider router={router} />
    </>
  )
};

export default App;