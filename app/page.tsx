"use client";

import { useState } from "react";
import ItineraryForm from "@/components/ItineraryForm";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import { fetchItinerary, fetchSwappedActivity } from "@/servises/geminiService";

export default function Home() {
  const [itinerary, setItinerary] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Function to generate itinerary
  const handleGenerate = async (city: string, days: number) => {
    setLoading(true);
    const result = await fetchItinerary(city, days);
    setItinerary(result);
    console.log("Itinerary result:", result);
    setLoading(false);
  };

  // Function to swap an activity
  const handleSwapActivity = async (dayIndex: number, activityIndex: number) => {
    if (!itinerary) return;

    const city = "Paris"; // Replace with dynamic city if needed
    const swappedActivity = await fetchSwappedActivity(city, dayIndex + 1);

    // Update itinerary with new activity
    const updatedItinerary = { ...itinerary };
    updatedItinerary.itinerary[dayIndex].activities[activityIndex] = swappedActivity;

    setItinerary(updatedItinerary);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">AI Travel Planner</h1>
      
      <ItineraryForm onSubmit={handleGenerate} />
      
      {loading ? (
        <p className="text-center mt-4">Generating itinerary...</p>
      ) : (
        <ItineraryDisplay itinerary={itinerary} onSwap={handleSwapActivity} />
      )}
    </div>
  );
}
