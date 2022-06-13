import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../App'
import UserEvent from './UserEvent'

const Account = () => {

  const {currUser} = useContext(AppContext)

  const [userEvents, setUserEvents] = ([])

  const user = JSON.parse(currUser);
  console.log(user)

  // useEffect(() => {

  //   axios.post('http://localhost:8000/api/event/userevents', user)
  //   .then(res => {
  //     setUserEvents(res.data)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // })

  return (
    <div>
      <h1>{user.name}'s Hosting Events</h1>
      <ul>
        {userEvents.map(event => (
          <UserEvent event={event} key={event.id}/>
        ))}
      </ul>
    </div>
  )
}

export default Account