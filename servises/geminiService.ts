import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key is missing. Please check your .env.local file.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    'Generate a structured JSON itinerary for a trip based on the following details:\n\n- **Destination:** {city_name}\n- **Number of Days:** {num_days}\n- **Trip Theme (optional):** {trip_theme} (e.g., cultural, adventure, relaxation)\n- **Number of Travelers:** {num_travelers}\n- **User Preferences:**\n  - Include famous landmarks? {yes/no}\n  - Include local food experiences? {yes/no}\n  - Include hidden gems? {yes/no}\n  - Include shopping spots? {yes/no}\n\n### JSON Structure:  \nThe output must follow this structure:  \n```json\n{\n  "data": {\n    "me": {\n      "id": "unique_user_id",\n      "username": "user_travel_name",\n      "hasCompletedAIAssistantOnboarding": true,\n      "featureFlags": ["itineraryAssistant", "planningAssistant"],\n      "featureAccess": {\n        "itineraryAssistant": true,\n        "planningAssistant": true,\n        "dreamTripAssistant": true,\n        "activityTip": true,\n        "activitySwap": true,\n        "canUploadFile": false,\n        "__typename": "FeatureAccess"\n      },\n      "subscription": {\n        "id": "sub_unique_id",\n        "isActive": true,\n        "__typename": "Subscription"\n      },\n      "__typename": "User"\n    },\n    "itinerary": {\n      "id": "itinerary_unique_id",\n      "title": "{city_name} Trip",\n      "isPublic": true,\n      "inviteLink": "https://example.com/invite/{city_name}-trip",\n      "slug": "{city_name}-trip",\n      "description": "A {num_days}-day itinerary exploring the best of {city_name}.",\n      "isDefault": false,\n      "isAiGenerated": true,\n      "userCanEdit": true,\n      "isNewForMember": false,\n      "isReady": true,\n      "hasAIAssistantChanges": false,\n      "shouldRefetch": false,\n      "hasPendingAIAssistantChangesToReview": false,\n      "usersCount": {num_travelers},\n      "cities": [\n        {\n          "id": "city_id",\n          "name": "{city_name}",\n          "slug": "{city_slug}",\n          "stateCode": "{state_code}",\n          "countryCode": "{country_code}",\n          "coordinates": {\n            "latitude": "{latitude}",\n            "longitude": "{longitude}",\n            "__typename": "Coordinates"\n          },\n          "__typename": "City"\n        }\n      ],\n      "dayInfo": [\n        {\n          "id": "day_{n}",\n          "day": {n},\n          "activities": [\n            {\n              "id": "activity_{id}",\n              "name": "{activity_name}",\n              "description": "{activity_description}",\n              "image_URL": "{activity_image_url}",\n              "coordinates": {\n                "latitude": "{activity_latitude}",\n                "longitude": "{activity_longitude}"\n              },\n              "aiAssistantChangeType": "None",\n              "__typename": "Activity"\n            }\n          ],\n          "__typename": "DayInfo"\n        }\n      ],\n      "__typename": "Itinerary"\n    }\n  }\n}\n',
});

export async function fetchItinerary(city: string, days: number) {
  try {
    const chatSession = model.startChat({
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
      history: [],
    });

    const result = await chatSession.sendMessage(
      `Generate a ${days}-day itinerary for ${city}.`
    );
    console.log("Raw API Response:", JSON.stringify(result, null, 2));

    return JSON.parse(result.response.text()); // Convert response to JSON
  } catch (error) {
    console.error("Error fetching itinerary:", error);
    return null;
  }
}

export async function fetchSwappedActivity(city: string, day: number) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Suggest a new activity for day ${day} in ${city}. 
                  Provide a short name and a brief description.`;

  const result = await model.generateContent(prompt);
  const response = await result.response.text();

  return JSON.parse(response);
}
