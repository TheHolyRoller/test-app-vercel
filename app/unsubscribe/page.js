import React from 'react'
import { Suspense } from 'react'
import Unsubscribe from '../Components/Unsubscribe'



function Unsub() {
  return (
    <div>

      <Suspense fallback={<div>Loading...</div>} >

      <Unsubscribe/> 

      </Suspense>


    </div>
  )
}

export default Unsub