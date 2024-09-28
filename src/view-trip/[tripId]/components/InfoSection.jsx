import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { PHOTO_REF_URL } from "@/service/GlobalApi";

export default function InfoSection({ trip }) {

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
        <div>
            <img
                src={PhotoUrl?PhotoUrl:"/pngtree.jpg"}
                alt=""
                srcset=""
                className="h-[330px] w-full object-cover rounded-xl"
            />

            <div className=" flex justify-between items-center">
                <div className=" my-5 flex flex-col gap-3">
                    <h2 className="font-bold text-2xl my-1">
                        {trip?.userSelection?.location?.label} ツ
                    </h2>
                    <div className="flex gap-5">
                        <h2 className="p-1 px-3 bg-gray-200 text-gray-500 rounded-full font-medium">
                            <img src="/day.png" alt="budget" srcset="" className=" inline w-7 mx-2" />
                             {trip?.userSelection?.noOfDays} Day
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 text-gray-500 rounded-full font-medium">
                        <img src="/money.png" alt="budget" srcset="" className=" inline w-7 mx-2"  />
                        {trip?.userSelection?.budget?.title} Budget
                             
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 text-gray-500 rounded-full font-medium ">
                        <img src="/travel.png" alt="budget" srcset="" className=" inline w-7 mx-2"  />
                             No. of traveler: {trip?.userSelection?.traveler}
                        </h2>
                    </div>
                </div>
                <Button>
                    <IoIosSend />
                </Button>
            </div>
        </div>
    );
}
