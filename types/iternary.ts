export interface Activity {
    id: string;
    name: string;
    description: string;
    image_URL?: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  }
  
  export interface DayInfo {
    id: string;
    day: number;
    activities: Activity[];
  }
  
  export interface Itinerary {
    data: {
      itinerary: {
        title: string;
        dayInfo: DayInfo[];
      };
    };
  }
  