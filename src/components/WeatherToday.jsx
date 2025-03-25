import React from 'react'
import { useContext, useMemo } from 'react'
import { timeContext } from '../context/time'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';


const WeatherToday = () => {
  const update = useContext(timeContext).update
  const month = useContext(timeContext).month
  const day = useContext(timeContext).day 
  const year = useContext(timeContext).year
  const WeatherDesc = useContext(timeContext).WeatherDesc
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const today = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[today.getDay()];
    
    const image = () => {
      WeatherDesc.map((e) => {
        if(e.type === update.desc){
          update.icon = e.image
        }
      })
      return <img src={update.icon} alt="" className='text-white size-28'/>
     }
    

  return (
    <div className='h-auto min-h-[240px] w-full lg:w-[650px] bg-[#0F0F0F] p-4 rounded-3xl relative'>
      <div className='flex flex-col h-full'>
        <p className='h-12 w-full sm:w-96 bg-black bg-opacity-60 flex justify-center items-center text-white gap-3 text-lg sm:text-2xl rounded-2xl font-mono overflow-hidden text-ellipsis'> 
          <FontAwesomeIcon icon={faLocationDot} />
          <span className='truncate'>{update.exactloc},{update.exactloca}</span>
        </p>
        
        <div className='flex flex-col sm:flex-row sm:justify-between w-full mt-4'>
          <div className='sm:ml-8'>
            <h1 className='text-white text-3xl sm:text-5xl'>{dayOfWeek}</h1>
            <h1 className='text-white text-sm sm:text-base mt-2'>{day} {months[month-1]},{year}</h1>
          </div>
          
          <div className='flex flex-col items-center sm:items-end sm:mr-8 lg:mr-4 xl:mr-8 mt-4 sm:mt-0'>
            <div className='text-white text-4xl sm:text-6xl'>{update.temp}°C</div>
            <div className='flex flex-col items-center sm:items-end mt-2'>
              <h2 className='text-white text-xl sm:text-2xl font-semibold max-h-7'>{update.desc}</h2>
              <h2 className='text-white text-base sm:text-xl font-normal'>Feels like {update.feelslike}°C</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherToday
