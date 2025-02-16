"use client";
import { useState } from "react";

interface ItineraryFormProps {
  onSubmit: (city: string, days: number) => void;
}

export default function ItineraryForm({ onSubmit }: ItineraryFormProps) {
  const [city, setCity] = useState("");
  const [days, setDays] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(city, days);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Plan Your Trip</h2>

      <label className="block mb-2">City Name:</label>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter city (e.g., Dubai)"
        required
      />

      <label className="block mb-2">Number of Days:</label>
      <select
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        className="w-full p-2 border rounded mb-4"
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>{num} Days</option>
        ))}
      </select>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Generate Itinerary
      </button>
    </form>
  );
}
