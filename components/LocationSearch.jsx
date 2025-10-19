"use client"

import React, { useRef, useEffect, useState } from 'react';
import useGoogleMapsScript from '@/hooks/useGoogleMapsScript'; // Adjust path

// Helper function from the previous answer
function getCityNameFromComponents(address_components) {
  let cityName = '';
  for (let component of address_components) {
    if (component.types.includes('locality')) {
      cityName = component.long_name;
      break;
    }
    if (component.types.includes('administrative_area_level_3')) {
       cityName = component.long_name;
    }
  }
  return cityName || 'N/A';
}

const LocationSearch = ({setloc}) => {
  // Use a ref to attach the Google Autocomplete to the input element
  const inputRef = useRef(null);
  
  // State to hold and display the final search result
  const [locationData, setLocationData] = useState(null);

  // Check if the Google Maps script is loaded
  const isScriptLoaded = useGoogleMapsScript();

  useEffect(() => {
    // 1. Ensure the script is loaded AND the input ref is available
    if (isScriptLoaded && inputRef.current) {
      // Ensure the 'google.maps.places' object is available
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        console.error("Google Places library is not available.");
        return;
      }

      // 2. Initialize the Autocomplete object
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['geocode'],
        componentRestrictions: { country: ['ae', 'sa', 'qa', 'om', 'bh', 'kw'] }, // Example: US only
        fields: ['place_id', 'geometry', 'address_components', 'name'],
      });

      // 3. Add the listener for place selection
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();

        if (!place.geometry) {
          setloc({ error: `No details available for input: "${place.name}"` });
          return;
        }

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const cityName = getCityNameFromComponents(place.address_components);

        // Update the component state with the extracted data
        setloc({
          name: place.name,
          city: cityName,
          lat: lat,
          lng: lng,
        });
      });
      
      // Cleanup listener if the component unmounts
      return () => {
        // Since Google Maps doesn't provide a clean `removeListener` for Autocomplete directly,
        // we mainly rely on the component being unmounted. In a complex app, you might use 
        // a more sophisticated wrapper library like `@react-google-maps/api`.
      };
    }
  }, [isScriptLoaded]); // Re-run effect when the script status changes

  if (!isScriptLoaded) {
    return <div>Loading map services...</div>;
  }

  return (
    <div>
      <input 
        ref={inputRef}
        type="text" 
        placeholder="Enter a city or address..." 
        style={{ padding: '10px', width: '300px' }}
        
      />
      
    </div>
  );
};

export default LocationSearch;
