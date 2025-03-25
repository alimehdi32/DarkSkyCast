import React, { useContext, useMemo } from 'react'
import { timeContext } from '../context/time'
import Search from './Search';

const Navbar = () => {
  const now = useContext(timeContext).now;
  const currentHour = now.getHours();
  useMemo(() => { console.log(currentHour) }, [currentHour]);
  const greet = useMemo(() => {
    // Determine the appropriate greeting
    let greeting = '';

    if (currentHour >= 5 && currentHour < 12) {
      greeting = 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = 'Good Afternoon';
    } else if (currentHour >= 18 && currentHour < 22) {
      greeting = 'Good Evening';
    } else {
      greeting = 'Good Night';
    }

    // Output the greeting
    console.log(greeting);
    return greeting;
  }, [currentHour])

  return (
    <div className='bg-black bg-opacity-80 text-white p-2 sm:p-4 flex flex-col sm:flex-row justify-between items-center w-full'>
      <div className='text-center sm:text-left mb-2 sm:mb-0'>
        <div className='text-sm sm:text-base'>Hi, Alex</div>
        <div className='text-xl sm:text-2xl font-bold'>{greet}</div>
      </div>
    </div>
  )
}

export default Navbar
