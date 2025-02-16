"use client";

import { Itinerary } from "@/types/iternary";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ItineraryDisplayProps {
  itinerary: Itinerary | undefined;
}

export default function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
  // State to store fetched images
  const [imageURLs, setImageURLs] = useState<{ [key: string]: string }>({});

  // Function to fetch a random image from Lorem Picsum
  const fetchRandomImage = async (id: string) => {
    return `https://picsum.photos/500/300?random=${id}`;
  };

  // useEffect to fetch images once per activity
  useEffect(() => {
    if (!itinerary || !itinerary.data || !itinerary.data.itinerary) return;

    const fetchImages = async () => {
      const newImageURLs: { [key: string]: string } = {};
      for (const day of itinerary.data.itinerary.dayInfo) {
        for (const activity of day.activities) {
          if (!activity.image_URL && !imageURLs[activity.id]) {
            newImageURLs[activity.id] = await fetchRandomImage(activity.id);
          }
        }
      }
      setImageURLs((prev) => ({ ...prev, ...newImageURLs }));
    };

    fetchImages();
  }, [itinerary]);

  // If no itinerary, show message
  if (!itinerary || !itinerary.data || !itinerary.data.itinerary) {
    return (
      <p className="text-gray-500 text-center mt-6">
        No itinerary generated yet.
      </p>
    );
  }

  const { title, dayInfo } = itinerary.data.itinerary;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        {title}
      </h2>

      {dayInfo.map((day) => (
        <div key={day.id} className="mb-8 p-5 bg-gray-50 rounded-lg shadow">
          <h3 className="text-2xl font-semibold text-gray-800">
            Day {day.day}
          </h3>

          <div className="mt-4 space-y-4">
            {day.activities.map((activity) => (
              <div
                key={activity.id}
                className="p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row gap-4"
              >
                {/* Activity Image */}
                <div className="w-full sm:w-1/3">
                  <Image
                    src={
                      activity.image_URL ||
                      imageURLs[activity.id] ||
                      "/placeholder.jpg"
                    }
                    alt={activity.name}
                    width={500}
                    height={300}
                    className="rounded-lg object-cover"
                    unoptimized
                  />
                </div>

                {/* Activity Details */}
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900">
                    {activity.name}
                  </h4>
                  <p className="text-gray-600 text-sm mt-1">
                    {activity.description}
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    📍 {activity.coordinates.latitude},{" "}
                    {activity.coordinates.longitude}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
