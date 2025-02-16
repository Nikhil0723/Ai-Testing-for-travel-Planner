import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key is missing. Please check your .env.local file.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    'here just edit multiple internary in a day Generate a structured JSON itinerary for a trip based on the following details:\n\n- **Destination:** {city_name}\n- **Number of Days:** {num_days}\n- **Trip Theme (optional):** {trip_theme} (e.g., cultural, adventure, relaxation)\n- **Number of Travelers:** {num_travelers}\n- **User Preferences:**\n  - Include famous landmarks? {yes/no}\n  - Include local food experiences? {yes/no}\n  - Include hidden gems? {yes/no}\n  - Include shopping spots? {yes/no}\n\n### JSON Structure:  \nThe output must follow this structure:  \n```json\n{\n  "data": {\n    "me": {\n      "id": "unique_user_id",\n      "username": "user_travel_name",\n      "hasCompletedAIAssistantOnboarding": true,\n      "featureFlags": ["itineraryAssistant", "planningAssistant"],\n      "featureAccess": {\n        "itineraryAssistant": true,\n        "planningAssistant": true,\n        "dreamTripAssistant": true,\n        "activityTip": true,\n        "activitySwap": true,\n        "canUploadFile": false,\n        "__typename": "FeatureAccess"\n      },\n      "subscription": {\n        "id": "sub_unique_id",\n        "isActive": true,\n        "__typename": "Subscription"\n      },\n      "__typename": "User"\n    },\n    "itinerary": {\n      "id": "itinerary_unique_id",\n      "title": "{city_name} Trip",\n      "isPublic": true,\n      "inviteLink": "https://example.com/invite/{city_name}-trip",\n      "slug": "{city_name}-trip",\n      "description": "A {num_days}-day itinerary exploring the best of {city_name}.",\n      "isDefault": false,\n      "isAiGenerated": true,\n      "userCanEdit": true,\n      "isNewForMember": false,\n      "isReady": true,\n      "hasAIAssistantChanges": false,\n      "shouldRefetch": false,\n      "hasPendingAIAssistantChangesToReview": false,\n      "usersCount": {num_travelers},\n      "cities": [\n        {\n          "id": "city_id",\n          "name": "{city_name}",\n          "slug": "{city_slug}",\n          "stateCode": "{state_code}",\n          "countryCode": "{country_code}",\n          "coordinates": {\n            "latitude": "{latitude}",\n            "longitude": "{longitude}",\n            "__typename": "Coordinates"\n          },\n          "__typename": "City"\n        }\n      ],\n      "dayInfo": [\n        {\n          "id": "day_{n}",\n          "day": {n},\n          "activities": [\n            {\n              "id": "activity_{id}",\n              "name": "{activity_name}",\n              "description": "{activity_description}",\n              "image_URL": "{activity_image_url}",\n              "coordinates": {\n                "latitude": "{activity_latitude}",\n                "longitude": "{activity_longitude}"\n              },\n              "aiAssistantChangeType": "None",\n              "__typename": "Activity"\n            }\n          ],\n          "__typename": "DayInfo"\n        }\n      ],\n      "__typename": "Itinerary"\n    }\n  }\n}\n',
});
export async function fetchItinerary(city: string, days: number) {
  try {
    const chatSession = model.startChat({
      generationConfig: {
        temperature: 0.8,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 4096,
        responseMimeType: "application/json",
      },
      history: [
        {
          role: "user",
          parts: [{ text: "delhi 2 days\n" }],
        },
        {
          role: "model",
          parts: [
            {
              text: '```json\n{\n  "data": {\n    "me": {\n      "id": "unique_user_id",\n      "username": "user_travel_name",\n      "hasCompletedAIAssistantOnboarding": true,\n      "featureFlags": ["itineraryAssistant", "planningAssistant"],\n      "featureAccess": {\n        "itineraryAssistant": true,\n        "planningAssistant": true,\n        "dreamTripAssistant": true,\n        "activityTip": true,\n        "activitySwap": true,\n        "canUploadFile": false,\n        "__typename": "FeatureAccess"\n      },\n      "subscription": {\n        "id": "sub_unique_id",\n        "isActive": true,\n        "__typename": "Subscription"\n      },\n      "__typename": "User"\n    },\n    "itinerary": {\n      "id": "itinerary_unique_id",\n      "title": "Delhi Trip",\n      "isPublic": true,\n      "inviteLink": "https://example.com/invite/delhi-trip",\n      "slug": "delhi-trip",\n      "description": "A 2-day itinerary exploring the best of Delhi.",\n      "isDefault": false,\n      "isAiGenerated": true,\n      "userCanEdit": true,\n      "isNewForMember": false,\n      "isReady": true,\n      "hasAIAssistantChanges": false,\n      "shouldRefetch": false,\n      "hasPendingAIAssistantChangesToReview": false,\n      "usersCount": 2,\n      "cities": [\n        {\n          "id": "city_id",\n          "name": "Delhi",\n          "slug": "delhi",\n          "stateCode": "DL",\n          "countryCode": "IN",\n          "coordinates": {\n            "latitude": 28.6139,\n            "longitude": 77.2090,\n            "__typename": "Coordinates"\n          },\n          "__typename": "City"\n        }\n      ],\n      "dayInfo": [\n        {\n          "id": "day_1",\n          "day": 1,\n          "activities": [\n            {\n              "id": "activity_1",\n              "name": "Red Fort",\n              "description": "Visit the majestic Red Fort, a UNESCO World Heritage site.",\n              "image_URL": "image_url_red_fort",\n              "coordinates": {\n                "latitude": 28.6562,\n                "longitude": 77.2411\n              },\n              "aiAssistantChangeType": "None",\n              "__typename": "Activity"\n            },\n            {\n              "id": "activity_2",\n              "name": "Jama Masjid",\n              "description": "Explore the grand Jama Masjid, one of India\'s largest mosques.",\n              "image_URL": "image_url_jama_masjid",\n              "coordinates": {\n                "latitude": 28.6518,\n                "longitude": 77.2331\n              },\n              "aiAssistantChangeType": "None",\n              "__typename": "Activity"\n            },\n            {\n              "id": "activity_3",\n              "name": "Chandni Chowk Food Tour",\n              "description": "Indulge in a delicious food tour through the bustling streets of Chandni Chowk.",\n              "image_URL": "image_url_chandni_chowk_food",\n              "coordinates": {\n                "latitude": 28.6537,\n                "longitude": 77.2344\n              },\n              "aiAssistantChangeType": "None",\n              "__typename": "Activity"\n            }\n          ],\n          "__typename": "DayInfo"\n        },\n        {\n          "id": "day_2",\n          "day": 2,\n          "activities": [\n            {\n              "id": "activity_4",\n              "name": "Humayun\'s Tomb",\n              "description": "Visit Humayun\'s Tomb, a precursor to the Taj Mahal.",\n              "image_URL": "image_url_humayuns_tomb",\n              "coordinates": {\n                "latitude": 28.5922,\n                "longitude": 77.2603\n              },\n              "aiAssistantChangeType": "None",\n              "__typename": "Activity"\n            },\n            {\n              "id": "activity_5",\n              "name": "Qutub Minar",\n              "description": "Marvel at the towering Qutub Minar, a UNESCO World Heritage site.",\n              "image_URL": "image_url_qutub_minar",\n              "coordinates": {\n                "latitude": 28.5241,\n                "longitude": 77.1958\n              },\n              "aiAssistantChangeType": "None",\n              "__typename": "Activity"\n            },\n            {\n              "id": "activity_6",\n              "name": "Shopping at Dilli Haat",\n              "description": "Browse through handicrafts and souvenirs at Dilli Haat.",\n              "image_URL": "image_url_dilli_haat",\n              "coordinates": {\n                "latitude": 28.5864,\n                "longitude": 77.2281\n              },\n              "aiAssistantChangeType": "None",\n              "__typename": "Activity"\n            }\n          ],\n          "__typename": "DayInfo"\n        }\n      ],\n      "__typename": "Itinerary"\n    }\n  }\n}\n```\n',
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(
      `Generate a ${days}-day itinerary for ${city}.`
    );

    console.log("Raw API Response:", JSON.stringify(result, null, 2));

    // Extract raw text safely
    const rawText =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      console.error("Error: No valid response text found.");
      return null;
    }

    console.log("Raw JSON String:", rawText);
    try {
      const firstParse = JSON.parse(rawText); // Convert stringified JSON into an object
      console.log("First Parse Success:", firstParse);

      return firstParse.data.itinerary; // Return only the itinerary part
    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError);
      return null;
    }
  } catch (error) {
    console.error("Error fetching itinerary:", error);
    return null;
  }
}
