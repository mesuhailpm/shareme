import {IoMdAdd,IoMdSearch} from 'react-icons/io'
import {useNavigate, Link} from 'react-router-dom'
import {AiOutlineLogin} from 'react-icons/ai'
const Navbar = ( { user, searchTerm, setSearchTerm } ) => {
    const navigate = useNavigate();
    console.log(searchTerm,' is search term')


    if(!user) return (
        <Link to="login" className='hidden md:flex w-20 justify-center items-center gap-2 bg-green-500 p-3 rounded-md'>
            <AiOutlineLogin />
            <p>Login</p>
        </Link>)

    return(
        <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
            <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
                <IoMdSearch fontSize={21} className='ml-1' />
                <input 
                type='text'
                onChange={(e)=>setSearchTerm(e.target.value)} 
                placeholder='Search...'
                value={searchTerm}
                onFocus={()=>navigate('/search')}
                className='p-2 w-full bg-white outline-none'
                />


            </div>
            <div className='flex gap-3'>
                <Link to={`/user-profile/${user?._id}`} className='hidden md:block'>
                    <img src={user?.image} className='w-14 h-12 rounded-lg' alt="user" />
                </Link>
                <Link to= {`/create-pin`} className='bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12  flex justify-center items-center'>
                    <IoMdAdd />
                </Link>

            </div>
        </div>
    )
}

export default Navbar
