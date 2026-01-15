import { useEffect, useState } from "react";
import BeehiveInfoCard from "./components/beehive-info-card";
import DataTable from "./components/data-table";
import Header from "./components/header";

function App() {
  const [beehives, setBeehives] = useState([]);
  const [selectedBeehive, setSelectedBeehive] = useState();
  const [selectData, setSelectedData] = useState([]);

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
          />

          <DataTable datas={selectData} />
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
