import { Equipement, EquipementsProps } from "@/types/EquipementsType";
import { Espace, EspacesProps } from "@/types/EspaceType";
import { Fontaine, FontainesProps } from "@/types/FontaineType";
import axios from "axios";



export const FetchFontaines = async({page, limit, dispo, modele, commune}:FontainesProps) =>{
    const offset = (page - 1) * limit;
    let url = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/fontaines-a-boire/records?limit=${limit}&offset=${offset}`;
    const where: string[] = [];
      if (dispo) where.push(`dispo="${dispo}"`);
      if (modele) where.push(`modele="${modele}"`);
      if (commune) where.push(`commune="${commune}"`);

      if (where.length > 0) {
        url += `&where=${encodeURIComponent(where.join(" AND "))}`;
      }

      const res = await axios.get(url);
      if (!res) throw new Error("Erreur lors du fetch");
      return res.data as Promise<Fontaine>;

}



export const FetchEspaces = async({page, limit, type, arrondissement, ouvert_24h, canicule_ouverture, ouverture_estivale_nocturne}:EspacesProps) =>{
    const offset = (page - 1) * limit;
    let url = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records?limit=${limit}&offset=${offset}`;
    const where: string[] = [];
      if (type) where.push(`type="${type}"`);
      if (arrondissement) where.push(`arrondissement="${arrondissement}"`);
      if (ouvert_24h) where.push(`ouvert_24h="${ouvert_24h}"`);
      if (canicule_ouverture) where.push(`canicule_ouverture="${canicule_ouverture}"`);
      if (ouverture_estivale_nocturne) where.push(`ouverture_estivale_nocturne="${ouverture_estivale_nocturne}"`);

      if (where.length > 0) {
        url += `&where=${encodeURIComponent(where.join(" AND "))}`;
      }

      const res = await axios.get(url);
      if (!res) throw new Error("Erreur lors du fetch");
      return res.data as Promise<Espace>;

}


export const FetchEquipements = async({page, limit, type, payant, arrondissement, statut_ouverture,orderBy}:EquipementsProps) =>{
    const offset = (page - 1) * limit;
    let url = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-equipements-activites/records?limit=${limit}&offset=${offset}`;
    const where: string[] = [];
      if (type) where.push(`type="${type}"`);
      if (payant) where.push(`payant="${payant}"`);
      if (arrondissement) where.push(`arrondissement="${arrondissement}"`);
      if (statut_ouverture) where.push(`statut_ouverture="${statut_ouverture}"`);

      if (where.length > 0) {
        url += `&where=${encodeURIComponent(where.join(" AND "))}`;
      }

      if(orderBy){
        url += `&order_by=${orderBy}`;
      }

      const res = await axios.get(url);
      if (!res) throw new Error("Erreur lors du fetch");
      return res.data as Promise<Equipement>;

}

export const formatValue = (value?: string | null) => {
  if (!value) return "N/A";

  const date = new Date(value);
  if (!isNaN(date.getTime())) {
    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  }

  return value;
};

