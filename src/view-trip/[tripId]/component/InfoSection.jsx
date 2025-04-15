import { Button } from '@/components/ui/button';
import React from 'react';
import { IoMdShareAlt } from "react-icons/io";

const InfoSection = ({ trip }) => {
  return <div>
    <img src = "/placeholder.jpg" alt = "placeholder" className='h-[340px] w-full object-cover rounded' />
    <div className='my-5 flex flex-col gap-2'> 
        <h1 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h1>
        <div className='flex justify-between items-center'>
            <div className='flex gap-5'>
                <h1 className="p-1 px-6 bg-gray-200 rounded-full text-gray-500">📆{trip?.userSelection?.noofDays || "N/A"} Days</h1>
                <h1 className="p-1 px-6 bg-gray-200 rounded-full text-gray-500">💰{trip?.userSelection?.noofDays || "N/A"} Budget</h1>
                <h1 className="p-1 px-6 bg-gray-200 rounded-full text-gray-500">🥂{trip?.userSelection?.travelers|| "N/A"} Traveler</h1>
            </div>
            <div>
                <Button>
                <IoMdShareAlt />
                </Button>
            </div>
        </div>
    </div>
  </div>;
};

export default InfoSection;
