import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function DataTable({ datas }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="font-medium">
          <TableHead>Data</TableHead>
          <TableHead>Valore</TableHead>
          <TableHead>Sensore</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {datas.map((data) => {
          return (
            <TableRow key={data._id} className="odd:bg-gray-50">
              <TableCell className="font-medium">
                {new Intl.DateTimeFormat("it-IT", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(new Date(data.timestamp))}
              </TableCell>
              <TableCell>{data.value}</TableCell>
              <TableCell className="">
                {data.value_type}{" "}
                <Badge className="bg-amber-500 text-black">
                  {data.sensor_type}
                </Badge>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
