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
        <TableRow>
          <TableHead className="w-25">Data</TableHead>
          <TableHead>Valore</TableHead>
          <TableHead>Sensore</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {datas.map((data) => {
          console.log(data);
          return (
            <TableRow key={data._id}>
              <TableCell className="font-medium">
                {new Intl.DateTimeFormat("it-IT", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(new Date(data.timestamp))}
              </TableCell>
              <TableCell>{data.value}</TableCell>
              <TableCell>
                {data.value_type} <Badge>{data.sensor_type}</Badge>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
