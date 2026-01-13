import { bee } from "@lucide/lab";
import { Icon } from "lucide-react";
import BeehiveInfoCard from "./components/beehive-info-card";

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-yellow-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex items-center flex-col">
          <h1 className="text-4xl font-bold text-amber-900 mb-2 flex gap-2">
            <Icon iconNode={bee} size={40} />
            Arnia Digitale
          </h1>
          <p className="text-amber-700">
            Sistema di monitoraggio intelligente per apicoltura
          </p>
        </header>

        {/* Cards Grid */}
        <div>
          <div className="flex"></div>
          <BeehiveInfoCard
            name="Arnia Gialla"
            espType="Wemos D1 Mini"
            espMacAddress="5C:CF:7F:FC:9C:AC"
            latitude={43.4593977}
            longitude={12.2397928}
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
