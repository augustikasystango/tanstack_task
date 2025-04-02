import Dashboard from './components/Dashboard'
import Login from './components/Login'
import { BrowserRouter, Route, Routes ,Link } from "react-router-dom";


function App() {
  

  return (
    <>
    <BrowserRouter>


<Routes>
  <Route path='/login' element={<Login/>}/>
  <Route path='/dashboard' element={<Dashboard/>}/>
</Routes>


</BrowserRouter>
    
    </>
  )
}

export default App
