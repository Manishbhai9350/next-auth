'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import {toast} from 'react-hot-toast'

const page = ({params}) => {
    var router = useRouter()
    const handleLogout  = async () => {
        try {
            await axios.post('/api/user/logout')
            toast.success('logged out')
            console.log('logged out successfully')
            router.push('/login')
        } catch (error:any) {
            console.log('error')
        }
    }
  return (
    <div className='flex justify-center h-screen items-center flex-col'>
        <h1 className='text-2xl text-white'>{params.id}</h1>
        <button
        onClick={handleLogout}
        className='text-xl bg-green-500 px-5 py-1 rounded'>Logout</button>
    </div>
  )
}

export default page