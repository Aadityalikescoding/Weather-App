import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function SmartFarmingWebsite() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("Lucknow");

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=YOUR_API_KEY&units=metric`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-green-700">🌾 Smart Farming Platform</h1>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid grid-cols-5 gap-2">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="weather">Weather</TabsTrigger>
          <TabsTrigger value="iot">IoT Sensors</TabsTrigger>
          <TabsTrigger value="drone">Drone Monitoring</TabsTrigger>
          <TabsTrigger value="ai">AI Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Card><CardContent className="p-4">Welcome to the Smart Farming Dashboard! Select a tab to begin.</CardContent></Card>
        </TabsContent>

        <TabsContent value="weather">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter city"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Button onClick={fetchWeather}>Get Weather</Button>
            </div>
            {weather && weather.main && weather.weather && (
              <Card className="w-full max-w-md">
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold">Weather in {weather.name}</h2>
                  <p>🌡️ Temp: {weather.main.temp} °C</p>
                  <p>☁️ Condition: {weather.weather[0].description}</p>
                  <p>💧 Humidity: {weather.main.humidity}%</p>
                  <p>🌬️ Wind: {weather.wind.speed} m/s</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="iot">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">IoT Sensor Data</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>🌱 Soil Moisture: 48%</li>
                <li>🌡️ Soil Temperature: 26°C</li>
                <li>🧪 Soil pH: 6.8</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drone">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">Drone Monitoring</h2>
              <p>📹 Live feed coming soon...</p>
              <p>🛰️ Drone capturing aerial views for NDVI analysis</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">AI-based Recommendations</h2>
              <p>📊 Based on soil & weather, we recommend:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>🌾 Crop: Wheat or Mustard</li>
                <li>💧 Watering Schedule: Every 3 days</li>
                <li>🧴 Fertilizer: Use NPK 20-20-20 once a week</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
