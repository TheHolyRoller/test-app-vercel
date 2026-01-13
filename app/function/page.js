
'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import FunctionCard from '../Components/FunctionCard'; 



function Functional(){ 
  
  const router = useRouter();
  
  const handleNext = () => {
    router.push('/legal');
  };


  return (

    <>

    <FunctionCard/> 
    </>

  )
}

export default Functional