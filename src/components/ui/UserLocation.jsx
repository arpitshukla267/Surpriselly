import React, { useState, useEffect, useRef, useCallback } from "react";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";

// Google Maps API key - Replace with your actual API key
// You can also use environment variable: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY";

const libraries = ["places"];

// Default location (Noida, Sector 62)
const defaultCenter = {
  lat: 28.6274,
  lng: 77.3721,
};

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "8px",
};

export default function LocationModal() {
  const [showModal, setShowModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [address, setAddress] = useState("Noida, Sector 62, UP");
  const [isMobile, setIsMobile] = useState(false);
  const [showBlock, setShowBlock] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(defaultCenter);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [autocomplete, setAutocomplete] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  // Form states (for manual entry fallback)
  const [house, setHouse] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");

  const timerRef = useRef(null);
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);

  // Load saved location from localStorage on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      try {
        const locationData = JSON.parse(savedLocation);
        setAddress(locationData.address || "Noida, Sector 62, UP");
        if (locationData.lat && locationData.lng) {
          setSelectedLocation({ lat: locationData.lat, lng: locationData.lng });
          setMapCenter({ lat: locationData.lat, lng: locationData.lng });
        }
      } catch (error) {
        console.error("Error loading saved location:", error);
      }
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle map load
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    setMapLoaded(true);
  }, []);

  // Handle marker drag end
  const onMarkerDragEnd = useCallback((e) => {
    const newLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setSelectedLocation(newLocation);
    setMapCenter(newLocation);
    reverseGeocode(newLocation);
  }, []);

  // Reverse geocode to get address from coordinates
  const reverseGeocode = async (location) => {
    try {
      if (window.google && window.google.maps) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location }, (results, status) => {
          if (status === "OK" && results[0]) {
            setAddress(results[0].formatted_address);
            setSearchValue(results[0].formatted_address);
          }
        });
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    }
  };

  // Handle autocomplete place selection
  const onPlaceChanged = useCallback(() => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setSelectedLocation(location);
        setMapCenter(location);
        setAddress(place.formatted_address || place.name);
        setSearchValue(place.formatted_address || place.name);
      }
    }
  }, [autocomplete]);

  // Handle autocomplete load
  const onAutocompleteLoad = useCallback((autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  }, []);

  // Save location to localStorage
  const saveLocation = () => {
    const locationData = {
      address: address,
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("userLocation", JSON.stringify(locationData));
    setShowModal(false);
    alert("Location saved successfully!");
  };

  // Handle form submit (manual entry fallback)
  const handleSubmit = (e) => {
    e.preventDefault();
    const fullAddress = `${house}, ${area}, ${city}, ${district}, ${state} - ${pin}`;
    setAddress(fullAddress);
    const locationData = {
      address: fullAddress,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("userLocation", JSON.stringify(locationData));
    setShowModal(false);
  };

  // Long press logic
  const handlePressStart = () => {
    timerRef.current = setTimeout(() => {
      setShowBlock(true);
    }, 2000);
  };

  const handlePressEnd = () => {
    clearTimeout(timerRef.current);
  };

  // Get current location using browser geolocation
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setSelectedLocation(location);
          setMapCenter(location);
          reverseGeocode(location);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please select manually on the map.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="relative flex items-center gap-3">
      {/* Location Icon */}
      <div
        className="relative cursor-pointer"
        onClick={() => setShowModal(true)}
        onMouseEnter={() => !isMobile && setHovered(true)}
        onMouseLeave={() => !isMobile && setHovered(false)}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
      >
        <MapPin className="w-6 h-6 text-purple-600 hover:scale-110 transition-transform" />

        {/* Address tooltip on hover (desktop only) */}
        <AnimatePresence>
          {!isMobile && hovered && (
            <motion.div
              className="absolute -left-10 top-1/3 border-none translate-y-1/3
                         bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
                         shadow-xl px-5 py-4 rounded-2xl text-white z-20 
                         min-w-[220px] border border-white/20"
              initial={{ opacity: 0, x: -15, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -15, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h4 className="font-semibold text-md mb-2 border-b border-white/40 pb-1">
                📍 Your Address
              </h4>
              <p className="text-sm leading-relaxed">{address}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Long press block (mobile only) */}
        <AnimatePresence>
          {isMobile && showBlock && (
            <motion.div
              className="absolute left-0 top-10 bg-purple-600 text-white p-3 rounded-xl shadow-lg z-30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              📍 Your Address <br />
              <span className="font-semibold">{address}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4 rounded-2xl"
              onClick={() => setShowModal(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Modal Box */}
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white shadow-lg relative overflow-y-auto ${
                  isMobile
                    ? "w-full max-h-[90%] h-auto absolute bottom-0 rounded-t-2xl p-6"
                    : "p-6 w-[95%] max-w-4xl rounded-xl max-h-[90vh]"
                }`}
                initial={isMobile ? { y: "100%" } : { scale: 0.8, opacity: 0, y: -50 }}
                animate={isMobile ? { y: 0 } : { scale: 1, opacity: 1, y: 0 }}
                exit={isMobile ? { y: "100%" } : { scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition z-10"
                >
                  ✕
                </button>

                {/* Title */}
                <h2 className="text-xl font-semibold mb-5 text-gray-800">
                  Set Your Location
                </h2>

                {/* Google Maps Section */}
                {GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY !== "YOUR_GOOGLE_MAPS_API_KEY" ? (
                  <LoadScript
                    googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                    libraries={libraries}
                    onLoad={() => setMapLoaded(true)}
                    onError={(error) => {
                      console.error("Error loading Google Maps:", error);
                      alert("Error loading Google Maps. Please check your API key.");
                    }}
                  >
                  <div className="mb-4">
                    {/* Search Box */}
                    <div className="mb-4">
                      <Autocomplete
                        onLoad={onAutocompleteLoad}
                        onPlaceChanged={onPlaceChanged}
                      >
                        <input
                          type="text"
                          placeholder="Search for a location..."
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none mb-2"
                        />
                      </Autocomplete>
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                      >
                        📍 Use Current Location
                      </button>
                    </div>

                    {/* Map */}
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={mapCenter}
                      zoom={15}
                      onLoad={onMapLoad}
                      onClick={(e) => {
                        const location = {
                          lat: e.latLng.lat(),
                          lng: e.latLng.lng(),
                        };
                        setSelectedLocation(location);
                        reverseGeocode(location);
                      }}
                      options={{
                        disableDefaultUI: false,
                        zoomControl: true,
                        streetViewControl: true,
                        mapTypeControl: false,
                        fullscreenControl: true,
                      }}
                    >
                      {mapLoaded && window.google && (
                        <Marker
                          position={selectedLocation}
                          draggable={true}
                          onDragEnd={onMarkerDragEnd}
                          animation={window.google.maps.Animation.DROP}
                        />
                      )}
                    </GoogleMap>

                    {/* Selected Address Display */}
                    <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Selected Address:</p>
                      <p className="font-semibold text-gray-800">{address}</p>
                    </div>
                  </div>
                  </LoadScript>
                ) : (
                  <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 font-semibold mb-2">
                      ⚠️ Google Maps API Key Required
                    </p>
                    <p className="text-sm text-yellow-700 mb-2">
                      To use the map feature, please set up your Google Maps API key:
                    </p>
                    <ol className="text-sm text-yellow-700 list-decimal list-inside space-y-1">
                      <li>Get your API key from <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
                      <li>Enable Maps JavaScript API, Places API, and Geocoding API</li>
                      <li>Create a <code className="bg-yellow-100 px-1 rounded">.env</code> file in the frontend directory</li>
                      <li>Add: <code className="bg-yellow-100 px-1 rounded">VITE_GOOGLE_MAPS_API_KEY=your_api_key_here</code></li>
                      <li>Restart your development server</li>
                    </ol>
                  </div>
                )}

                {/* Manual Address Form (Optional Fallback) */}
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-semibold mb-3 text-gray-700">
                    Or Enter Address Manually
                  </h3>
                  <form
                    onSubmit={handleSubmit}
                    className={`grid gap-4 ${
                      isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
                    }`}
                  >
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        House / Flat / Building
                      </label>
                      <input
                        type="text"
                        value={house}
                        onChange={(e) => setHouse(e.target.value)}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Area / Street
                      </label>
                      <input
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        District
                      </label>
                      <input
                        type="text"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Pin Code
                      </label>
                      <input
                        type="number"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                      />
                    </div>
                  </form>
                </div>

                {/* Save Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={saveLocation}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-700 transition"
                  >
                    Save Location
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
