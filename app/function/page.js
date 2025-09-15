
'use client'
import React from 'react'
import Image from 'next/image'
import f from '../Styles/function.module.css'; 
import group from '../assets/Multi Style Learning.svg'; 
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