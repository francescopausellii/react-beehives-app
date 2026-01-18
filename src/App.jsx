import { useEffect, useState } from "react";
import BeehiveInfoCard from "./components/beehive-info-card";
import DataTabs from "./components/data-tabs";
import Header from "./components/header";

function App() {
  const [beehives, setBeehives] = useState([]);
  const [selectedBeehive, setSelectedBeehive] = useState();
  const [selectData, setSelectedData] = useState([]);
  const [latestMetrics, setLatestMetrics] = useState({
    temperature: 0,
    humidity: 0,
    sound: 0,
    weight: 0,
  });

  useEffect(() => {
    const loadBeehives = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/beehives`, {
        headers: {
          "Content-Type": "application/json",
          "x-apikey": import.meta.env.VITE_API_KEY,
        },
      });
      const data = await res.json();

      setBeehives(data);
      setSelectedBeehive(data[0]);
    };

    loadBeehives();
  }, []);

  useEffect(() => {
    if (!selectedBeehive) return;

    const loadBeehiveData = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/datas?q={"id_beehive": ${selectedBeehive.id}}&h={"$orderby": {"timestamp": -1}}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-apikey": import.meta.env.VITE_API_KEY,
          },
        },
      );

      const data = await res.json();

      const metrics = {
        temperature:
          data.find((d) => d.value_type === "temperature")?.value ?? 0,
        humidity: data.find((d) => d.value_type === "humidity")?.value ?? 0,
        sound: data.find((d) => d.value_type === "sound")?.value ?? 0,
        weight: data.find((d) => d.value_type === "weight")?.value ?? 0,
      };

      setLatestMetrics(metrics);
      setSelectedData(data);
    };

    loadBeehiveData();
  }, [selectedBeehive]);

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-yellow-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Header
          beehives={beehives}
          selectedBeehive={selectedBeehive}
          onBeehiveChange={async (value) => {
            const selected = beehives.find((bee) => bee.id === value);
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
            metrics={latestMetrics}
          />

          <DataTabs datas={selectData} />
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
