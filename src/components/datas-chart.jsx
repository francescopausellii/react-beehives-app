import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MetricsSelector = ({ selectedMetrics, onMetricToggle }) => {
  const metricsConfig = [
    {
      id: "temperature",
      label: "Temperatura",
      color: "border-amber-600 bg-amber-100 text-amber-900",
      hover: "hover:border-amber-400",
    },
    {
      id: "humidity",
      label: "Umidità",
      color: "border-blue-600 bg-blue-100 text-blue-900",
      hover: "hover:border-blue-400",
    },
    {
      id: "weight",
      label: "Peso",
      color: "border-green-600 bg-green-100 text-green-900",
      hover: "hover:border-green-400",
    },
    {
      id: "sound",
      label: "Suono",
      color: "border-purple-600 bg-purple-100 text-purple-900",
      hover: "hover:border-purple-400",
    },
  ];

  return (
    <Card className="bg-white/80 backdrop-blur">
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg">
          Seleziona Metriche
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Scegli quali metriche visualizzare insieme nel grafico
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {metricsConfig.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                if (selectedMetrics.length === 1 && selectedMetrics[0] === m.id)
                  return;
                onMetricToggle(m.id);
              }}
              className={`rounded-lg border-2 px-3 py-2 text-xs font-medium transition-all sm:text-sm ${
                selectedMetrics.includes(m.id)
                  ? m.color
                  : `border-gray-300 bg-white text-gray-700 ${m.hover}`
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const CustomGraphChart = ({ selectedMetrics, chartData }) => {
  const metricsLabels = {
    temperature: "Temperatura",
    humidity: "Umidità",
    weight: "Peso",
    sound: "Suono",
  };

  return (
    <Card className="bg-white/80 backdrop-blur">
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg">
          {selectedMetrics.map((m) => metricsLabels[m]).join(", ")} - Ultime 24
          ore
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Comparazione delle metriche selezionate
        </CardDescription>
      </CardHeader>

      <CardContent className="px-2 sm:px-6">
        <div className="h-64 w-full sm:h-75 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
            >
              <defs>
                <linearGradient
                  id="colorTemperature"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSound" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10 }}
                interval="preserveStartEnd"
              />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{ fontSize: "12px" }}
                labelStyle={{ fontSize: "12px" }}
                formatter={(value) => value.toFixed(2)}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />

              {selectedMetrics.includes("temperature") && (
                <Area
                  type="monotone"
                  dataKey="temperature"
                  stroke="#d97706"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorTemperature)"
                  name="Temperatura"
                  connectNulls
                />
              )}

              {selectedMetrics.includes("humidity") && (
                <Area
                  type="monotone"
                  dataKey="humidity"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorHumidity)"
                  name="Umidità"
                  connectNulls
                />
              )}

              {selectedMetrics.includes("weight") && (
                <Area
                  type="monotone"
                  dataKey="weight"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorWeight)"
                  name="Peso"
                  connectNulls
                />
              )}

              {selectedMetrics.includes("sound") && (
                <Area
                  type="monotone"
                  dataKey="sound"
                  stroke="#a855f7"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSound)"
                  name="Suono"
                  connectNulls
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export const DatasChart = ({ datas }) => {
  const [selectedMetrics, setSelectedMetrics] = useState([
    "temperature",
    "humidity",
  ]);

  const chartData = useMemo(() => {
    if (!datas || datas.length === 0) return [];

    const groups = {};

    datas.forEach((item) => {
      const date = new Date(item.timestamp);
      const timeStr = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      if (!groups[item.timestamp]) {
        groups[item.timestamp] = {
          time: timeStr,
          timestamp: item.timestamp,
        };
      }

      groups[item.timestamp][item.value_type] = item.value;
    });

    return Object.values(groups).sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
    );
  }, [datas]);

  const onMetricToggle = (metric) => {
    setSelectedMetrics((prev) =>
      prev.includes(metric)
        ? prev.filter((m) => m !== metric)
        : [...prev, metric],
    );
  };

  return (
    <div className="space-y-4 p-4">
      <MetricsSelector
        selectedMetrics={selectedMetrics}
        onMetricToggle={onMetricToggle}
      />

      {selectedMetrics.length > 0 && (
        <CustomGraphChart
          selectedMetrics={selectedMetrics}
          chartData={chartData}
        />
      )}
    </div>
  );
};
