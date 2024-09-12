'use client';
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import Papa from 'papaparse';

export default function Home() {
  const [map, setMap] = useState(null);
  const [data, setData] = useState([]); // To store all hospital data
  const [filteredData, setFilteredData] = useState([]); // To store filtered hospital data
  const [zipCode, setZipCode] = useState(''); // Store user input zip code
  const [userLocationMarker, setUserLocationMarker] = useState(null);
  const [userLocation, setUserLocation] = useState(null); // To store user's current location
  const [routingControl, setRoutingControl] = useState(null); // To store routing control

  // Load CSV file on mount
  Papa.parse('Hospitals.csv', {
    download: true,
    header: true,
    complete: (result) => {
      setData(result.data); 
    },
    error: (error) => {
      console.error('Error fetching CSV:', error); 
    }
  });

  // Load the map
  useEffect(() => {
  if (typeof window !== 'undefined') {
    const newMap = L.map('map').setView([40.7128, -74.0060], 10); // NYC

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(newMap);

    setMap(newMap);
    
    // Inside the useEffect for map and user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);

          const customIcon = L.icon({
            iconUrl: './currentLocation.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          });

          const marker = L.marker([latitude, longitude], { icon: customIcon });
          marker.addTo(newMap)
            .bindPopup('Your Location');
          setUserLocationMarker(marker);
        });
      }

      return () => {
        newMap.remove();
        setMap(null);
      };
    }
  }, []);

  // Add markers to the map when filtered data changes
  useEffect(() => {
    if (map && filteredData.length > 0) {
      // Clear existing markers
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker && layer !== userLocationMarker) {
          map.removeLayer(layer);
        }
      });

      filteredData.forEach((location) => {
        const { 'lat': latitude, 'long': longitude, 'ZIP Code': zip, 'Facility Name': name } = location;

        const customIcon = L.icon({
          iconUrl: './hospitalmarker.png', // Your custom marker icon
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });

        L.marker([latitude, longitude], { icon: customIcon })
          .addTo(map)
          .bindPopup(name)
          .on('click', () => {
            if (userLocation) {
              if (routingControl) {
                routingControl.remove();
              }

              const route = L.Routing.control({
                waypoints: [
                  L.latLng(userLocation),
                  L.latLng(latitude, longitude)
                ],
                createMarker: () => null // Remove default markers
              }).addTo(map);

              setRoutingControl(route);
            }
          }); 
      });
    }
  }, [map, filteredData, userLocation]);

  // Function to get the range of zip codes
  const getNearbyZipCodes = (zip) => {
    const startZip = Number(zip) - 100;
    const endZip = Number(zip) + 100;
    const zipRange = [];
    for (let i = startZip; i <= endZip; i++) {
      zipRange.push(i.toString());
    }
    return zipRange;
  };

  const handleSearch = () => {
    const zipRange = getNearbyZipCodes(zipCode);
    const filtered = data.filter((entry) => {
      return zipRange.includes(entry['ZIP Code']);
    });
    setFilteredData(filtered);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="px-4 py-4 bg-white border-b border-gray-200 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="text-[#0000FF] font-bold text-2xl">Care Route</div>
        </div>
      </header>

      <main className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="bg-[#0000FF] text-white p-8 rounded-lg mb-12">
          <h1 className="mb-4 text-4xl font-bold">Are you an expecting mother who wants to know the options?</h1>
          <p className="text-xl">We're here to show you</p>
        </div>

        <div className="mb-12">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Find the closest Hospital</h2>
          <input
            type="text"
            placeholder="Enter a ZIP Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="w-full p-3 text-black border border-gray-300 rounded-md"
          />
          <button
            onClick={handleSearch}
            className="mt-4 w-full p-3 bg-blue-600 text-white rounded-md"
          >
            Search
          </button>
        </div>

        <div className="mb-12 overflow-hidden bg-white rounded-lg shadow-lg">
          <div id="map" className="h-[400px] w-full" style={{color : "black"}}></div>
        </div>
      </main>
    </div>
  );
}