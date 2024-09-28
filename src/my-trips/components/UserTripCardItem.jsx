import { GetPlaceDetails } from '@/service/GlobalApi';
import React , {useState ,useEffect} from 'react'
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';
 
function UserTripCardItem({trip}) {useEffect(() => {
    console.log(trip);  // Debugging: Check the structure of trip object
  }, [trip]); 

  const[PhotoUrl,setPhotoUrl] = useState();
  useEffect(() => {
      trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
      const data = {
          textQuery: trip?.userSelection?.location?.label,
      };
      const result = await GetPlaceDetails(data).then((resp) => {
          // console.log(resp.data);
          const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name );
         setPhotoUrl(PhotoUrl);
      });
  };

  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all '>
        <img src={PhotoUrl?PhotoUrl:"./pngtree.jpg" }
        className="mx-3 object-cover rounded-xl h-[200px] w-[270px]" alt="" />
        <div className='mx-4 my-2'>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
            <h2 className='text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget?.title} Budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem