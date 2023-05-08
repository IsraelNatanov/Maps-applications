import express, { Request, Response } from "express";
import { EventsFeaturesModel } from "../models/eventsFeaturesModel";
import { FeatureModel } from "../models/featuresModel";
import { IEventFeatures, IFeatures } from "../types/FeatureType";

const router = express.Router();

const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
  const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return distance;
};
// router.get("/", async (req: Request, res: Response) => {
//   try {
//     const type: string = "FeatureCollection";

//     let events: IEventFeatures[] = await EventsFeaturesModel.find({});
//     const featuresA = await FeatureModel.find();

//     for (const event of events) {
//       const eventsArr = event.features;

//       for (let i = 0; i < eventsArr.length; i++) {
//         let feature = eventsArr[i];

//         if (feature.geometry.type === "Point") {
//           let lowestCoordinates: [number, number] = [80.83253, 15.16293];
//           let distanceArr: number[] = [];
//           let saveIndex: number = -1;

//           for (const featureOfA of featuresA) {
//             if (featureOfA.geometry.type === "Point") {
//               const distance = getDistance(
//                 feature.geometry.coordinates[0],
//                 featureOfA.geometry.coordinates[0],
//                 feature.geometry.coordinates[1],
//                 featureOfA.geometry.coordinates[1]
//               );
//               let distanceNumber = Number(distance.toFixed(5));
//               distanceArr.push(distanceNumber);
//               const tempDistance = getDistance(
//                 feature.geometry.coordinates[0],
//                 lowestCoordinates[0],
//                 feature.geometry.coordinates[1],
//                 lowestCoordinates[1]
//               );

//               if (distanceNumber < Number(tempDistance.toFixed(5))) {
//                 lowestCoordinates = featureOfA.geometry.coordinates;
//                 saveIndex = i;
//               }
//             }
//           }

//           if (saveIndex >= 0) {
//             feature = eventsArr[i + 1];
//             let filter = { _id: event._id, "features._id": feature._id };
//             const update = {
//               $set: {
//                 ["features." + saveIndex + ".geometry.coordinates"]: lowestCoordinates
//               }
//             };
//             await EventsFeaturesModel.updateOne(filter, update);
//           }
//         }
//       }
//     }

//     events = await EventsFeaturesModel.find({});
//     console.log(events);

//     res.json(events);
//   } catch (err) {
//     res.json(err);
//   }
// });

router.get("/", async (req: Request, res: Response) => {
  try {
    let features: IEventFeatures[] = await EventsFeaturesModel.find({});

    const featuresA = await FeatureModel.find();

    for (const event of features) {
      const eventsArr = event.features;
      console.log(eventsArr[0].geometry.type);

      let distanceArr: number[] = new Array(featuresA.length).fill(100);

      // for (const feature of eventsArr) {
      if (eventsArr[0].geometry.type === "Point") {
        let lowestCoordinates: [number, number] = [80.83253, 15.16293];

        for (let i = 0; i < featuresA.length; i++) {
          let feature = featuresA[i];

          // for (const featureOfA of featuresA) {
          if (feature.geometry.type === "Point") {
            // console.log(eventsArr[0].geometry.coordinates[0],eventsArr[0].geometry.coordinates[1]);

            const distance = getDistance(
              eventsArr[0].geometry.coordinates[0],
              eventsArr[0].geometry.coordinates[1],
              feature.geometry.coordinates[0],
              feature.geometry.coordinates[1]
            );
            // console.log("event",eventsArr[0].geometry.coordinates[0],eventsArr[0].geometry.coordinates[1]);
            // console.log("feature",  featureOfA.geometry.coordinates[0], featureOfA.geometry.coordinates[1]);

            // console.log("distance", distance.toFixed(5));
            let distanceNumber = Number(distance.toFixed(5));
            distanceArr[i] = distanceNumber;

            // const tempDistance = getDistance(
            //   eventsArr[0].geometry.coordinates[0],
            //   eventsArr[0].geometry.coordinates[1],
            //   lowestCoordinates[0],
            //   lowestCoordinates[1]
            // );
            // console.log("tempDistance",(Number(tempDistance.toFixed(5))));

            // if (distanceNumber < Number(tempDistance.toFixed(5))) {
            //   // console.log(featuresA.indexOf(featureOfA));

            //   lowestCoordinates = feature.geometry.coordinates;
            //   saveIndex = featuresA.indexOf(feature);
            //   // console.log("saveIndex", saveIndex);
            // }
          }
        }
        console.log("distanceArr", distanceArr);
        for (let i = 0; i < 3; i++) {
          let minDistance = 200;
          let saveIndex: number = 0;
          for (let j = 0; j < distanceArr.length; j++) {
            if (distanceArr[j] < minDistance) {
              console.log("a",featuresA[j].geometry.coordinates);
              
              saveIndex = j;
              minDistance = distanceArr[j];
            }
          }
          console.log(minDistance);

          distanceArr[saveIndex] = 200;
          lowestCoordinates = featuresA[saveIndex].geometry.coordinates;
          console.log(lowestCoordinates);
          let index = i + 1
          let filter = { _id: event._id };
    
          // console.log(lowestCoordinates);

          const update = {
            $set: {
              ["features." + index + ".geometry.coordinates.0"]:
                lowestCoordinates,
            },
          };

          await EventsFeaturesModel.updateOne(filter, update);
        }
        // if (saveIndex >= 0) {
        //   let filter = { _id: event._id };
        //   // console.log(lowestCoordinates);

        //   const update = {
        //     $set: {
        //       "features.1.geometry.coordinates.0": lowestCoordinates,
        //     },
        //   };

        //   await EventsFeaturesModel.updateOne(filter, update);
        // }
        // console.log("----------");
      }
      // }
    }
    const type: string = "FeatureCollection";
    features = await EventsFeaturesModel.find({});
    let featuresWithType = features.map((feature, index) => ({
      ...feature._doc,
      type,
      id: ++index,
      label: `אירוע מספר ${index}`,
    })); // add the "type" property to each feature
    // console.log(featuresWithType);

    res.json(featuresWithType);
  } catch (err) {
    res.json(err);
  }
});

export default router;
