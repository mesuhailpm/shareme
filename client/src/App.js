import React from 'react'
import { Route, Routes, useNavigate} from 'react-router-dom'
import Login from './components/Login'
import Home from './containers/Home'

const App = () => {
    return (
        <>
            <Routes>

                <Route path='/login' element={<Login />}>Login</Route>
                <Route path='/' element={<Home/>}>Home</Route> {/* arterisk* will be right*/}
            </Routes>
        </>
        )
    }

export default App
