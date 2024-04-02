'use client'
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

const page = () => {
  
    const [token, setToken] = useState('')
    const [isVarified, setIsVarified] = useState(false)
    const [error, setError] = useState(false)

    const getuser = async () => {
        try {
            const res = await axios.post('/api/user/me')
            console.log(res.data.succes)
            setIsVarified(res.data.succes)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect( () => {
      getuser()
    }, [])
    
    const verify = async () => {
     try {
          await axios.post('/api/user/verifyemail',{token})
          setIsVarified(true)
          setToken('')
     } catch (error) {
        console.log(error)
     }
    }

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1]
         setToken(`${urlToken}`)
    //   const {query} = router
    //   const urlToken = query.token
    //   setToken(urlToken)
    }, [])

    

  return (
    <div className="flex flex-col justify-center gap-3 h-screen items-center py-3">
        <h1 className="text-4xl color-zinc-200">Verify Email</h1>
        <h2 className="text-zinc-400">{(token && !isVarified) ? `${token}` : isVarified ? 'You Are Already Verified' : 'No Token Here'}</h2>
        <button
        onClick={() => {
            if(token && !isVarified)  {
                verify()
            }
        }}
        className="py-1 px-3 bg-green-600">{(token && !isVarified) ?  'VERIFY' : 'VERIFIED '}</button>
        <div className="flex justify-center items-center flex-col">
            {
                isVarified ? (
                    <>
                    <h2 className="text-green-600">You Are Verified ✓ </h2>
                    <Link className="text-blue-700" href='/profile'>Profile </Link>
                    </>
                    
                )
                : (
                    <h2 className="text-red-500 capitalize " >You Are Not Verified ❌ </h2>
                )
            }
        </div>
    </div>
  )
}

export default page