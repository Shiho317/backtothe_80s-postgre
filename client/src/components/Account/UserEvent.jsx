import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RiListSettingsLine } from 'react-icons/ri'

const UserEvent = ({event, user}) => {

  const navigate = useNavigate()

  const onClickHandler = () => {
    navigate(`/events-manage/${user.id}/${event.id}`)
  }

  return (
    <div className="relative w-11/12 m-auto shadow-md rounded overflow-hidden bg-white lg:w-80">
      <img src={event.image} alt="event" />
      <div className="p-2">
        <h1 className='text-xl underline'>{event.title}</h1>
        <p className='text-sm'>{event.sub}</p>
        <p className='text-sm text-gray-400'>{event.amount} people join</p>
      </div>
      <div className="absolute bottom-2 right-2 text-gray-400">
        <button className="text-xl bg-none border-none hover:text-black lg:text-2xl" onClick={onClickHandler}>
          <RiListSettingsLine/>
        </button>
      </div>
    </div>
  )
}

export default UserEvent