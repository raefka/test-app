"use client";

import { FetchFontaines, formatValue } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationComponent from "@/components/Pagination";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import FontainesFilter from "@/components/FontainesFilter";

export default function FontaineTable() {
  const { searchParams } = useUpdateSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const dispo = searchParams.get("dispo") ?? "";
  const modele = searchParams.get("modele") ?? "";
  const commune = searchParams.get("commune") ?? "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fontaines", page, limit, dispo, modele, commune],
    queryFn: async () => {
      const fontaines = await FetchFontaines({
        page,
        limit,
        dispo,
        modele,
        commune,
      });
      return fontaines;
    },
  });

  if (isLoading)
    return (
      <div className="w-full h-[450px] flex items-center justify-center ">
        <div className="border-primary flex h-10 w-10 animate-spin items-center justify-center rounded-full border-4 border-t-transparent" />
      </div>
    );
  if (isError) return <p>Erreur lors du chargement</p>;

  const fontaines = data!.results;
  const total = data!.total_count;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4 text-center font-title text-primary">
        Fontaines à boire
      </h1>
      <FontainesFilter />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-title text-primary font-semibold text-lg">
              Modèle
            </TableHead>
            <TableHead className="font-title text-primary font-semibold text-lg">
              Voie
            </TableHead>
            <TableHead className="font-title text-primary font-semibold text-lg">
              Commune
            </TableHead>
            <TableHead className="font-title text-primary font-semibold text-lg">
              Dispo
            </TableHead>
            <TableHead className="font-title text-primary font-semibold text-lg">
              debut_ind
            </TableHead>
            <TableHead className="font-title text-primary font-semibold text-lg">
              fin_ind
            </TableHead>
            <TableHead className="font-title text-primary font-semibold text-lg">
              motif_ind
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fontaines.map((fontaine) => (
            <TableRow key={fontaine.gid}>
              <TableCell className="font-semibold text-md font-title">
                {fontaine.modele}
              </TableCell>
              <TableCell className="font-semibold text-md font-title">
                {fontaine.voie}
              </TableCell>
              <TableCell className="font-semibold text-md font-title">
                {fontaine.commune}
              </TableCell>
              <TableCell
                className={
                  fontaine.dispo === "OUI"
                    ? "text-green-500 font-semibold text-md font-title"
                    : "text-red-500 font-semibold text-md font-title"
                }
              >
                {fontaine.dispo}
              </TableCell>
              <TableCell className="font-semibold text-md font-title">
                {formatValue(fontaine.debut_ind)}
              </TableCell>
              <TableCell className="font-semibold text-md font-title">
                {formatValue(fontaine.fin_ind)}
              </TableCell>
              <TableCell className="font-semibold text-md font-title">
                {formatValue(fontaine.motif_ind)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationComponent totalPages={totalPages} currentPage={page} />
    </div>
  );
}
