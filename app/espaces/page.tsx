"use client";
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationComponent from '@/components/Pagination';
import { useQuery } from '@tanstack/react-query';
import { useUpdateSearchParams } from '@/hooks/useUpdateSearchParams';
import { FetchEspaces } from '@/utils';
import EspacesFilter from '@/components/EspacesFilter';

const Espaces = () => {
  const { searchParams } = useUpdateSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const type = searchParams.get("type") ?? "";
  const arrondissement = searchParams.get("arrondissement") ?? "";
  const ouvert_24h = searchParams.get("ouvert_24h") ?? "";
  const canicule_ouverture = searchParams.get("canicule_ouverture") ?? "";
  const ouverture_estivale_nocturne = searchParams.get("ouverture_estivale_nocturne") ?? "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["espaces", page, limit, type, arrondissement, ouvert_24h, canicule_ouverture, ouverture_estivale_nocturne],
    queryFn: async () => {
      const espaces = await FetchEspaces({ page, limit, type, arrondissement, ouvert_24h, canicule_ouverture, ouverture_estivale_nocturne });
      return espaces;
    },
  });

  if (isLoading) return <div className="w-full h-[450px] flex items-center justify-center "><div className="border-primary flex h-10 w-10 animate-spin items-center justify-center rounded-full border-4 border-t-transparent"/></div>;
  if (isError) return <p>Erreur lors du chargement</p>;

  const espaces = data!.results;
  const total = data!.total_count;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className='p-4'>
      <h1 className='text-4xl font-bold mb-4 text-center font-title text-primary'>
        Espaces Verts
      </h1>
      <EspacesFilter />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-title text-primary font-semibold text-lg">Nom</TableHead>
            <TableHead className="font-title text-primary font-semibold text-lg">Type</TableHead>
            <TableHead className="font-title text-primary font-semibold text-lg">Adresse</TableHead>
            <TableHead className="font-title text-primary font-semibold text-lg">Arrondissement</TableHead>
            <TableHead className="font-title text-primary font-semibold text-lg">ouvert_24h</TableHead>
            <TableHead className="font-title text-primary font-semibold text-lg">Canicule_ouverture</TableHead>
            <TableHead className="font-title text-primary font-semibold text-lg">Ouverture_estivale_nocturne</TableHead>
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
          {espaces.map((espace,index) => (
            <TableRow key={index}>
              <TableCell className="font-semibold text-md font-title ">{espace.nom}</TableCell>
              <TableCell className="font-semibold text-md font-title">{espace.type}</TableCell>
              <TableCell className="font-semibold text-md font-title">{espace.adresse}</TableCell>
              <TableCell className="font-semibold text-md font-title">{espace.arrondissement}</TableCell>
              <TableCell className={espace.ouvert_24h === "Oui" ? "text-green-500 font-semibold text-md font-title" : "text-red-500 font-semibold text-md font-title" }>{espace.ouvert_24h}</TableCell>
              <TableCell className={espace.canicule_ouverture === "Oui" ? "text-green-500 font-semibold text-md font-title" : "text-red-500 font-semibold text-md font-title" }>{espace.canicule_ouverture ?? "N/A"}</TableCell>
              <TableCell className={espace.ouverture_estivale_nocturne === "Oui" ? "text-green-500 font-semibold text-md font-title" : "text-red-500 font-semibold text-md font-title" }>{espace.ouverture_estivale_nocturne ?? "N/A"}</TableCell>
              <TableCell className="font-semibold text-md font-title">{espace.horaires_periode ?? "N/A"}</TableCell>
              <TableCell className="font-semibold text-md font-title">{espace.horaires_lundi ?? "N/A"}</TableCell>
              <TableCell className="font-semibold text-md font-title">{espace.horaires_mardi ?? "N/A"}</TableCell>
              <TableCell className="font-semibold text-md font-title">{espace.horaires_mercredi ?? "N/A"}</TableCell>
              <TableCell className="font-semibold text-md font-title">{espace.horaires_jeudi ?? "N/A"}</TableCell>
              <TableCell className="font-semibold text-md font-title">{espace.horaires_vendredi ?? "N/A"}</TableCell>
              <TableCell className="font-semibold text-md font-title">{espace.horaires_samedi ?? "N/A"}</TableCell>
              <TableCell className="font-semibold text-md font-title">{espace.horaires_dimanche ?? "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationComponent totalPages={totalPages} currentPage={page} />

    </div>
  )
}

export default Espaces