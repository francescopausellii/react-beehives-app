import DataTable from "./data-table";
import { DatasChart } from "./datas-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function DataTabs({ datas }) {
  return (
    <Tabs defaultValue="table" className="mt-8">
      <TabsList className="w-full">
        <TabsTrigger value="table" className="flex-1">
          Tabella
        </TabsTrigger>
        <TabsTrigger value="graph" className="flex-1">
          Grafico
        </TabsTrigger>
      </TabsList>
      <TabsContent value="table">
        <Card className="bg-white/80 backdrop-blur m-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg">
              Ultimi Rilevamenti
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Dati più recenti registrati dai sensori
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <div className="-mx-2 overflow-x-auto sm:mx-0">
              <DataTable datas={datas} />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="graph">
        <DatasChart datas={datas} />
      </TabsContent>
    </Tabs>
  );
}
