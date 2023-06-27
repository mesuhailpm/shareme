import React, { useState } from 'react'
import { GoogleOAuthProvider,GoogleLogin, googleLogout} from '@react-oauth/google'
import scrollingVideo from '../assests/video.webm'
import logo from '../assests/logo.png'
import jwtDecode from 'jwt-decode'
import { client } from '../client'
import { useNavigate } from 'react-router-dom'
import {LineWave} from 'react-loader-spinner'


const Login = () => {
  const navigate = useNavigate()
  const [processingLogin, setProcessingLogin] = useState(false)

  const handleSuccess = async (response) => {
    try {
      setProcessingLogin(true)
      const decodedData = await jwtDecode(response.credential)
      const { name, picture, email, sub } = decodedData
      localStorage.setItem('profileObj', JSON.stringify({name, picture, email, id: sub }))

      const doc ={
       _id: sub,
       _type:'user',
       userName:name,
       image:picture

      }

      client.createIfNotExists(doc)
        .then(()=>navigate('/'))
        .catch((e)=>console.log(e))

    }
      catch(e){console.log(e)}

  }
  const handleError = (error) => {
    console.log(error)
    alert('login failed')
  }
  return (<>
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className ='relative h-full w-full'>
        <video src={scrollingVideo}
        type="video/webp"
        controls={false}
        muted
        loop
        autoPlay
        className='h-full w-full object-cover'

          />

      </div>
      <div className='absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay'>
        <div className='m-2 border-2 border-white border-solid rounded-lg overflow-hidden'>
          <img src = {logo} alt = "logo" width = '230px' className = 'rounded-sm' />
        </div>
        <div className="sadow-2x1">
          <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          className='absolute'

          />
        </div>
        {processingLogin &&
        <>
          <LineWave />
          <h2 className='text-yellow-500 p-2'> Logging you in...</h2>
        </>
        }
      </div>
    </div>
  </GoogleOAuthProvider>
  </>
  )
}

export default Login
