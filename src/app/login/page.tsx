"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'


const page = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [isBtnDisabled, setisBtnDisabled] = useState(true)

  const [user, setUser] = useState({
  email:'',
  password:'',
  })

  var router = useRouter()

  
  const handleSubmition = async () => {
    try {
      setIsLoading(true)
     const res:any = await axios.post('/api/user/login',user)
     console.log(res)
     toast.success(res.data.message)
     setIsLoading(false)
     setisBtnDisabled(true)
     setUser({
      password:'',
      email:''
     })
     
     router.push('/profile')
    } catch (error:any) {
      setIsLoading(false)
      setisBtnDisabled(true)
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    const {email,password} = user
        if( email.length > 0 && password.length > 0){
          setisBtnDisabled(false)
        } else {
          setisBtnDisabled(true)
        }
    }, [user])
  


  return (
    <div className='h-screen w-full  flex justify-center flex-col items-center '>
     <form
     onSubmit={(e) => {
      e.preventDefault()
      handleSubmition()
     }}
     className='flex flex-col gap-3 items-center border border-zinc-500 p-5'>
     <h1 className='text-2xl text-center capitalize'>{isLoading ? 'Processing' : 'Login'}</h1>
      <hr />
     <div className='text-zinc-300 w-full'> <h3 className='text-left w-full'>Email</h3></div>
      <input
      onChange={e => {
        setUser(prev => ({...prev,email:e.target.value}))
      }}    
      value={user.email}
      className='px-4 py-1 text-black outline-none border-none'
      type="email" id='email'  placeholder='email'/>
     <div className='text-zinc-300 w-full'> <h3 className='text-left  w-full'>Password</h3></div>
      <input
      onChange={e => {
        setUser(prev => ({...prev,password:e.target.value}))
      }}    
      value={user.password}
      className='px-4 py-1 text-black outline-none border-none'
      type="text" id='username'  placeholder='Username'/>

      <button
      disabled={isBtnDisabled}
       type='submit'
       className='border border-zinc-600  outline-none  px-5 h-8 text-center mt-1 text-[16px] capitalize  text-zinc-300 mx-auto'>{isBtnDisabled ? 'Fill The Form' : 'Login'}</button>
     <Link href='signup' className='text-zinc-400'>Go To Signup</Link>
     </form>
    </div>
  )
}

export default page