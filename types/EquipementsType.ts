export interface Equipement {
    total_count: number;
    results:     Result[];
}

export interface Result {
    identifiant:        string;
    id_dicom:           null | string;
    nom:                string;
    type:               string;
    payant:             string;
    adresse:            string;
    arrondissement:     string;
    statut_ouverture:   string |null;
    horaires_periode:   string;
    horaires_lundi:     string |null;
    horaires_mardi:     string |null;
    horaires_mercredi:  string |null;
    horaires_jeudi:     string |null;
    horaires_vendredi:  string |null;
    horaires_samedi:    string |null;
    horaires_dimanche:  string |null;
    geo_shape:          GeoShape;
    geo_point_2d:       GeoPoint2D;
    proposition_usager: string;
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
    coordinates: number[];
    type:        string;
}

export interface Properties {
}

export type EquipementsProps = {
    page:number;
    limit:number;
    type?:string;
    payant?:string;
    arrondissement?:string;
    statut_ouverture?:string;
    orderBy?:string;
}