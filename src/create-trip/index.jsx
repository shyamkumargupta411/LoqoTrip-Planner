import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelersList } from '@/constant/option';
import { chatSession } from '@/servies/AIModel';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import { doc, setDoc } from "firebase/firestore"; 
import { AiOutlineLoading } from "react-icons/ai";
import { db } from '@/servies/firebaseConfig';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const CreateTrip = () => {
  const [places, setPlace] = useState(null);
  const [openDailog , setOpenDailog] = useState(false); 
  const [loading,setLoading] = useState(false); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: '',
    noofDays: '',
    budget: '',
    travelers: ''
  });

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Login Successful:", tokenResponse);
      GetUserProfile(tokenResponse); // Fetch user profile
    },
    onError: (error) => console.log("Login Failed:", error),
    ux_mode: "redirect"
  });
  
  

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const ongenerateTrip = async()=>{

    const user =localStorage.getItem('user');
    if(!user){
      setOpenDailog(true)
      return;
    }

    if(formData?.noofDays>5&&(!formData?.budget||!formData?.location||!formData?.travelers)){
      toast("Enter Your Detail");
      return;
    }
    setLoading(true);
    const Final_PROMPT = AI_PROMPT
    .replace("{location}", formData?.location?.label ) 
    .replace("{totalDays}", formData?.noofDays)
    .replace("{traveler}", formData?.travelers)
    .replace("{budget}", formData?.budget);
    console.log(Final_PROMPT);
    const result = await chatSession.sendMessage(Final_PROMPT);
    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text())
  }

  const SaveAiTrip = async (TripData) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const docId = Date.now().toString();
      TripData = JSON.stringify(TripData); // ✅ Convert to string before storing
      
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),  // ✅ Store as a string without JSON.parse
        userEmail: user?.email,
        id: docId
      });
  
      setLoading(false);
      navigate('/view-trip/'+docId);
      //toast.success("Trip saved successfully!"); // Optional success message
    } catch (error) {
      console.error("Error saving trip:", error);
      //toast.error("Failed to save trip."); // Optional error message
      setLoading(false);
    }
  };
  

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'application/json'
        }  
    }).then((resp) => {
      console.log("User Profile Data:", resp.data); // Corrected to access response data
      localStorage.setItem('user', JSON.stringify(resp.data)); // Store user data in local storage
      setOpenDailog(false);
      ongenerateTrip();
    }).catch((error) => {
      console.error("Error fetching user profile:", error);
    });
  };
  
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 x;:px-10 px-5 mt-10">
      <h1 className="font-bold text-3xl">
        Tell us your travel preferences
      </h1>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>
      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">What is the destination of choice? 🧩🪀 </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: places,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location', v);
              }
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">How Many Days are you Planning your trip? 🏝️ 🎈</h2>
          <input
               value={formData.noofDays}  
               onChange={(e) => handleInputChange('noofDays', e.target.value)}  
               placeholder="ex. 3"
              type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
             />

        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className="grid grid-cols-3 gap-15 mt-4">
            {SelectBudgetOptions.map((item, index) => (
              <div key={index} onClick={()=>handleInputChange('budget' , item.title)} className={`p-4 border cursor-pointer rounded-lg  hover:shadow-lg ${formData?.budget==item.title&&'shadow-lg border-black'}`}>
                <h2 className="text-4xl">{item.icon}</h2>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with on your next adventure?</h2>
          <div className="grid grid-cols-3 gap-15 mt-4">
            {SelectTravelersList.map((item, index) => (
              <div onClick={()=>handleInputChange('travelers' , item.title)} key={index} className={`p-4 border cursor-pointer rounded-lg  hover:shadow-lg ${formData?.travelers==item.title&&'shadow-lg border-black'}`}>
                <h2 className="text-4xl">{item.icon}</h2>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button disabled={loading} 
        onClick={ongenerateTrip}>
          {loading?
          <AiOutlineLoading className='h-7 w-7 animate-spin'/>:'Generate Trip'
          }
          </Button>
      </div>
  <Dialog open = {openDailog}>
  <DialogContent>
    <DialogHeader>
    <DialogTitle>Sign In With Google</DialogTitle>
      <DialogDescription>
        <img src="/logo.svg"/>
        <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
        <p>Sign in to the App with google authentication securly</p>
        <Button onClick={login} className="w-full mt-5">Sign In With Google</Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog> 

    </div>
  );
};

export default CreateTrip;

