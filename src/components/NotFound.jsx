import { useNavigate } from 'react-router-dom'
import BookImg from '../assets/Books.png'
const NotFound = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/')
    }
    return (
        <div className="bg-white ">
            <div className="w-full">
                <img className='m-auto' src={BookImg} alt="Book image" />
            </div>
            <h1 className='text-[15rem] w-full text-center text-primary font-primary font-medium'>404</h1>
            <div className='relative bottom-5'>
                <p className='w-full text-4xl text-center font-primary'>Looks like you’ve got lost...</p>
                <p className='mt-9 w-full text-center text-3xl font-light text-gray-600'>The page you’re looking for doesn’t exist or has been moved.</p>
            </div>
            <p className='m-auto mt-4 w-fit text-[30px] font-bold text-primary font-secondary hover:text-[#ffdc5] hover:cursor-pointer' onClick={handleNavigate}>Go Home</p>

        </div>
    )
}

export default NotFound