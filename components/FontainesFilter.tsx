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
    <div className="flex flex-col md:flex-row gap-2 mb-4 items-center justify-center ">
      <div className="flex flex-col gap-2">
        <Label htmlFor="dispo" className="font-title text-primary font-semibold">Disponibilté</Label>
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

      <div className="grid w-full  items-center justify-center gap-2">
        <Label htmlFor="modele" className="font-title text-primary font-semibold">Modèle</Label>
        <Input
          type="text"
          id="modele"
          placeholder="ex:  Particulier"
          value={modele}
          onChange={(e) =>
            updateSearchParams({ modele: e.target.value, page: 1 })
          }
          className="w-[180px]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="commune" className="font-title text-primary font-semibold">Commune</Label>
        <Select
          onValueChange={(value) => updateSearchParams({ commune: value , page:1 })}
          value={commune}
        >
          <SelectTrigger className="w-[180px]">
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

      <Button className="p-2b bg-primary hover:bg-primary/90 text-white font-bold text-lg mt-2" onClick={() => updateSearchParams({ dispo: "", modele: "", commune: "", page: 1 })}>Réinitialiser</Button>
    </div>
  );
};

export default FontainesFilter;
