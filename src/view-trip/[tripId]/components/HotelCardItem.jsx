import React from 'react'
import { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom'
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';

function HotelCardItem({hotel}) {
    const[PhotoUrl,setPhotoUrl] = useState();
    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel.HotelName,
        };
        const result = await GetPlaceDetails(data).then((resp) => {
            // console.log(resp.data);
            const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name );
           setPhotoUrl(PhotoUrl);
        });
    };

  return (
    <a href={'https://www.google.com/maps/search/?api=1&query=' + hotel.HotelName+","+hotel?.HotelAddress}
         target="_blank" rel="noopener noreferrer">

          <div className="hover:scale-105 transition-all cursor-pointer">
            <img src={PhotoUrl?PhotoUrl:"/pngtree.jpg"} alt="" srcset="" className="rounded-lg h-[180px] w-full object-cover" />
            <div className="my-2 ml-1 flex flex-col gap-2">
            <h2 className="font-semibold">{hotel.HotelName}</h2>
              <h2 className=" text-gray-500">📍{hotel.HotelAddress}</h2>
              <h2 className=" font-medium">💸 {hotel.Price} per night</h2>
              <h2 className=" font-medium"><span className='  m-1 shadow-sm'>⭐</span>{hotel.rating} stars</h2>
            </div>
          </div> 
        </a>
  )
}

export default HotelCardItem