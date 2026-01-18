import { bee } from "@lucide/lab";
import { Icon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function Header({ beehives, onBeehiveChange }) {
  const initialBeehive =
    beehives && beehives.length > 0 ? beehives[0].id : null;

  return (
    <header className="mb-8 flex items-center flex-col">
      <h1 className="text-4xl font-bold text-amber-900 mb-2 flex gap-2">
        <Icon iconNode={bee} size={40} />
        Arnia Digitale
      </h1>
      <p className="text-amber-700">
        Sistema di monitoraggio intelligente per apicoltura
      </p>

      <Select
        onValueChange={(value) => onBeehiveChange?.(value)}
        value={initialBeehive}
      >
        <SelectTrigger className="w-45 bg-white mt-5">
          <SelectValue placeholder="Seleziona un arnia" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Arnie</SelectLabel>
            {beehives.map((beehive) => (
              <SelectItem key={beehive.id} value={beehive.id}>
                {beehive.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </header>
  );
}
