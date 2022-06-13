import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='bg-home-bg w-full h-screen flex items-center justify-center'>
      <h1 className='text-8xl text-white bg-black'>BACK TO THE 80'S</h1>
      <div className='absolute top-50 right-10 flex flex-col items-center justify-center gap-6'>
        <Link to='/login'>
          <button className='bg-none border border-black bg-white py-2 w-36 text-xl hover:bg-red-500'>Host</button>
        </Link>
        <Link to='/events'>
          <button className='bg-none border border-black bg-white py-2 w-36 text-xl hover:bg-red-500'>Guest</button>
        </Link>
      </div>
    </div>
  )
}

export default Home