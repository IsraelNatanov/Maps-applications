
import express from "express";
import dotenv from 'dotenv';
dotenv.config();

import "./db/mongoConnect";
import featuresR from "./routes/features";
import eventesFeaturesR from "./routes/eventesFeatures";



const app = express();


app.use(express.json({limit: '50mb'}));
app.use(express.json());

app.all('*', function(req, res, next) {
  if (!req.get('Origin')) return next();
  // * - Permission for all domains to make a request
  res.set('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,x-api-key');
  next();
});



app.use("/features", featuresR)
app.use("/eventesFeatures", eventesFeaturesR)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});