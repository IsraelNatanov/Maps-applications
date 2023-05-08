import express, { Request, Response } from "express";
import { EventsFeaturesModel } from "../models/eventsFeaturesModel";
import { FeatureModel } from "../models/featuresModel";
import { IEventFeatures } from "../types/FeatureType";

const router = express.Router();

const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
  const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return distance;
};
let distanceArr: [number, number] = [Infinity, Infinity];
let saveIndex: [number, number] = [0, 0];
let i = 0;

router.get("/", async (req: Request, res: Response) => {
  try {
    const type = "FeatureCollection";
    const featuresA = await FeatureModel.find();
    const eventFeatures: IEventFeatures[] = await EventsFeaturesModel.find({});
    let j = 0;
    let lowestCoordinates: [number, number] = [Infinity, Infinity];
    // for (const event of eventFeatures) {
    //   const eventsArr = event.features;
     
    //   for (const feature of eventsArr) {
    //     j = 0;
        
    //     if (feature.geometry.type == "Point") {
         
    //       // console.log(feature.geometry.coordinates);
          
    //       for (const featureOfA of featuresA) {
    //         if (featureOfA.geometry.type == "Point") {
    //           const distance = getDistance(
    //             feature.geometry.coordinates[0],
    //             featureOfA.geometry.coordinates[0],
    //             feature.geometry.coordinates[1],
    //             featureOfA.geometry.coordinates[1]
    //           );
    //           console.log(distance.toFixed(5));
    //           if (Number(distance.toFixed(5)) < distanceArr[i]) {
    //             distanceArr[i] = Number(distance.toFixed(5));
    //             saveIndex[i] = j;
    //             lowestCoordinates = featureOfA.geometry.coordinates
    //             console.log( feature.geometry.coordinates[0],feature.geometry.coordinates[1]);
    //             console.log( featureOfA.geometry.coordinates[0],featureOfA.geometry.coordinates[1]);
                
    //           }
             
    //         }
         
            
    //         j++;
           

    //         // if (feature.geometry.type == "Point") {
    //         //   const coordinatesArr = feature.geometry.coordinates;

    //         //   if (feature.geometry.coordinates[0] < lowestCoordinates[0]) {
    //         //     lowestCoordinates[0] = feature.geometry.coordinates[0];
    //         //   }
    //         //   if (feature.geometry.coordinates[1] < lowestCoordinates[1]) {
    //         //     lowestCoordinates[1] = feature.geometry.coordinates[1];
    //         //   }
    //       }
         
    //       feature.geometry.coordinates = lowestCoordinates
    //       lowestCoordinates = [Infinity, Infinity];
    //       // console.log(feature.geometry.coordinates);
          
    //     }

      
       
    //   }

    //   i++;
    //   console.log('-----------');

    //   // const eventsArr = eventFeatures[0].features[0].geometry.coordinates
    //   // for(const features of eventsArr){

    //   // }
    // }
    // // console.log(distanceArr);
    // // console.log(saveIndex);

    // // loops through the features array and extracts the name from each feature
    // // only if the properties.name field is present

    res.json({ type, features: featuresA });
  } catch (err) {
    res.json(err);
  }
});

export default router;
