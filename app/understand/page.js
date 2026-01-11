'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ivvi_group from '../assets/ivvi_group.svg'; 
import u from '../Styles/understand.module.css'; 
import UnderstandCard from '../Components/UnderstandCard'; 


function Understand() {
  const router = useRouter();
  
  // Debug: Log the CSS module classes
  console.log('CSS Module classes:', u);
  console.log('mainContainer class:', u.mainContainer);
  
  // const handleNext = () => {
  //   router.push('/ideal');
  // };
  

  return (
    
    <>

    <UnderstandCard/>

    
    </>
  )
}

export default Understand