"use client";

import { useState } from "react";
import ItineraryForm from "@/components/ItineraryForm";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import Itinerary from "@/types/iternary";
import { fetchItinerary } from "@/servises/geminiService";

export default function Home() {
  const [itinerary, setItinerary] = useState<Itinerary | undefined>();
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (city: string, days: number) => {
    setLoading(true);
    setItinerary(undefined); 
    try {
      const result = await fetchItinerary(city, days);
      setItinerary(result);
      console.log("Itinerary result:", result);
    } catch (error) {
      console.error("Error fetching itinerary:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">AI Travel Planner</h1>

      <ItineraryForm onSubmit={handleGenerate} />

      <ItineraryDisplay itinerary={itinerary} loading={loading} />
    </div>
  );
}
