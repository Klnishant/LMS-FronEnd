import { Route, createBrowserRouter,createRoutesFromElements,RouterProvider } from "react-router-dom";
import LayOut from "./LayOut";
import HomePage from "./pages/HomePage";
import Denied from "./pages/Denied";
import About from "./pages/About";
import Contact from "./pages/Contact";


function App (){

  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='' element={<LayOut />}>
            <Route path='/' element={<HomePage />} />
            <Route path="/denied" element={<Denied />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
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