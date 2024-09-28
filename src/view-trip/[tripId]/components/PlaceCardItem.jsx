import React , { useState , useEffect }  from 'react'
import { Button } from '@/components/ui/button';
import  {FaMapLocationDot} from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { PHOTO_REF_URL } from '@/service/GlobalApi';

import { GetPlaceDetails } from '@/service/GlobalApi';


function PlaceCardItem({place}) {

  const[PhotoUrl,setPhotoUrl] = useState();
  useEffect(() => {
      place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
      const data = {
          textQuery: place.PlaceName,
      };
      const result = await GetPlaceDetails(data).then((resp) => {
          const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name );
         setPhotoUrl(PhotoUrl);
      });
  };

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.PlaceName} target='_blank'>
    <div className='border rounded-xl p-3 mt-1 flex gap-6 hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
      <img src={PhotoUrl?PhotoUrl:"/pngtree.jpg"} alt="" className='h-[150px] w-[150px] rounded-xl object-cover'/>
        <div className='my-auto flex flex-col gap-1'>
            <h2 className='font-bold text-lg'>{place.PlaceName}</h2>
            <p className='text-sm text-gray-500'>{place.PlaceDetails}</p>
            <div className='flex items-end'>
               <h2 className='mt-2'>🕐{place.TimeTravel}</h2>
               <Button className="h-8 mx-2 "><FaMapLocationDot/></Button>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem