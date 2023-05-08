import mongoose, { Schema, Document } from 'mongoose';
import Joi from "joi";
import { IFeatures } from '../types/FeatureType';



const FeatureSchema: Schema = new mongoose.Schema({
    type: { type: String, required: true },
    property: { type: String, required: true },
   
   
    geometry: { 
        coordinates: { type: Array, required: true },
        type: {type: String, required: true },
    },
    properties:{
        name: { type: String, required: true },
        description: { type: String, required: true },
        typeStyle: { type: String, required: true },

    }
    
});




export const FeatureModel = mongoose.model<IFeatures>('geojsons', FeatureSchema);
