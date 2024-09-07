'use client';
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const map = L.map('map').setView([40.7128, -74.0060], 10);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(map);

      return () => {
        map.remove();
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-[#0000FF] font-bold text-2xl">Maternity Map</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#0000FF] text-white p-8 rounded-lg mb-12">
          <h1 className="text-4xl font-bold mb-4">Join us in the pursuit to change patient's lives.</h1>
          <p className="text-xl">Each and every person in a clinical trial plays a powerful role.</p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Find the closest Hospital</h2>
          <input
            type="text"
            placeholder="Search here"
            className="w-full p-3 border border-gray-300 rounded-md text-black"
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <h3 className="text-xl font-semibold p-4 bg-gray-100">Maternity Map</h3>
          <div id="map" className="h-[400px] w-full"></div>
        </div>
      </main>
    </div>
  );
}