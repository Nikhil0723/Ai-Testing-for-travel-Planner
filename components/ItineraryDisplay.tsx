import Itinerary from "@/types/iternary";

interface ItineraryDisplayProps {
  itinerary: Itinerary | undefined;
  loading: boolean;
}
const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({
  itinerary,
  loading,
}) => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You can add a toast notification here
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="mb-6">
            <div className="h-6 bg-gray-200 rounded w-8 mb-4"></div>
            {[...Array(2)].map((_, j) => (
              <div key={j} className="mb-4 p-4 bg-gray-100 rounded-lg">
                <div className="flex gap-4">
                  <div className="w-32 h-32 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg ring-1 ring-gray-100">
      {/* Header Section */}
      <header className="mb-8">
        <div className="flex justify-between items-start flex-col md:flex-row gap-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {itinerary?.title}
            </h1>
            <p className="text-lg text-gray-600 relative before:absolute before:-left-4 before:top-2 before:w-1 before:h-6 before:bg-blue-500 pl-2">
              {itinerary?.description}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => copyToClipboard(itinerary?.inviteLink || "")}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-all duration-200 flex items-center gap-2"
              title="Copy link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            </button>
            <a
              href={itinerary?.inviteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2 hover:shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                  clipRule="evenodd"
                />
              </svg>
              Join Itinerary
            </a>
          </div>
        </div>

        {/* Cities Pill Container */}
        <div className="mt-6 flex flex-wrap gap-2">
          {itinerary?.cities.map((city) => (
            <div
              key={city.id}
              className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors duration-200 cursor-help"
              title={`${city.name}, ${city.stateCode} | Coordinates: ${city.coordinates.latitude}, ${city.coordinates.longitude}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {city.name}, {city.countryCode}
            </div>
          ))}
        </div>
      </header>

      {/* Days Timeline */}
      <div className="space-y-8">
        {itinerary?.dayInfo.map((day) => (
          <section
            key={day.id}
            className="relative pl-8 border-l-2 border-blue-100 group"
          >
            {/* Day Number */}
            <div className="absolute w-8 h-8 bg-blue-600 rounded-full -left-4 top-0 flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 group-hover:scale-110">
              {day.day}
            </div>

            {/* Activities List */}
            <div className="space-y-4">
              {day.activities.map((activity) => (
                <article
                  key={activity.id}
                  className="relative p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group/activity"
                >
                  <div className="flex gap-4 flex-col md:flex-row">
                    {/* Activity Image */}
                    <div className="flex-shrink-0 w-full md:w-48 h-48 rounded-lg overflow-hidden relative">
                      <img
                        src={activity.image_URL}
                        alt={activity.name}
                        className="w-full h-full object-cover transform transition-transform duration-300 group-hover/activity:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          (
                            e.target as HTMLImageElement
                          ).src = `data:image/svg+xml;base64,${btoa(
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="#e5e7eb"><rect width="100" height="100"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#6b7280" font-size="14">Image not available</text></svg>`
                          )}`;
                        }}
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover/activity:opacity-100 transition-opacity duration-300"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps?q=${activity.coordinates.latitude},${activity.coordinates.longitude}`,
                            "_blank"
                          )
                        }
                      />
                    </div>

                    {/* Activity Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {activity.name}
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-3 hover:line-clamp-none transition-all duration-200 cursor-text">
                        {activity.description}
                      </p>
                      <div
                        className="flex items-center text-sm text-gray-500 cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() =>
                          copyToClipboard(
                            `${activity.coordinates.latitude}, ${activity.coordinates.longitude}`
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {activity.coordinates.latitude},{" "}
                        {activity.coordinates.longitude}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ItineraryDisplay;
