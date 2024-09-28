export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveler in exploration',
        icon: '✈️',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two travelers in tandem',
        icon: '🥂',
        people:'2'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon: '🏡',
        people:'3 to 5'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekers',
        icon: '⛵',
        people:'5 to 10 People'
    },
]

export const SelectBudgetOptions = [
     {
        id:1,
        title:'Cheap',
        desc:'Stay concious of costs',
        icon:'💴'
     },
     {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰'
     },
     {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'💸'
     },
     
]

export const AI_PROMPT = 'Generate Travel Plan for Location : {location}, for {noOfDays} Days for {traveler} people with a {budget} budget ,Give me a Hotels options list with HotelName. HotelAddress, Price. HotelImage , GeoCoordinates. rating. descriptions and suggest itinerary with placeName, PlaceDetails, PlaceImage , GeoCoordinates, TicketPricing, rating, TimeTravel each of the location for {noOfDays} days with each day plan with best time to visit in JSON format'