'use client';
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const map = L.map('map').setView([40.7128, -74.0060], 10); // creating the map 

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map); // creating the tile layer

      return () => {
        map.remove(); //cleanup
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