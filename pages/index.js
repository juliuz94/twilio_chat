import { useEffect, useState } from 'react'
import VideoChat from '../Components/Index'
import ErrorPage from '../Components/ErrorPage'
import axios from 'axios'

export default function Home({data, user}) {
  const [appointmentData, setAppointmentData ] = useState(null)
  const [userType, setUserType] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!data || data._status === 'ERROR') {
      setAppointmentData(null)
    } else {
      setAppointmentData(data)
      setUserType(user)
    }
    setLoading(false)
  }, [data, userType])

  let render
  if (appointmentData) {
    render = <VideoChat appointmentData={appointmentData} userType={userType} /> 
  } else {
    render = <ErrorPage />
  }


  return (
    <main>
      { loading ? <h1>Cargando...</h1> : render}
    </main>
  );
}


Home.getInitialProps = async (ctx) => {
  console.log(ctx.query)
  const {userType, idCita} = ctx.query
  if (!userType || !idCita) return {}
  const res = await axios.get(`https://saana-api-prod-7xk7iwgpfq-uc.a.run.app/v1/citas/${idCita}`, {
    headers: {
      authorization: process.env.NEXT_PUBLIC_SAANA_API_TOKEN,
    }
  })
  const data = res.data
  console.log(data)
  if (res.status === 200) {
    return {
      data,
      user: userType
    }
  } else {
    return {}
  }
}