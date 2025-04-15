import React from 'react';
import { Link } from 'react-router-dom';

function Hotel({ trip }) {
    let hotelOptions = [];

    // try {
    //     if (typeof trip?.tripData === 'string') {
    //         // Ensure valid JSON by removing inline comments (if any exist)
    //         const sanitizedData = trip.tripData.replace(/\/\/.*$/gm, '');
    //         const parsedData = JSON.parse(sanitizedData);
    //         hotelOptions = parsedData?.hotelOptions || [];
    //     } else if (trip?.tripData?.hotelOptions) {
    //         hotelOptions = trip.tripData.hotelOptions;
    //     }
    // } catch (error) {
    //     console.error("Error parsing tripData:", error.message);
    //     console.log("Raw tripData:", trip.tripData);
    //     hotelOptions = [];
    // }
    try {
        if (typeof trip?.tripData === 'string') {
            const sanitizedData = trip.tripData
                .replace(/\\n/g, '\\n')
                .replace(/\\r/g, '\\r')
                .replace(/\\t/g, '\\t')
                .replace(/[\u0000-\u001F]+/g, ' ')
                .replace(/"([^"]*?)"\s*:\s*"([^"]*?)(?<!\\)"/g, (match, key, value) => {
                    return `"${key}": "${value.replace(/"/g, '\\"')}"`;
                });
            const parsedData = JSON.parse(sanitizedData);
            hotelOptions = parsedData?.hotelOptions || [];
        } else if (trip?.tripData?.hotelOptions) {
            hotelOptions = trip.tripData.hotelOptions;
        }
    } catch (error) {
        console.error("Error parsing tripData:", error.message);
        console.log("Raw tripData:", trip.tripData);
        hotelOptions = [];
    }
    
    

    if (!hotelOptions.length) {
        return (
            <div>
                <h1 className='font-bold text-2xl mt-10'>Recommended Hotels</h1>
                <p className='text-gray-600 mt-4'>No hotel options available or there was an error loading the data.</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className='font-bold text-2xl mt-10'>Recommended Hotels</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {hotelOptions.map((hotel, index) => (
                    <Link 
                        key={index} 
                        to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName)},${encodeURIComponent(hotel?.hotelAddress)}`} 
                        target='_blank'
                    >
                        <div className='hover:scale-105 transition-all cursor-pointer'>
                            <img
                                src={hotel?.hotelImageUrl || '/placeholder.jpg'}
                                alt={hotel?.hotelName || 'Hotel'}
                                className="w-full h-48 object-cover"
                                onError={(e) => { e.target.src = '/placeholder.jpg'; }}
                            />
                            <div className="p-4">
                                <h2 className='font-semibold text-xl'>{hotel?.hotelName || 'Hotel Name'}</h2>
                                <p className='text-gray-600 text-sm mt-1'>{hotel?.hotelAddress || 'Address not available'}</p>
                                <p className='text-sm mt-2'>
                                    Price: {hotel?.price?.currency || 'INR'} {hotel?.price?.approximatePricePerNight || 'N/A'} / night
                                </p>
                                <div className='flex items-center mt-1'>
                                    <span className='text-sm'>Rating: </span>
                                    <span className='text-yellow-500 ml-1'>⭐ {hotel?.rating || 'N/A'}</span>
                                </div>
                                <p className='text-sm text-gray-700 mt-2'>{hotel?.description || 'No description available'}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Hotel;
