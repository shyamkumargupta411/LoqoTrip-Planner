import React, { useState } from 'react';

export function PlaceToVisit({ trip }) {
  // Parse tripData if it's a string
  let parsedTripData;
  try {
    parsedTripData = typeof trip.tripData === 'string' 
      ? JSON.parse(trip.tripData) 
      : trip.tripData;
  } catch (error) {
    console.error("Error parsing trip data:", error);
    return (
      <div>
        <h1 className='font-bold text-2xl mt-10'>Places to Visit</h1>
        <p className='text-red-500'>Error loading itinerary data</p>
      </div>
    );
  }

  // Function to handle image errors
  const handleImageError = (e) => {
    const fallbackImages = [
      '/placeholder.jpg',
      'https://via.placeholder.com/400x300?text=Place+Image',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlIEF2YWlsYWJsZTwvdGV4dD48L3N2Zz4='
    ];

    const currentSrc = e.target.src;
    const nextFallbackIndex = fallbackImages.findIndex(src => src === currentSrc) + 1;

    if (nextFallbackIndex < fallbackImages.length) {
      e.target.src = fallbackImages[nextFallbackIndex];
    } else {
      e.target.style.display = 'none'; // Hide image if all fallbacks fail
    }
  };

  return (
    <div>
      <h1 className='font-bold text-2xl mt-10'>Places to Visit</h1>
      <div className="space-y-6">
        {Object.entries(parsedTripData?.itinerary || {}).map(([day, details], index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <h2 className='font-bold text-xl text-blue-600'>
              {day.replace(/day(\d+)/, 'Day $1')}
            </h2>
            <p className='italic text-gray-600 mb-3'>{details.theme}</p>
            <div className="space-y-4">
              {details.activities.map((activity, idx) => (
                <div key={idx} className='border-l-4 border-blue-200 pl-4'>
                  <div className="flex flex-col md:flex-row gap-4">
                    {activity.placeImageUrl && (
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${activity.placeName},${activity.geoCoordinates?.latitude},${activity.geoCoordinates?.longitude}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0"
                      >
                        <img
                          src={activity.placeImageUrl}
                          alt={activity.placeName}
                          className="w-full md:w-48 h-48 object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                          onError={handleImageError}
                          loading="lazy"
                        />
                      </a>
                    )}
                    <div className="flex-grow">
                      <h3 className='font-semibold text-lg'>{activity.placeName}</h3>
                      <p className='text-gray-700'>{activity.placeDetails}</p>
                      {activity.timeTravel && (
                        <p className='text-sm text-gray-500 mt-1'>
                          Travel time: {activity.timeTravel}
                        </p>
                      )}
                      {activity.rating && (
                        <p className='text-sm text-yellow-600 mt-1'>
                          Rating: ⭐ {activity.rating}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaceToVisit;
