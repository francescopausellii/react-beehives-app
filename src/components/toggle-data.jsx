import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

export default function ToggleData({ onChange }) {
  return (
    <div className="flex gap-2.5">
      <Label htmlFor="show-data">Mostra Dati</Label>
      <Switch
        id="show-data"
        onCheckedChange={(checked) => onChange?.(checked)}
      />
    </div>
  );
}
