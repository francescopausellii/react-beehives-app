import { MapPin, Wifi } from "lucide-react";
import { useState } from "react";
import { HumidityGraph } from "./stats/humidity";
import { SoundGraph } from "./stats/sound";
import { ThermometerGraph } from "./stats/thermometer";
import { WeightGraph } from "./stats/weight";
import ToggleData from "./toggle-data";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function BeehiveInfoCard({
  name,
  espType,
  espMacAddress,
  latitude = 0,
  longitude = 0,
}) {
  const [showData, setShowData] = useState(false);

  const [metrics] = useState(() => ({
    temperature: Math.floor(Math.random() * 101),
    humidity: Math.floor(Math.random() * 101),
    sound: Math.floor(Math.random() * 101),
    weight: Math.floor(Math.random() * 101),
  }));

  return (
    <Card className="bg-white/80 backdrop-blur max-w-lg mx-auto">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <div className="flex items-center gap-2 truncate">
              <MapPin className="h-5 w-5 shrink-0 text-amber-600" />
              <span className="truncate text-lg sm:text-xl">{name}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-normal text-muted-foreground">
              <Wifi className="h-3.5 w-3.5 shrink-0" />
              {espType}
            </div>
          </div>

          <ToggleData onChange={(checked) => setShowData(checked)} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Grafici delle metriche */}
        <div className="flex sm:justify-between justify-center items-center mx-5 *:mx-5 flex-wrap">
          <ThermometerGraph
            size={32}
            showLabel={showData}
            value={metrics.temperature}
          />
          <HumidityGraph
            size={32}
            showLabel={showData}
            value={metrics.humidity}
          />
          <SoundGraph size={32} showLabel={showData} value={metrics.sound} />
          <WeightGraph size={32} showLabel={showData} value={metrics.weight} />
        </div>
        {/* Informazioni tecniche */}
        <div className="space-y-1 border-t pt-3 text-xs text-muted-foreground">
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium">MAC:</span>
            <span className="truncate font-mono">{espMacAddress}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium">Posizione:</span>
            <span className="truncate font-mono">
              {latitude.toFixed(4)}, {longitude.toFixed(4)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
