import React from 'react'
import { useContext } from 'react'
import { useForm } from "react-hook-form"
import { timeContext } from '../context/time'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassLocation } from '@fortawesome/free-solid-svg-icons'

const Search = () => {
    const location = useContext(timeContext).location
    const setLocation = useContext(timeContext).setLocation
  
    const handleInputChange = (event) => {
        let newloc = event.target.value
        setLocation(newloc) // Update the state with user input
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const onSubmit = newdata => console.log(newdata)

    return (
        <div className='w-full sm:w-auto mt-4 sm:mt-0'>
            <form onSubmit={handleSubmit(onSubmit)} className='relative'>
                {/* register your input into the hook by invoking the "register" function */}
                <FontAwesomeIcon icon={faMagnifyingGlassLocation} className='transform absolute z-10 left-4 top-1/2 -translate-y-1/2 h-5 text-white opacity-60' />
                <input 
                    placeholder='Search your location' 
                    type='text' 
                    {...register("location", { required: { value: true, message: "Enter location" } })} 
                    onChange={handleInputChange} 
                    className='bg-[#0F0F0F] h-12 sm:h-14 w-full sm:w-80 rounded-3xl outline-none pl-11 pr-4' 
                />
            </form>
        </div>
    )
}

export default Search
