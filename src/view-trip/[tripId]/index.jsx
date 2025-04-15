import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '@/servies/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import InfoSection from "./component/InfoSection.jsx"; 
import { useState } from 'react';
import Hotel from "./component/Hotel.jsx";
import PlaceToVisit from './component/PlaceToVisit.jsx';


function Viewtrip() {
    const { tripId } = useParams();
    const[trip,setTrip] = useState([]);

    useEffect(() => {
        if (tripId) {
            GetTripData();
        }
    }, [tripId]);

    const GetTripData = async () => { // Correct function definition
        try {
            const docRef = doc(db, 'AITrips', tripId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Trip Data:", docSnap.data());
                setTrip(docSnap.data());
            } else {
                console.log('No such document');
            }
        } catch (error) {
            console.error('Error fetching trip data:', error);
        }
    };

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56 2xl:px-96'>
            {/*Information Section */}
            <InfoSection trip={trip} />
            {/*Recommendation Hotels */}
            <Hotel trip ={trip} />
            {/*Daily Plan */}
            <PlaceToVisit trip={trip} />
            {/*Footer  */}
        </div>
    );
}

export default Viewtrip;
