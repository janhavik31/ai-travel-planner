import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function Places({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl">Places to visit</h2>
    <div >
        {trip.TripData?.itinerary?.map((item, index) => (
          <div className="mt-6">
              <h2 className="font-medium text-lg">Day {item.Day}</h2>
              <div className="grid md:grid-cols-2 gap-6 ">
                 {item.DayPlan?.map((place, index) => (
                 <div className="mt-2">
                    <h2 className="font-medium text-sm text-orange-600">{place.TimeTravel}</h2>
                    <PlaceCardItem  place={place} />
                 </div>
                 ))}
              </div>
          </div>
          ))}
    </div>
    </div>
  );
}

export default Places;
