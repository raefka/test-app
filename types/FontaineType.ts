export interface Fontaine {
    total_count: number;
    results:     Result[];
}

export interface Result {
    gid:              string;
    type_objet:       string;
    modele:           string;
    no_voirie_pair:   null | string;
    no_voirie_impair: null | string;
    voie:             string;
    commune:          string;
    dispo:            string;
    debut_ind:        null;
    fin_ind:          null;
    motif_ind:        null;
    geo_shape:        GeoShape;
    geo_point_2d:     GeoPoint2D;
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


export type FontainesProps = {
    page: number;
    limit: number;
    dispo?: string;
    modele?: string;
    commune?: string;
}