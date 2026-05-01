import React from 'react'

const StatsDash = ({icon,status,title,mainNumber,mainColor,secColor,touch}) => {
  return (
    <div className='bg-white rounded-md shadow-sm px-6 py-4 flex-1 '>
        <div className='flex justify-between items-start mb-3'>
            <span className={`${secColor} p-3 rounded-lg`}>
                {icon}
            </span>
            <span className={`rounded-full px-4 py-1 text-sm ${mainColor} ${secColor} font-bold `}>
                {status}
            </span>
        </div>

        <div className='flex flex-col'>
            <span className='text-sm text-gray-600 font-medium'>{title}</span>
            <span className='text-2xl font-bold'> {mainNumber} </span>
        </div>
        
        <div>
            {touch}
        </div>

    </div>
  )
}

export default StatsDash