import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { espacesArrondissements, espacesTypes } from "@/constants";
import { Button } from "./ui/button";

const EspacesFilter = () => {
  const { updateSearchParams, searchParams } = useUpdateSearchParams();
  const type = searchParams.get("type") ?? "";
  const arrondissement = searchParams.get("arrondissement") ?? "";
  const ouvert_24h = searchParams.get("ouvert_24h") ?? "";
  const canicule_ouverture = searchParams.get("canicule_ouverture") ?? "";
  const ouverture_estivale_nocturne =
    searchParams.get("ouverture_estivale_nocturne") ?? "";

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4 items-center justify-center">
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
            {espacesTypes.map((espaceType) => (
              <SelectItem key={espaceType} value={espaceType}>
                {espaceType}
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
          <SelectContent className="h-[150px]">
            {espacesArrondissements.map((espaceArrondiss) => (
              <SelectItem key={espaceArrondiss} value={espaceArrondiss}>
                {espaceArrondiss}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="ouvert_24h" className="font-title text-primary font-semibold">ouvert_24h</Label>
        <Select
          onValueChange={(value) =>
            updateSearchParams({ ouvert_24h: value, page: 1 })
          }
          value={ouvert_24h}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="ouvert_24h" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Oui">Oui</SelectItem>
            <SelectItem value="Non">Non</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="canicule_ouverture" className="font-title text-primary font-semibold">canicule_ouverture</Label>
        <Select  onValueChange={(value) => updateSearchParams({ canicule_ouverture: value, page: 1 })} value={canicule_ouverture}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="canicule_ouverture" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Oui">Oui</SelectItem>
            <SelectItem value="Non">Non</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="ouverture_estivale_nocturne" className="font-title text-primary font-semibold">ouverture_estivale_nocturne</Label>
        <Select  onValueChange={(value) => updateSearchParams({ ouverture_estivale_nocturne: value, page: 1 })} value={ouverture_estivale_nocturne}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="ouverture_estivale_nocturne" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Oui">Oui</SelectItem>
            <SelectItem value="Non">Non</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="p-2bg-primary hover:bg-primary/90 text-white font-bold text-lg mt-2" onClick={() => updateSearchParams({ type: "", arrondissement: "", ouvert_24h: "", canicule_ouverture:"" , ouverture_estivale_nocturne:"", page: 1 })}>Réinitialiser</Button>
    </div>
  );
};

export default EspacesFilter;
