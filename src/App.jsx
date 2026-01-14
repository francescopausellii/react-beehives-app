import { useEffect, useState } from "react";
import BeehiveInfoCard from "./components/beehive-info-card";
import Header from "./components/header";

function App() {
  const [beehives, setBeehives] = useState([]);
  const [selectedBeehive, setSelectedBeehive] = useState();

  useEffect(() => {
    const getBeehives = async () => {
      const response = await fetch(
        "https://api4api-4998.restdb.io/rest/beehives",
        {
          headers: {
            "Content-Type": "application/json",
            "x-apikey": import.meta.env.VITE_API_KEY,
          },
        },
      );
      const data = await response.json();
      setBeehives(data);
      setSelectedBeehive(data[0]);
    };

    getBeehives();
  }, [selectedBeehive]);

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-yellow-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Header
          beehives={beehives}
          onBeehiveChange={(value) => {
            const selected = beehives.find((bee) => bee._id === value);
            setSelectedBeehive(selected);
          }}
        />

        {/* Cards Grid */}
        <div>
          <BeehiveInfoCard
            name={selectedBeehive?.name}
            espType={selectedBeehive?.esp_type}
            espMacAddress={selectedBeehive?.esp_mac_address}
            latitude={selectedBeehive?.latitude}
            longitude={selectedBeehive?.longitude}
          />
        </div>

        {/* Footer Info */}
        <footer className="mt-12 text-center text-sm text-amber-600">
          <p>Monitoraggio in tempo reale della tua arnia</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
