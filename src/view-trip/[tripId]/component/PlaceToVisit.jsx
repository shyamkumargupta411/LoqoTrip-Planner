import React from 'react';

export function PlaceToVisit({ trip }) {
  return (
    <div>
      <h1 className='font-bold text-2xl mt-10'>Places to Visit</h1>
      <div>
        {Object.entries(trip.tripData?.itinerary || {}).map(([day, details], index) => (
          <div key={index}>
            <h2 className='font-bold text-lg'>{day.replace("day", "Day ")}</h2>
            <p className='italic'>{details.theme}</p>
            <ul>
              {details.activities.map((activity, idx) => (
                <li key={idx} className='mt-2'>
                  <strong>{activity.placeName}</strong>: {activity.placeDetails}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaceToVisit;
