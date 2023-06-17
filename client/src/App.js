import React from 'react'
import { Route, Routes, useNavigate} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'

const App = () => {
    return (
        <>
            <div className="App">App compoente</div>
            <Routes>
                
                <Route path='/login' element={<Login />}>Login</Route>
                <Route path='/' element={<Home/>}>Home</Route>
            </Routes>
        </>
        )
    }
    
export default App