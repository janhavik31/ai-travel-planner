import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const chatSession = model.startChat({
    generationConfig,

    history: [
        {
            role: "user",
            parts: [
                {
                    text: "Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget ,Give me a Hotels options list with HotelName. Hotel address, Price. hotel image url, geo coordinates. rating. descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format\n\n",
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: '```json\n{"hotelOptions": [{"HotelName": "The D Las Vegas", "Hotel address": "301 Fremont Street, Las Vegas, NV 89101", "Price": "$50-$100", "hotel image url": "https://www.the-d.com/images/hotel/exterior-images/the-d-las-vegas-exterior-1.jpg", "geo coordinates": "36.1699, -115.1423", "rating": "3.5", "descriptions": "A budget-friendly hotel located in the heart of Fremont Street Experience. It features a casino, restaurants, and a rooftop pool."}, {"HotelName": "Golden Nugget Las Vegas", "Hotel address": "129 E Fremont St, Las Vegas, NV 89101", "Price": "$75-$150", "hotel image url": "https://www.goldennugget.com/las-vegas/images/hero-images/hero-image-mobile-gnlv.jpg", "geo coordinates": "36.1698, -115.1426", "rating": "4.0", "descriptions": "A historic hotel with a modern twist, known for its casino, pool complex, and the famous shark tank."}, {"HotelName": "Circus Circus Hotel & Casino", "Hotel address": "2880 S Las Vegas Blvd, Las Vegas, NV 89109", "Price": "$40-$80", "hotel image url": "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/59/c1/f1.jpg", "geo coordinates": "36.0996, -115.1721", "rating": "3.0", "descriptions": "A family-friendly hotel with a circus theme, featuring a midway, carnival games, and a variety of shows."}, {"HotelName": "The Orleans Hotel & Casino", "Hotel address": "4500 W Tropicana Ave, Las Vegas, NV 89103", "Price": "$60-$120", "hotel image url": "https://www.orleanscasino.com/images/hero-images/orleans-hero-mobile.jpg", "geo coordinates": "36.0951, -115.2165", "rating": "3.5", "descriptions": "A spacious hotel with a casino, multiple restaurants, a bowling alley, and a movie theater."}], "itinerary": [{"Day": 1, "DayPlan": [{"PlaceName": "Fremont Street Experience", "Place Details": "Walk the pedestrian-friendly Fremont Street, enjoy street performers, live music, and the Viva Vision light show.", "Place Image Url": "https://www.vegasexperience.com/media/images/attraction/freemont-street-experience-las-vegas-attraction-gallery-1.jpg", "Geo Coordinates": "36.1699, -115.1423", "ticket Pricing": "Free", "rating": "4.5", "Time travel": "2-3 hours"}, {"PlaceName": "The Neon Museum", "Place Details": "Explore a collection of iconic Las Vegas neon signs from the past.", "Place Image Url": "https://www.neonmuseum.org/wp-content/uploads/2021/05/Neon-Museum-Night-Tour-980x551.jpg", "Geo Coordinates": "36.1734, -115.1531", "ticket Pricing": "$25", "rating": "4.0", "Time travel": "1-2 hours"}, {"PlaceName": "The Mob Museum", "Place Details": "Learn about the history of organized crime in Las Vegas and the United States.", "Place Image Url": "https://www.themobmuseum.org/media/images/mob-museum-hero-image.jpg", "Geo Coordinates": "36.1700, -115.1365", "ticket Pricing": "$25", "rating": "4.0", "Time travel": "2-3 hours"}]}, {"Day": 2, "DayPlan": [{"PlaceName": "Bellagio Conservatory & Botanical Garden", "Place Details": "Admire the stunning floral displays and themed gardens.", "Place Image Url": "https://www.bellagio.com/content/dam/bellagio/images/conservatory/conservatory-botanical-garden-hero-image.jpg", "Geo Coordinates": "36.1168, -115.1730", "ticket Pricing": "Free", "rating": "4.5", "Time travel": "1-2 hours"}, {"PlaceName": "The Venetian & The Palazzo", "Place Details": "Experience the canals, gondolas, and luxury shopping.", "Place Image Url": "https://www.venetian.com/content/dam/venetian/images/hero-images/venetian-hero-image.jpg", "Geo Coordinates": "36.1201, -115.1751", "ticket Pricing": "Free", "rating": "4.0", "Time travel": "2-3 hours"}, {"PlaceName": "The LINQ Promenade", "Place Details": "Enjoy dining, shopping, and entertainment at this outdoor promenade.", "Place Image Url": "https://www.caesars.com/content/dam/caesars/linq/linq-promenade-hero-image.jpg", "Geo Coordinates": "36.1066, -115.1715", "ticket Pricing": "Free", "rating": "4.0", "Time travel": "1-2 hours"}]}, {"Day": 3, "DayPlan": [{"PlaceName": "Hoover Dam", "Place Details": "Take a day trip to the iconic Hoover Dam and learn about its history and engineering.", "Place Image Url": "https://www.nps.gov/hoov/learn/photosmultimedia/hoover-dam-overview.jpg", "Geo Coordinates": "36.0053, -114.9873", "ticket Pricing": "$30", "rating": "4.5", "Time travel": "4-5 hours"}, {"PlaceName": "Red Rock Canyon National Conservation Area", "Place Details": "Hike or drive through the scenic Red Rock Canyon and admire the stunning rock formations.", "Place Image Url": "https://www.blm.gov/sites/blm.gov/files/uploads/red-rock-canyon-1403093015.jpg", "Geo Coordinates": "36.1456, -115.2601", "ticket Pricing": "$15", "rating": "4.0", "Time travel": "2-3 hours"}, {"PlaceName": "Seven Magic Mountains", "Place Details": "See the colorful rock formations art installation by Ugo Rondinone.", "Place Image Url": "https://www.visitlasvegas.com/media/images/attraction/seven-magic-mountains-las-vegas-attraction-gallery-4.jpg", "Geo Coordinates": "36.0683, -115.0610", "ticket Pricing": "Free", "rating": "4.0", "Time travel": "1-2 hours"}]}]}\n\n```',
                },
            ],
        },
    ],
});
