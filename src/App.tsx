import React from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LoginForm from "./components/Auth/LoginForm"
import "antd/dist/antd.css"
import Campaign from "./components/Campaign/Campagin"
import Navbar from "./components/Navbar/Navbar"

const App: React.FC = () => {
   return (
      <div className='App'>
         <Navbar />
         <div className='container'>
            <header className='pokemon-header'> Thucidol</header>
            <Router>
               <Routes>
                  <Route path='/login' element={<LoginForm />} />
                  <Route path='/campaign' element={<Campaign />} />
                  {/* <Route
                    exact
                    path='/login'
                    render={(props) => <Auth {...props} authRoute='login' />}
                 />
                 <Route
                    exact
                    path='/register'
                    render={(props) => <Auth {...props} authRoute='register' />}
                 />
                 <ProtectedRoute exact path='/dashboard' component={Dashboard} />
                 <ProtectedRoute exact path='/about' component={About} /> */}
               </Routes>
            </Router>
         </div>
      </div>
   )
}

export default App
