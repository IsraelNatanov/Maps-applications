import mongoose, { Schema, Document } from 'mongoose';

export interface IFeature {
  type: 'Feature';
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    name: string;
    description?: string;
    typeStyle: string;
    [key: string]: any;
  };
}

export interface IFeatureCollection {
  type: 'FeatureCollection';
  id?: number;
  label?: string;
  features: IFeature[];
}

export interface FeaturesState extends Document{
    features: IEventFeatures[]

  } 
  export interface IFeatures extends Document{
    // eventFeatures: any;
    _doc: any;
    type: string
    geometry: Geometry
    properties: Properties
  }

  
  export interface IEventFeatures extends Document{
    _doc: any;

    features: IFeatures[]
    type: string,
    id: number,
    label: string
  }

 
   interface Properties {
    name: string,
    description: string,
    typeStyle: string,
    typeEvent: string
  }
  
  interface Geometry {
    coordinates: [number, number]
    coordinatesLineString: Array<Array<number>>
    type: string
  }
  interface GeometryLine {
  
    coordinates: Array<Array<number>>
    type: string
  }