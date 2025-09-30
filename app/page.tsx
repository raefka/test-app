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
} from "@/components/ui/table"
import PaginationComponent from "@/components/Pagination";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";



export default function FontaineTable() {
  const { updateSearchParams, searchParams } = useUpdateSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const dispo = searchParams.get("dispo") ?? "";
  const modele = searchParams.get("modele") ?? "";




  const {data,isLoading,isError} = useQuery({
    queryKey: ["fontaines", page, limit, dispo, modele],
    queryFn: async () => {
      const fontaines = await FetchFontaines({ page, limit, dispo, modele });
      return fontaines;
    }
  })

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Erreur lors du chargement</p>;

  const fontaines = data!.results;
  const total = data!.total_count;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Fontaines à boire</h1>

       <div className="flex gap-4 mb-4">
        <select
          value={dispo}
          onChange={(e) => updateSearchParams({ dispo: e.target.value, page: 1 })}
        >
          <option value="">-- Disponibilité --</option>
          <option value="OUI">OUI</option>
          <option value="NON">NON</option>
        </select>

        <input
          type="text"
          placeholder="Modèle..."
          value={modele}
          onChange={(e) => updateSearchParams({ modele: e.target.value, page: 1 })}
        />
      </div>

        <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Modèle</TableHead>
          <TableHead>Voie</TableHead>
          <TableHead>Commune</TableHead>
          <TableHead>Dispo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fontaines.map((fontaine) => (
          <TableRow key={fontaine.gid}>
            <TableCell>{fontaine.modele}</TableCell>
            <TableCell>{fontaine.voie}</TableCell>
            <TableCell>{fontaine.commune}</TableCell>
            <TableCell>{fontaine.dispo}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

      <PaginationComponent totalPages={totalPages} currentPage={page} />
    </div>
  );
}
