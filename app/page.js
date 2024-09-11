'use client';
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Home() {
  const [map, setMap] = useState(null);
  const [zipcode, setZipcode] = useState('');

  const handleSubmit = () => {
    console.log('ZIP Code:', zipcode);
    setZipcode('');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newMap = L.map('map').setView([40.7128, -74.0060], 10); // NYC

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(newMap); // this is the syle i went for [grey]

      setMap(newMap);

      return () => {
        newMap.remove();
      };
    }
  }, []);

  useEffect(() => {
    if (map) {
      //testing
      const hospitalLocation = [[40.6084, -73.9574]];
      
      // creating a customized icon
      const customIcon = L.icon({
        iconUrl: './hospitalmarker.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32] 
      });

      // now ima add the marker
      L.marker(hospitalLocation[0], { icon: customIcon })
        .addTo(map)
        .bindPopup("2525 Kings Highway Hospital")

    }
  }, [map]);

  return (
    <div className="min-h-screen bg-white">
      <header className="px-4 py-4 bg-white border-b border-gray-200 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="text-[#0000FF] font-bold text-2xl">Maternity Map</div>
        </div>
      </header>

      <main className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="bg-[#0000FF] text-white p-8 rounded-lg mb-12">
          <h1 className="mb-4 text-4xl font-bold">Join us in the pursuit to change patient's lives.</h1>
          <p className="text-xl">Each and every person in a clinical trial plays a powerful role.</p>
        </div>

        <div className="mb-12">
      <h2 className="mb-4 text-3xl font-bold text-gray-900">Find the Closest Hospital</h2>
      <div className="flex">
        <input
          type="text"
          placeholder="Enter your ZIP Code"
          className="flex-grow w-full p-3 text-black border border-gray-300 rounded-l-md"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="p-3 text-white bg-blue-500 rounded-r-md"
        >
          Submit
        </button>
      </div>
    </div>

        <div className="mb-12 overflow-hidden bg-white rounded-lg shadow-lg">
          <h3 className="p-4 text-xl font-semibold bg-gray-100">Maternity Map</h3>
          <div id="map" className="h-[400px] w-full"></div>
        </div>
      </main>
    </div>
  );
}