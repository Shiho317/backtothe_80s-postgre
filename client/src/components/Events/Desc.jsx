import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IoMdArrowDropleftCircle } from 'react-icons/io'

const Desc = () => {

  const params = useParams()
  const [event, setEvent] = useState([])

  useEffect(() => {
    const clickedEvent = {
      id: params.id
    }
    axios.post("http://localhost:8000/api/event/getevent", clickedEvent)
    .then(res => {
      setEvent(res.data[0])
    })
    .catch(err => {
      console.log(err)
    })
  },[params])

  return (
    <div className='bg-manage-event bg-cover bg-center w-full h-screen flex items-center justify-center'>
      <div className='absolute top-10 left-20 text-white text-5xl hover:text-red-500 cursor-pointer'>
        <IoMdArrowDropleftCircle />
      </div>
      {event && (
        <div className='max-w-2xl m-auto bg-white/80'>
          <img src={event.image} alt='event-pic' />
          <h1 className='text-3xl underline text-center'>{event.title}</h1>
          <p>{event.sub}</p>
          <p>{event.date}</p>
          <p>{event.time}</p>
          <p>{event.location}</p>
          <p>{event.price === 0 ? 'free' : `C$ ${event.price}`}</p>
          <p>{event.amount} / {event.participants}</p>
        </div>
      )}
    </div>
  )
}

export default Desc