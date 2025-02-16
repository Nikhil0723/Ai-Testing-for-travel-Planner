interface Coordinates {
    latitude: string;
    longitude: string;
  }
  
  interface Activity {
    id: string;
    name: string;
    description: string;
    image_URL: string;
    coordinates: Coordinates;
  }
  
  interface DayInfo {
    id: string;
    day: number;
    activities: Activity[];
  }
  
  interface City {
    id: string;
    name: string;
    slug: string;
    stateCode: string;
    countryCode: string;
    coordinates: Coordinates;
  }
  
 export default interface Itinerary {
    id: string;
    title: string;
    description: string;
    inviteLink?: string;
    cities: City[];
    dayInfo: DayInfo[];
  }
  