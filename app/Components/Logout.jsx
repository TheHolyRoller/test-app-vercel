'use client'; 
import {account} from '../lib/appwrite'; 
import { useRouter } from 'next/navigation'; 

import React from 'react'
import lg from '../Styles/Logout.module.css'; 


function Logout() {


    const router = useRouter(); 


    // Create the logout function here 

    const logout = async () => {

        await account.deleteSession('current'); 
        router.push('/'); 

    }


  return (

    // Create the login button here 

    <>
    
    <section className={lg.mainLogoutContainer} >

        <button onClick={() => logout()} >

            Sign out 

        </button>


    </section>
    
    
    </>

  )
}

export default Logout