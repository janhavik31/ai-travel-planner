import { useParams } from "react-router-dom"
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore"
import { useEffect ,useState} from "react"
import { toast } from "sonner";
import InfoSection from "./components/InfoSection";
import Hotels from "./components/Hotels";
import Places from "./components/Places";
import Footer from "./components/Footer";
function Viewtrip() {

    
    const {tripId} = useParams();
    const [trip,SetTrip] = useState([]);
   
    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])

    const GetTripData = async()=>{
        const docRef = doc(db,'AiTrips',tripId);
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()){
            console.log("document:" ,docSnap.data());
            SetTrip(docSnap.data());
        }else{
            console.log("NO such document");
            toast('No trip Found!');
    }
   
    }

  return (
    <div className="p-10 md:px-20 lg:px-44">
       {/* Information Section  */}
        <InfoSection trip={trip}/>


       {/* Hotel Reccomendation */}
        <Hotels trip={trip}/>


       {/* Daily Plan */}
      {<Places trip={trip}/>}
       
       {/* Footer */}
       <Footer/>
       
    </div>
  )
}

export default Viewtrip