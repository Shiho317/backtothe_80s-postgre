import React from 'react'
import { Link } from 'react-router-dom'
import { RiListSettingsLine } from 'react-icons/ri'

const UserEvent = ({event}) => {
  return (
    <div className="relative w-11/12 m-auto shadow-md rounded overflow-hidden bg-white lg:w-80">
      <img src={event.image} alt="event" />
      <div className="p-2">
        <h1>{event.title}</h1>
        <p>{event.sub}</p>
        <p>{event.amount}</p>
      </div>
      <div className="absolute bottom-2 right-2 text-gray-400">
        <Link to={`/events-data/${event.id}`} className="text-xl hover:text-black lg:text-2xl">
          <RiListSettingsLine/>
        </Link>
      </div>
    </div>
  )
}

export default UserEvent