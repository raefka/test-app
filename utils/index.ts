import { Fontaine } from "@/types/FontaineType";
import axios from "axios";

type FontainesProps = {
    page: number;
    limit: number;
    dispo?: string;
    modele?: string;
}

export const FetchFontaines = async({page, limit, dispo, modele}:FontainesProps) =>{
    const offset = (page - 1) * limit;
    let url = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/fontaines-a-boire/records?limit=${limit}&offest=${offset}`;
    const where: string[] = [];
      if (dispo) where.push(`dispo="${dispo}"`);
      if (modele) where.push(`modele="${modele}"`);

      if (where.length > 0) {
        url += `&where=${encodeURIComponent(where.join(" AND "))}`;
      }

      const res = await axios.get(url);
      if (!res) throw new Error("Erreur lors du fetch");
      return res.data as Promise<Fontaine>;

}

