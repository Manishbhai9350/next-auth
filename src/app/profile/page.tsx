'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function page () {

  const [data, setData] = useState<any>(null)
  var router = useRouter()
  const getData = async () => {
    try {
      let res = await axios.post('/api/user/me')
      setData(res.data.data._id)
    } catch (error:any) {
      setData(null)
      console.log(error.message)
    }
  }

  useEffect(()=>{
    if (data && data.length > 0) {
      router.push('/profile/' + data)
    }
  },[data])

  useEffect(() => {
    getData()
  }, [])
  

  return (
    <div className="flex justify-center items-center flex-col h-screen" >
    </div>
  )
}
