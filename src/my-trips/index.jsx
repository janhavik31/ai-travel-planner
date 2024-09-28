import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { query , where } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips(){
  const navigate = useNavigate(); 
  useEffect(() => {
    GetUserTrips();
  },[])

  const [userTrips,SetUserTrips] = useState([]);


  /**
   * 
   * @returns 
   */
  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if (!user) {
      navigate('/');
      return;
    }
    const q = query(collection(db, 'AiTrips'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);
    SetUserTrips([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      SetUserTrips(prevVal=>[...prevVal,doc.data()]);
    });
  }


  return (
    <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10'>
      <h1 className='font-bold text-3xl'>My Trips</h1>
      <div className='mt-10 grid grid-cols-2 md:grid-cols-3 gap-5'>
        {userTrips?.length>0?
        userTrips.map((trip,index)=>(
         <UserTripCardItem key={index} trip={trip}/>
        ))
        :
        <h2 className='text-gray-500 text-xl font-semibold'>
          OOps , No trips yet :/ 
        </h2>
      }
      </div>
    </div>
  )
}

export default MyTrips