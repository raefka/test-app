"use client";

import { FetchFontaines } from "@/utils";
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
  const {  searchParams } = useUpdateSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const dispo = searchParams.get("dispo") ?? "";
  const modele = searchParams.get("modele") ?? "";
  const commune = searchParams.get("commune") ?? "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fontaines", page, limit, dispo, modele, commune],
    queryFn: async () => {
      const fontaines = await FetchFontaines({ page, limit, dispo, modele, commune });
      return fontaines;
    },
  });

  if (isLoading) return <div className="w-full h-[450px] flex items-center justify-center "><div className="border-primary flex h-10 w-10 animate-spin items-center justify-center rounded-full border-4 border-t-transparent"/></div>;
  if (isError) return <p>Erreur lors du chargement</p>;

  const fontaines = data!.results;
  const total = data!.total_count;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Fontaines à boire</h1>
      <FontainesFilter />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Modèle</TableHead>
            <TableHead>Voie</TableHead>
            <TableHead>Commune</TableHead>
            <TableHead>Dispo</TableHead>
            <TableHead>debut_ind</TableHead>
            <TableHead>fin_ind</TableHead>
            <TableHead>motif_ind</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fontaines.map((fontaine) => (
            <TableRow key={fontaine.gid}>
              <TableCell className="font-semibold text-md">{fontaine.modele}</TableCell>
              <TableCell className="font-semibold text-md">{fontaine.voie}</TableCell>
              <TableCell className="font-semibold text-md">{fontaine.commune}</TableCell>
              <TableCell className={fontaine.dispo === "OUI" ? "text-green-500 font-semibold text-md" : "text-red-500 font-semibold text-md" }>{fontaine.dispo}</TableCell>
              <TableCell className="font-semibold text-md">{fontaine.debut_ind ?? "N/A"}</TableCell>
              <TableCell className="font-semibold text-md">{fontaine.fin_ind ?? "N/A"}</TableCell>
              <TableCell className="font-semibold text-md">{fontaine.motif_ind ?? "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationComponent totalPages={totalPages} currentPage={page} />
    </div>
  );
}
