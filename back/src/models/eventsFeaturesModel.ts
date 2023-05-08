import mongoose, { Schema, Document } from 'mongoose';
import { IEventFeatures, IFeature, IFeatureCollection } from '../types/FeatureType';

// export interface IEventFeatures {
//   type: string;
//   features: {
//     type: string;
//     geometry: {
//       type: string;
//       coordinates: number[] ;
//     };
//     properties: {
//       name: string;
//       description: string;
//       typeStyle: string;
//     };
//   }[];
//   _id: string;
//   id: number;
//   label: string;
// }

const FeatureSchema = new mongoose.Schema<IFeature>({
    type: {
      type: String,
      enum: ['Feature'],
      required: true,
    },
    geometry: {
      type: {
        type: String,
        enum: ['Point', 'LineString'],
        required: true,
      },
      coordinates: {
        type: [],
        required: true,
      },
    },
    properties: {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      typeStyle: {
        type: String,
        required: true,
      },
    },
  });
  
  const FeatureCollectionSchema = new mongoose.Schema<IFeatureCollection>({
    type: {
      type: String,
      enum: ['FeatureCollection'],
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    features: {
      type: [FeatureSchema],
      required: true,
    },
  });

export const EventsFeaturesModel = mongoose.model<IFeatureCollection>('fulleventfeatures', FeatureCollectionSchema);
