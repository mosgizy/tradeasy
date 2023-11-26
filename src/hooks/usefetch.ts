import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import { baseUrl } from '@/utils/constants'

export interface DataI{
  success: boolean;
  code: string;
  message: string;
  data: any
}

const useFetch = (url:string) => {
  const token = Cookies.get('token')
  const [data, setData] = useState<DataI>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/${url}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message)
      }
      if (res.ok) {
        setData(data)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setError(error as any)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    //eslint
  }, [])

  return {data, loading, error, fetchData}
}

export default useFetch