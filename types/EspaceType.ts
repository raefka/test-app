export interface Espace {
    total_count: number;
    results:     Result[];
}

export interface Result {
    identifiant:                 string;
    nsq_espace_vert:             number | null;
    nom:                         string;
    type:                        string;
    p_vegetation_h:              number;
    proportion_vegetation_haute: number;
    adresse:                     string;
    arrondissement:              string;
    statut_ouverture:            null;
    ouvert_24h:                  string;
    canicule_ouverture:          string;
    ouverture_estivale_nocturne: string;
    horaires_periode:            string |null;
    horaires_lundi:              string |null;
    horaires_mardi:              string |null;
    horaires_mercredi:           string |null;
    horaires_jeudi:              string |null;
    horaires_vendredi:           string |null;
    horaires_samedi:             string |null;
    horaires_dimanche:           string |null;
    categorie:                   null | string;
    proposition_usager:          null;
    id_dicom:                    null;
    geo_shape:                   GeoShape;
    geo_point_2d:                GeoPoint2D;
    surf_veget_sup8m_2024:       number;
    indice_veget_sup8m_2024:     number;
}

export interface GeoPoint2D {
    lon: number;
    lat: number;
}

export interface GeoShape {
    type:       string;
    geometry:   Geometry;
    properties: Properties;
}

export interface Geometry {
    coordinates: Array<Array<Array<number[] | number>>>;
    type:        string;
}

export interface Properties {
}


export type EspacesProps = {
  page: number;
  limit: number;
  type:string;
  arrondissement:string;
  ouvert_24h:string;
  canicule_ouverture:string;
  ouverture_estivale_nocturne:string;
}
