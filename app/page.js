'use client';
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const map = L.map('map').setView([40.7128, -74.0060], 10); // creating the map 


      //tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(map);
      

      return () => {
        map.remove(); // cleanup
      };
    }
  }, []); 

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Maternity Map</h1>
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
}
