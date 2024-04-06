import { Route, createBrowserRouter,createRoutesFromElements,RouterProvider } from "react-router-dom";
import LayOut from "./LayOut";
import HomePage from "./pages/HomePage";


function App (){

  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='' element={<LayOut />}>
            <Route path='/' element={<HomePage />} />
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