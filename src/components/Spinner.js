import React from 'react'
import loading from '../Loading.gif'

function Spinner() {
  return (
    <div className='text-center'>
      <img src={loading} alt="" />
    </div>
  )
}

export default Spinner
