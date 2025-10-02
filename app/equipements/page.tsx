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
  const orderBy = searchParams.get("orderBy") ?? "";


  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "equipements",
      page,
      limit,
      type,
      arrondissement,
      payant,
      statut_ouverture,
      orderBy
    ],
    queryFn: async () => {
      const equipements = await FetchEquipements({
        page,
        limit,
        type,
        arrondissement,
        payant,
        statut_ouverture,
        orderBy
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
      <h1 className="text-4xl font-bold mb-4 text-center font-title text-primary">Equipements/Activités</h1>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center md:items-start md:justify-start">
        <EquipementsFilter />
        <div className="flex flex-col gap-2 w-full md:w-3/4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-title text-primary font-semibold text-lg">Nom</TableHead>
                <TableHead className="font-title text-primary font-semibold text-lg">Type</TableHead>
                <TableHead className="font-title text-primary font-semibold text-lg">Adresse</TableHead>
                <TableHead className="font-title text-primary font-semibold text-lg">Arrondissement</TableHead>
                <TableHead className="font-title text-primary font-semibold text-lg">payant</TableHead>
                <TableHead className="font-title text-primary font-semibold text-lg">statut_ouverture</TableHead>
                <TableHead className="font-title text-primary font-semibold text-lg">horaires_periode</TableHead>
                <TableHead className="font-title text-primary font-semibold text-lg">horaires_lundi</TableHead>
                <TableHead className="font-title text-primary font-semibold text-lg">horaires_mardi</TableHead>
                <TableHead className="font-title text-primary font-semibold text-lg">horaires_mercredi</TableHead>
                <TableHead className="font-title text-primary font-semibold text-lg">horaires_jeudi</TableHead>
                <TableHead className="font-title text-primary font-semibold text-lg">horaires_vendredi</TableHead>
                <TableHead className="font-title text-primary font-semibold text-lg">horaires_samedi</TableHead>
                <TableHead className="font-title text-primary font-semibold text-lg">horaires_dimanche</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {equipements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={14} className="text-center text-primary font-title  py-8">
                  Aucun équipement trouvé.
                  </TableCell>
                </TableRow>
                ) : (
                equipements.map((equipement, index) => (
                  <TableRow key={index}>
                  <TableCell className="font-semibold text-md font-title">
                    {equipement.nom}
                  </TableCell>
                  <TableCell className="font-semibold text-md font-title">
                    {equipement.type}
                  </TableCell>
                  <TableCell className="font-semibold text-md font-title">
                    {equipement.adresse}
                  </TableCell>
                  <TableCell className="font-semibold text-md font-title">
                    {equipement.arrondissement}
                  </TableCell>
                  <TableCell
                    className={
                    equipement.payant === "Oui"
                      ? "text-green-500 font-semibold text-md font-title"
                      : "text-red-500 font-semibold text-md font-title"
                    }
                  >
                    {equipement.payant ?? "N/A"}
                  </TableCell>
                  <TableCell
                    className={
                    equipement.statut_ouverture === "Ouvert"
                      ? "text-green-500 font-semibold text-md font-title"
                      : "text-red-500 font-semibold text-md font-title"
                    }
                  >
                    {equipement.statut_ouverture ?? "N/A"}
                  </TableCell>
                  <TableCell className="font-semibold text-md font-title">
                    {equipement.horaires_periode ?? "N/A"}
                  </TableCell>
                  <TableCell className="font-semibold text-md font-title">
                    {equipement.horaires_lundi ?? "N/A"}
                  </TableCell>
                  <TableCell className="font-semibold text-md font-title">
                    {equipement.horaires_mardi ?? "N/A"}
                  </TableCell>
                  <TableCell className="font-semibold text-md font-title">
                    {equipement.horaires_mercredi ?? "N/A"}
                  </TableCell>
                  <TableCell className="font-semibold text-md font-title">
                    {equipement.horaires_jeudi ?? "N/A"}
                  </TableCell>
                  <TableCell className="font-semibold text-md font-title">
                    {equipement.horaires_vendredi ?? "N/A"}
                  </TableCell>
                  <TableCell className="font-semibold text-md font-title">
                    {equipement.horaires_samedi ?? "N/A"}
                  </TableCell>
                  <TableCell className="font-semibold text-md font-title">
                    {equipement.horaires_dimanche ?? "N/A"}
                  </TableCell>
                  </TableRow>
                ))
                )}
            </TableBody>
          </Table>

          <PaginationComponent totalPages={totalPages} currentPage={page} />
        </div>
      </div>
    </div>
  );
};

export default Equipements;
