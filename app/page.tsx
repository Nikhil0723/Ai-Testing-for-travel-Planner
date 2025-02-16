"use client";

import { useState } from "react";
import ItineraryForm from "@/components/ItineraryForm";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import { fetchItinerary } from "@/servises/geminiService";
import Itinerary from "@/types/iternary";

export default function Home() {
  const [itinerary, setItinerary] = useState<Itinerary>();
  const [loading, setLoading] = useState(false);

  // Function to generate itinerary
  const handleGenerate = async (city: string, days: number) => {
    setLoading(true);
    const result = await fetchItinerary(city, days);
    setItinerary(result);
    console.log("Itinerary result:", result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">AI Travel Planner</h1>

      <ItineraryForm onSubmit={handleGenerate} />

      {loading ? (
        <p className="text-center mt-4">Generating itinerary...</p>
      ) : (
        <ItineraryDisplay itinerary={itinerary}  />
      )}
    </div>
  );
}
