"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ItineraryDisplayProps {
  itinerary: any;
  onSwap: (dayIndex: number, activityIndex: number) => void;
}

export default function ItineraryDisplay({ itinerary, onSwap }: ItineraryDisplayProps) {
  if (!itinerary || !itinerary.data || !itinerary.data.itinerary) {
    return <p className="text-gray-500 text-center">No itinerary generated yet.</p>;
  }

  const { title, dayInfo } = itinerary.data.itinerary;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-50 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {dayInfo.map((day: any, dayIndex: number) => (
        <div key={day.id} className="mb-6 p-4 bg-white rounded-md shadow">
          <h3 className="text-xl font-semibold">Day {day.day}</h3>

          {day.activities.map((activity: any, activityIndex: number) => (
            <ActivityCard 
              key={activity.id} 
              activity={activity} 
              onSwap={() => onSwap(dayIndex, activityIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// ✅ ActivityCard component (handles image fetching)
function ActivityCard({ activity, onSwap }: { activity: any; onSwap: () => void }) {
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImage() {
      const wikimediaImage = await fetchWikimediaImage(activity.name);
      if (wikimediaImage) {
        setImageURL(wikimediaImage);
      } else {
        setImageURL(getFallbackImage(activity.name, activity.coordinates));
      }
    }

    fetchImage();
  }, [activity.name]);

  return (
    <div className="mt-3 p-3 bg-gray-100 rounded-md shadow-sm">
      <h4 className="text-lg font-bold">{activity.name}</h4>
      <p className="text-sm text-gray-600">{activity.description}</p>

      {imageURL && (
        <Image
          src={imageURL}
          alt={activity.name}
          width={500}
          height={300}
          className="rounded-md mt-2"
        />
      )}

      <p className="text-xs text-gray-500">
        📍 {activity.coordinates.latitude}, {activity.coordinates.longitude}
      </p>

      <button
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={onSwap}
      >
        Swap Activity
      </button>
    </div>
  );
}

// ✅ Fetch image from Wikimedia API
async function fetchWikimediaImage(query: string) {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&piprop=original&titles=${encodeURIComponent(query)}`
    );
    const data = await response.json();

    const pages = data.query.pages;
    const firstPage = Object.values(pages)[0] as any;

    return firstPage?.original?.source || null;
  } catch (error) {
    console.error("Error fetching Wikimedia image:", error);
    return null;
  }
}

// ✅ Get fallback image (Pexels or OpenStreetMap)
function getFallbackImage(name: string, coordinates: { latitude: number; longitude: number }) {
  const fallbackImages: Record<string, string> = {
    Paris: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
    NewYork: "https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg",
    Rome: "https://images.pexels.com/photos/179716/pexels-photo-179716.jpeg",
  };

  return (
    fallbackImages[name] ||
    `https://static-maps.yandex.ru/1.x/?ll=${coordinates.longitude},${coordinates.latitude}&z=14&size=450,300&l=map`
  );
}
