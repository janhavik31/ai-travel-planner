import React, { useEffect , useState} from 'react'
import { Button } from '../ui/button'
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Header() {

  const user = JSON.parse(localStorage.getItem('user'));

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
   });

  useEffect(()=>{
    console.log(user);
  },[])
  const [openDailog, setOpenDailog] = useState(false);

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
        window.location.reload();
      });
  };

  return (    
    <div className='p-3 shadow-sm flex justify-between
     items-center px-7'>
      <div className='flex items-center text-3xl gap-2 file:text font-semibold'>
      <img className='w-14 h'  src="/logo.png" alt="" srcset="" />
      <h2>Travelia</h2>
      </div>

      <div> 
        {user?
        <div className='flex items-center gap-3'>
          <a href="/my-trips">
          <Button  className="rounded-3xl">My Trips</Button>
          </a>
          <Popover>
           <PopoverTrigger>
           {/* {user?.picture} */}
           <img src={user?.picture?user?.picture:"/profile.jpg"} className='w-[40px]  rounded-full' alt="profile" />

             {/* <img src="/profile.jpg" className='w-[40px]  rounded-full' alt="profile" /> */}
           </PopoverTrigger>
          <PopoverContent>
            
            <h2 className='cursor-pointer' onClick={()=>{
              googleLogout();
              localStorage.clear();
              window.location.reload();
            }}>Logout</h2>
          </PopoverContent>
         </Popover>

        </div>
      :
      <Button onClick={()=>{
        setOpenDailog(true);
      }}> Sign In</Button>}
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
  )
}



export default Header