"use client";
import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import {  usePathname } from 'next/navigation';

export default function NameForm() {
  const pathname = usePathname();
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [travelReason, setTravelReason] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);
  const [animateText, setAnimateText] = useState(false);

  interface apiResponse {
    name: string;
    display_name: string;
    type: string;
    class: string;
  }

  const resetForm = () => {
    setCurrentStep(1);
    setTitle('');
    setName('');
    setDestination('');
    setTravelReason('');
    setShowDashboard(false);
  };

  useEffect(() => {
    if (pathname === '/') {
      resetForm();
    }
  }, [pathname]);

  const handleNext = () => {
    setSuggestions([]);
    setAnimateText(true);
    setTimeout(() => {
      if (currentStep === 4) {
        setShowDashboard(true);
      } else {
        setCurrentStep(prev => prev + 1);
      }
      setAnimateText(false);
    }, 500);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleLocationSearch = async (query: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&type=city&featuretype=city`
      );
      if (!response.ok) throw new Error('Failed to fetch locations');
      const data: apiResponse[] = await response.json();

      // Filter to only include results with city in their type
      const cityResults = data.filter((item: apiResponse) =>
        item.type === 'city' ||
        item.class === 'boundary' && item.type === 'administrative'
      );

      setSuggestions(cityResults.map((item: apiResponse) => item.display_name));
    } catch (error) {
      console.error('Location search error:', error);
      setSuggestions([]);
    }
  };

  return showDashboard ? (
    <Dashboard
      name={`${title} ${name}`}
      destination={destination}
      travelReason={travelReason}
      location={location}
    />
  ) : (
    <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
      {currentStep === 1 && (
        <div className="flex flex-col items-center justify-center h-screen p-8">
          <div className="w-max">
            <div className="mb-4">
              <h1 className="text-5xl text-green-300">Hello{currentStep > 1 ? `, ${name}` : ''}</h1>
              <p className={`text-4xl text-gray-600 pb-5 transform transition-all duration-500 ${animateText ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
                {currentStep === Number(1) && 'how may I address you?'}
                {currentStep === Number(2) && 'where are you currently located?'}
                {currentStep === Number(3) && 'where do you want to travel to?'}
              </p>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }} className={`flex flex-row items-center w-full max-w-lg transform transition-all duration-500 ${animateText ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
              <div className="relative inline-block text-left mr-4">
                <span className="rounded-md shadow-sm">
                  <select
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full px-3 py-[0.6rem] h-[2.8rem] border-b-2 border-gray-600 text-xl bg-gray-900 text-white focus:outline-none focus:border-green-300 transition-colors"
                  >
                    <option value="">Mr./Ms.</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                  </select>
                </span>
              </div>
              <label className="flex-grow">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="block w-full px-3 py-[0.6rem] h-[2.8rem] border-b-2 border-gray-600 text-xl bg-transparent text-white focus:outline-none focus:border-green-300 transition-colors"
                />
              </label>
            </form>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="flex flex-col items-center justify-center h-screen p-8">
          <div className="w-max">
            <div className="mb-4">
              <h1 className="text-5xl text-green-300">Hello{currentStep > 1 ? `, ${name}` : ''}</h1>
              <p className={`text-4xl text-gray-600 pb-5 transform transition-all duration-500 ${animateText ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
                {currentStep === Number(1) && 'how may I address you?'}
                {currentStep === Number(2) && 'where are you currently located?'}
                {currentStep === Number(3) && 'where do you want to travel to?'}
              </p>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }} className="relative w-full max-w-lg">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  handleLocationSearch(e.target.value);
                }}
                className="block w-full px-12 py-2 border-b-4 border-gray-600 text-xl bg-transparent text-white focus:outline-none focus:border-green-300 transition-colors"
                placeholder="Enter your location"
              />
              {suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border rounded-lg shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setLocation(suggestion);
                        setSuggestions([]);
                      }}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="flex flex-col items-center justify-center h-screen p-8 relative">
          <div className="w-max">
            <div className="mb-4">
              <h1 className="text-5xl text-green-300">Hello{currentStep > 1 ? `, ${name}` : ''}</h1>
              <p className={`text-4xl text-gray-600 pb-5 transform transition-all duration-500 ${animateText ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
                {currentStep === Number(1) && 'how may I address you?'}
                {currentStep === Number(2) && 'where are you currently located?'}
                {currentStep === Number(3) && 'where do you want to travel to?'}
              </p>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }} className="relative w-full max-w-lg">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <input
                type="text"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  handleLocationSearch(e.target.value);
                }}
                className="block w-full px-12 py-2 border-b-2 border-white text-xl bg-transparent text-white focus:outline-none focus:border-green-300 transition-colors"
                placeholder="Enter travel destination"
              />
              {suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border rounded-lg shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setDestination(suggestion);
                        setSuggestions([]);
                      }}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>
          <div className="fixed inset-0 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M20 50 Q 50 30 80 50"
                stroke="#4ADE80"
                strokeWidth="1"
                fill="none"
                strokeDasharray="5 5"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="100"
                  to="0"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="flex flex-col items-center justify-center h-screen p-8">
          <div className="w-max">
            <div className="mb-4">
              <h1 className="text-5xl text-green-300">Hello, {name}</h1>
              <p className={`text-4xl text-gray-600 pb-5 transform transition-all duration-500 ${animateText ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
                Why are you visiting&nbsp;
                <span className="border-b-2 border-dashed border-green-300">{destination}</span>?
              </p>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }} className="relative w-full inline-block text-left mr-4">
              <span className="rounded-md shadow-sm">
                <select
                  value={travelReason}
                  onChange={(e) => setTravelReason(e.target.value)}
                  className="block w-full px-3 py-[0.6rem] h-[2.8rem] border-b-2 border-gray-600 text-xl bg-gray-900 text-white focus:outline-none focus:border-green-300 transition-colors"
                >
                  <option value="">Select purpose</option>
                  <option value="study">Study</option>
                  <option value="family reunion">Family Reunion</option>
                </select>
              </span>
            </form>
            <p className="text-gray-400 text-sm mt-5">*This helps tailor your dashboard (update anytime in settings)</p>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 left-4 right-4 bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 flex items-center gap-4 z-50">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={handlePrevious}
            className="text-green-300 hover:bg-green-800/30 p-3 rounded-lg transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        
        <div className="flex-1 h-2 bg-gray-700 rounded-full">
          <div 
            className="h-full bg-green-300 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
          />
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="text-green-300 hover:bg-green-800/30 p-3 rounded-lg transition-colors"
        >
          {currentStep === 4 ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}