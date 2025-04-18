// SmartFarmingDashboard.jsx
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WiRain, WiDaySunny, WiCloudy } from "react-icons/wi";
import "leaflet/dist/leaflet.css";

// Import Leaflet components directly
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Ensure Leaflet marker icons load properly
if (typeof window !== "undefined") {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });
}

const fetchWeather = async (city) => {
  const apiKey = "YOUR_API_KEY";
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!res.ok) throw new Error("Weather data not available");
    return res.json();
  } catch (error) {
    console.error("Weather fetch error:", error);
    return null;
  }
};

export default function SmartFarmingDashboard() {
  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetchWeather(city).then((data) => setWeather(data));
  }, [city]);

  const handleCityChange = (e) => setCity(e.target.value);

  return (
    <div className="p-6 grid gap-4 grid-cols-1 md:grid-cols-2">
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">🌦 Weather Forecast</h2>
          <Input value={city} onChange={handleCityChange} placeholder="Enter city" className="mb-2" />
          {weather ? (
            <div>
              <p className="text-lg">{weather.name}</p>
              <p>Temperature: {weather.main.temp}°C</p>
              <p>Condition: {weather.weather[0].main}</p>
              {weather.weather[0].main.includes("Rain") && <WiRain size={40} />}
              {weather.weather[0].main.includes("Cloud") && <WiCloudy size={40} />}
              {weather.weather[0].main.includes("Clear") && <WiDaySunny size={40} />}
            </div>
          ) : (
            <p>Loading or no data...</p>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">📍 GPS & Field Monitoring</h2>
          <div className="h-64 rounded-xl overflow-hidden">
            <MapContainer center={[28.6139, 77.209]} zoom={10} className="h-full w-full">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[28.6139, 77.209]}>
                <Popup>Your Field</Popup>
              </Marker>
            </MapContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">📊 IoT Sensor Data</h2>
          <ul className="list-disc pl-4">
            <li>Soil Moisture: 45%</li>
            <li>Temperature: 27°C</li>
            <li>Humidity: 68%</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">🤖 AI Insights & Drones</h2>
          <p>
            Based on current data, irrigation is recommended in 2 days. No pest alerts detected.
          </p>
          <Button className="mt-2">Request Drone Flyover</Button>
        </CardContent>
      </Card>
    </div>
  );
}
