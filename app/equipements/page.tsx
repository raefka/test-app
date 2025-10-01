"use client";
import PaginationComponent from "@/components/Pagination";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { FetchEquipements } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EquipementsFilter from "@/components/EquipementsFilter";

const Equipements = () => {
  const { searchParams } = useUpdateSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const type = searchParams.get("type") ?? "";
  const payant = searchParams.get("payant") ?? "";
  const arrondissement = searchParams.get("arrondissement") ?? "";
  const statut_ouverture = searchParams.get("statut_ouverture") ?? "";

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "equipements",
      page,
      limit,
      type,
      arrondissement,
      payant,
      statut_ouverture,
    ],
    queryFn: async () => {
      const equipements = await FetchEquipements({
        page,
        limit,
        type,
        arrondissement,
        payant,
        statut_ouverture,
      });
      return equipements;
    },
  });

  if (isLoading)
    return (
      <div className="w-full h-[450px] flex items-center justify-center ">
        <div className="border-primary flex h-10 w-10 animate-spin items-center justify-center rounded-full border-4 border-t-transparent" />
      </div>
    );
  if (isError) return <p>Erreur lors du chargement</p>;

  const equipements = data!.results;
  const total = data!.total_count;
  const totalPages = Math.ceil(total / limit);
  return (
    <div className="p-4 flex flex-col gap-4">
      <h1>Equipements/Activités</h1>
      <div className="flex gap-4">
        <EquipementsFilter />
        <div className="flex flex-col gap-2 w-3/4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Arrondissement</TableHead>
                <TableHead>payant</TableHead>
                <TableHead>statut_ouverture</TableHead>
                <TableHead>horaires_periode</TableHead>
                <TableHead>horaires_lundi</TableHead>
                <TableHead>horaires_mardi</TableHead>
                <TableHead>horaires_mercredi</TableHead>
                <TableHead>horaires_jeudi</TableHead>
                <TableHead>horaires_vendredi</TableHead>
                <TableHead>horaires_samedi</TableHead>
                <TableHead>horaires_dimanche</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipements.map((equipement, index) => (
                <TableRow key={index}>
                  <TableCell className="font-semibold text-md">
                    {equipement.nom}
                  </TableCell>
                  <TableCell className="font-semibold text-md">
                    {equipement.type}
                  </TableCell>
                  <TableCell className="font-semibold text-md">
                    {equipement.adresse}
                  </TableCell>
                  <TableCell className="font-semibold text-md">
                    {equipement.arrondissement}
                  </TableCell>
                  <TableCell
                    className={
                      equipement.payant === "Oui"
                        ? "text-green-500 font-semibold text-md"
                        : "text-red-500 font-semibold text-md"
                    }
                  >
                    {equipement.payant ?? "N/A"}
                  </TableCell>
                  <TableCell
                    className={
                      equipement.statut_ouverture === "Oui"
                        ? "text-green-500 font-semibold text-md"
                        : "text-red-500 font-semibold text-md"
                    }
                  >
                    {equipement.statut_ouverture ?? "N/A"}
                  </TableCell>
                  <TableCell className="font-semibold text-md">
                    {equipement.horaires_periode ?? "N/A"}
                  </TableCell>
                  <TableCell className="font-semibold text-md">
                    {equipement.horaires_lundi ?? "N/A"}
                  </TableCell>
                  <TableCell className="font-semibold text-md">
                    {equipement.horaires_mardi ?? "N/A"}
                  </TableCell>
                  <TableCell className="font-semibold text-md">
                    {equipement.horaires_mercredi ?? "N/A"}
                  </TableCell>
                  <TableCell className="font-semibold text-md">
                    {equipement.horaires_jeudi ?? "N/A"}
                  </TableCell>
                  <TableCell className="font-semibold text-md">
                    {equipement.horaires_vendredi ?? "N/A"}
                  </TableCell>
                  <TableCell className="font-semibold text-md">
                    {equipement.horaires_samedi ?? "N/A"}
                  </TableCell>
                  <TableCell className="font-semibold text-md">
                    {equipement.horaires_dimanche ?? "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <PaginationComponent totalPages={totalPages} currentPage={page} />
        </div>
      </div>
    </div>
  );
};

export default Equipements;
