import React, { useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import categories from '../utils/categories'
import Spinner from './Spinner'
import { client } from '../client'
import { useNavigate } from 'react-router-dom'

const CreatePin = ({user}) => {
    const [fields,setFields] = useState()
    const [isLoading,setIsLoading] = useState(false)
    const [wrongImageType,setWrongImageType] = useState(false)
    const [imageAsset,setImageAsset] = useState(null)
    const [title,setTitle] = useState('')
    const [about,setAbout] = useState('')
    const [category,setCategory] = useState('')
    const [destination,setDestination] = useState('')
    const navigate = useNavigate()


    const handleUploadImage = (e) => {
        const {name, type} = e.target.files[0]
        if (type === 'image/jpeg' ||  type === 'image/png' || type === 'image/tiff' || type === 'image/jpg') {
            setIsLoading(true) 
            client.assets.upload('image',e.target.files[0],{contentType: type, filename: name})
            .then((document) => setImageAsset(document))
            .catch((error) =>console.error('uploading error : ',error))
            setIsLoading(false)

            } else {
            setWrongImageType(true)
            setImageAsset(e.target.files[0])
            }
        
    }

    const savePin = () => {
        if(!imageAsset?._id || !title || !about || !category || !destination)
       { setFields(true); 
         setTimeout(() =>setFields(false), 1000)}
       else{
        const doc = {
            _type:'pin',
            title,
            about,
            destination,
            category,
            image: {
                _type:'image',
                asset:{
                    _type:'reference',
                    _ref:imageAsset?._id
                },
            },
            userId: user?._id,            
            postedBy:{
                _type:'postedBy',
                _ref:user?._id

            }

        }
        client.create(doc).then((document)=>navigate('/')).then((err)=>console.log(err))
       }
    }


    return(
    <div className="flex flex-col items-center mt-5 lg:w-4/5">
     {!fields && (<p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>Please fill in all the fields</p>)}
     <div className="flex flex-col lg:flex-row justify-center items-center bg-white lg:p-5 p-3 w-full lg:w-4/5">
        <div className='flex bg-secondaryColor justify-center p-3 flex flex-0.7 w-full'>
            <div className='flex justify-center items-center flex-col border-2 border-dotted mt-5 border-gray-300 p-3 w-full h-420'>
                {isLoading && (
                    <Spinner />
                )}
                {wrongImageType && (<p>It&apos;s wrong file type.</p>)}
                {!imageAsset ? //changed
                (<label className='flex flex-col items-center hover:cursor-pointer'>
                    <p className='font-bold text-2xl'>
                    <AiOutlineCloudUpload /> 
                    </p>
                    <p>Use high quality image less than 20 MB</p>
                    <input type="file" onChange={handleUploadImage} name='upload-image' className='w-0 h-0' />

                </label>)
                :(
                <div className='flex justify-center items-center'>
                    <img src={imageAsset.url} className='w-full h-full object-cover' alt='pin-pic' />
                </div>)
                }

            </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
            <input type="text" placeholder='Enter the title here' onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" placeholder="what's your pin about?" onChange={(e)=>setAbout(e.target.value)}/>
            <input type="text" placeholder="Destination (should be a URL)" onChange={(e)=>setDestination(e.target.value)}/>
            <select onChange={(e)=>setCategory(e.target.value)}>
                <option value="other"> Select a category</option>
                {categories.map((category) => (
                    <option key={category.name} value={category.name}>{category.name}</option>
                ))}
            </select>
            <button className='border-none' onClick={savePin}> Save Pin</button>
            
        </div>
     </div>

    </div>
            
        
    )
}
export default CreatePin
