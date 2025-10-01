import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { communes } from "@/constants";
import { Button } from "./ui/button";

const FontainesFilter = () => {
  const { updateSearchParams, searchParams } = useUpdateSearchParams();
  const dispo = searchParams.get("dispo") ?? "";
  const modele = searchParams.get("modele") ?? "";
  const commune = searchParams.get("commune") ?? "";

  return (
    <div className="flex gap-4 mb-4 items-center justify-center">
      <div className="flex flex-col gap-2">
        <Label htmlFor="dispo">Disponibilté</Label>
        <Select
          onValueChange={(value) =>
            updateSearchParams({ dispo: value, page: 1 })
          }
          value={dispo}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Disponibilité" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="OUI">OUI</SelectItem>
            <SelectItem value="NON">NON</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid w-full max-w-sm items-center gap-2">
        <Label htmlFor="modele">Modèle</Label>
        <Input
          type="text"
          id="modele"
          placeholder="ex:  Particulier"
          value={modele}
          onChange={(e) =>
            updateSearchParams({ modele: e.target.value, page: 1 })
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="commune">Commune</Label>
        <Select
          onValueChange={(value) => updateSearchParams({ commune: value , page:1 })}
          value={commune}
        >
          <SelectTrigger className="w-[250px] ">
            <SelectValue placeholder="Choisir une commune" />
          </SelectTrigger>
          <SelectContent className="h-[250px]">
            {communes.map((commune) => (
              <SelectItem key={commune} value={commune}>
                {commune}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button className="p-2 bg-red-500 hover:bg-red-600 text-white font-bold text-lg mt-2" onClick={() => updateSearchParams({ dispo: "", modele: "", commune: "", page: 1 })}>Reset Filters</Button>
    </div>
  );
};

export default FontainesFilter;
