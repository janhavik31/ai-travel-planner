import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from "@/service/firebaseConfig";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { toast } from "sonner";
import { doc, setDoc } from "firebase/firestore";
import { chatSession } from "@/service/AiModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";




function CreateTrip() {
      const [place, setPlace] = useState();
      const [formData, setFormData] = useState([]);
      const [openDailog, setOpenDailog] = useState(false);
      const [loading, SetLoading] = useState(false);

      const navigate = useNavigate();
      const handleInputChange = (name, value) => {
          setFormData({
          ...formData,
          [name]: value,
        });
      };

      useEffect(() => {
          console.log(formData);
        }, [formData]);


       const login = useGoogleLogin({
         onSuccess: (codeResp) => GetUserProfile(codeResp),
         onError: (error) => console.log(error),
        });

       const onGenerateTrip = async () => {
       const user = localStorage.getItem("user");
         if (!user){
         setOpenDailog(true);
         return;
         }

        if (
          (formData?.noOfDays > 5 && !formData?.location) ||
          !formData?.budget ||
          !formData.traveler
        ) {
          toast.warning("Please fill all details");
          return;
        }
    
        SetLoading(true);
        const FINAL_PROMPT = AI_PROMPT.replace(
          "{location}",
          formData?.location.label
        )
          .replace("{noOfDays}", formData?.noOfDays)
          .replace("{traveler}", formData?.traveler)
          .replace("{budget}", formData?.budget.title)
          .replace("{noOfDays}", formData?.noOfDays);
    
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log(result.response?.text());
    
        SetLoading(false);
        SaveAiTrip(result?.response?.text());
  };


  const SaveAiTrip = async (TripData) => {
    SetLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AiTrips", docId), {
      userSelection: formData,
      TripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    SetLoading(false);
    navigate(`/view-trip/${docId}`);
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: `Application/json`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDailog(false);
        onGenerateTrip();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 px-5 mt-10">
      <h1 className=" font-bold text-3xl">Tell us your preferences 🏕️🌴</h1>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information. and our trip planner will generate
        a Customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-9">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip ?
          </h2>
          <Input
            placeholder={"Ex.3"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget ?</h2>
          {/* <p>The budget is exclusively allocated for activities and dining purposes</p> */}
          <div className="grid grid-cols-3 gap-6 cursor-pointer">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item)}
                className={`p-4 border rounded-lg 
                  hover:shadow-lg flex flex-col gap-1
                  ${formData?.budget == item && "shadow-lg border-black"}
                 `}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 classNaIme="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan travelling with on your next adventure ?
          </h2>
          <div className="grid grid-cols-3 gap-6 cursor-pointer">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg 
                hover:shadow-lg flex flex-col gap-1
              ${formData.traveler == item.people && "shadow-lg border-black"}`}
                onClick={() => {
                  handleInputChange("traveler", item.people);
                }}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>

          <div className="mb-14 mt-3 justify-end flex">
            <Button disabled={loading} onClick={onGenerateTrip}>
              {loading ? (
                <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
              ) : (
                "Generate Trip"
              )}
            </Button>
          </div>

          <Dialog open={openDailog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription>
                  <div className="flex items-center gap-2">
                    <img className="w-14" src="/logo.png" alt="" />
                    <h1 className="font-bold text-3xl text-black">Travelia</h1>
                  </div>
                  <h1 className="font-bold text-lg mt-6">
                    Sign-In With Google
                  </h1>
                  <p>Sign in to the App with Google Authentication</p>

                  <Button
                    onClick={login}
                    className="w-full mt-5 flex gap-4 items-center"
                  >
                    <FcGoogle className="h-7 w-7" />
                    Sign In with Google
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
