import { ListFilter } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { equipementsArrondissements, equipementsTypes } from "@/constants";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { Button } from "./ui/button";

const EquipementsFilter = () => {
  const { updateSearchParams, searchParams } = useUpdateSearchParams();
  const type = searchParams.get("type") ?? "";
  const arrondissement = searchParams.get("arrondissement") ?? "";
  const payant = searchParams.get("payant") ?? "";
  const statut_ouverture = searchParams.get("statut_ouverture") ?? "";
  const orderBy = searchParams.get("orderBy") ?? "";

  return (
    <div className="w-fit flex flex-col gap-4 p-4 shadow-sm shadow-slate-400 rounded-xl">
      <div className="flex gap-2 items-center ">
        <ListFilter className="stroke-primary" />
        <span className="font-title font-semibold text-primary text-lg">Filtrer par:</span>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="payant" className="font-title text-primary font-semibold">payant</Label>
        <Select
          onValueChange={(value) =>
            updateSearchParams({ payant: value, page: 1 })
          }
          value={payant}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="payant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Oui">Oui</SelectItem>
            <SelectItem value="Non">Non</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="type" className="font-title text-primary font-semibold">type</Label>
        <Select
          onValueChange={(value) =>
            updateSearchParams({ type: value, page: 1 })
          }
          value={type}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {equipementsTypes.map((equipementType) => (
              <SelectItem key={equipementType} value={equipementType}>
                {equipementType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="arrondissement" className="font-title text-primary font-semibold">arrondissement</Label>
        <Select
          onValueChange={(value) =>
            updateSearchParams({ arrondissement: value, page: 1 })
          }
          value={arrondissement}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="arrondissement" />
          </SelectTrigger>
          <SelectContent>
            {equipementsArrondissements.map((equipementArrondiss) => (
              <SelectItem key={equipementArrondiss} value={equipementArrondiss}>
                {equipementArrondiss}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="statut_ouverture" className="font-title text-primary font-semibold">statut_ouverture</Label>
        <Select
          onValueChange={(value) =>
            updateSearchParams({ statut_ouverture: value, page: 1 })
          }
          value={statut_ouverture}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="statut_ouverture" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ouvert">Ouvert</SelectItem>
            <SelectItem value="Eteint">Eteint</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="orderBy" className="font-title text-primary font-semibold">Ordonner par</Label>
        <Select
          onValueChange={(value) =>
            updateSearchParams({ orderBy: value, page: 1 })
          }
          value={orderBy}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="OrderBy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="arrondissement">arrondissement</SelectItem>
            <SelectItem value="type">type</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="p-2 bg-primary hover:bg-primary/90 text-white font-bold text-lg mt-2" onClick={() => updateSearchParams({ type: "", arrondissement: "", payant: "", statut_ouverture:"", orderBy:"", page: 1 })}>Réinitialiser</Button>
    </div>
  );
};

export default EquipementsFilter;
