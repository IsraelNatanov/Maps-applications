import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SplitButton from "./splitButton";

import Map from "ol/Map";
import View from "ol/View";
import { get, fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import Vector from "ol/layer/Vector";
import Point from "ol/geom/Point";
import OSM from "ol/source/OSM";
import Vectors from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import FullScreen from "ol/control/FullScreen";
import Select from "ol/interaction/Select";
import "ol/ol.css";
import { toLonLat } from "ol/proj";
import Draw from "ol/interaction/Draw";
import "./maps.css";
import axios from "axios";
import jgo from "../gho.json";
import dffg from "../dffg.json";
import Overlay from "ol/Overlay";
import MapBrowserEvent from "ol/MapBrowserEvent";
import Feature from "ol/Feature";
import { styleFunction, styleLineString } from "./function";
import SearchBtn from "./searchBtn";

import { useQuery } from "react-query";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { map } from "jquery";

const format = new GeoJSON({ featureProjection: "EPSG:3857" });
interface Props {
  map: Map;
  clickViewSites: () => void;
  selectLineString: () => void;
  closeLineString: () => void;
  removeMapLaye: () => void;
}

function ButtonHeader(props: Props) {
  const [vieLineString, SetViewLineString] = useState(false);
  let mapSource = new Vectors();
  let vectorLayer = new Vector();
  mapSource = new Vectors({
    format: new GeoJSON(),
    // url:"http://localhost:9000/geojson"
    loader: vectorLoader!,
  });
  vectorLayer = new Vector({
    source: mapSource,
    style: styleFunction,
    // title: 'b_layer',
  });

  useEffect(() => {}, []);
  function vectorLoader() {
    axios
      .get("http://localhost:9000/geojson")
      .then((res) => {
        console.log(res.data);
        const features = format.readFeatures(res.data);
        mapSource.addFeatures(features);
      })
      .catch((error) => console.log(error));
  }
  const click = async () => {
    console.log();
  };

  return (
    <Stack direction="row" justifyContent={"center"} spacing={2}>
      <Button
        variant="outlined"
        sx={{ backgroundColor: "white" }}
        onClick={()=> {mapSource = new Vectors({
          format: new GeoJSON(),
          // url:"http://localhost:9000/geojson"
          loader: vectorLoader!,
        });
        vectorLayer = new Vector({
      
          
          source: mapSource,
          style: styleFunction,
          // title: 'b_layer',
        })}}
      >
        הצג אתרים
      </Button>
      <Button
        variant="outlined"
        sx={{ backgroundColor: "white" }}
        onClick={() => props.map!.removeLayer(vectorLayer)}
      >
        מחק אתרים
      </Button>
      {/* <Button variant="outlined" sx={{backgroundColor:"white"}} onClick={()=>{
      if(!vieLineString){
      props.selectLineString()
      SetViewLineString(true)
      }
      else{
        props.closeLineString()
        SetViewLineString(false)
      }}}>בחר מיקומים</Button> */}

      {/* <SplitButton /> */}

      {/* <Button variant="outlined" href="#contained-buttons">
      Link
    </Button> */}
    </Stack>
  );
}
export default ButtonHeader;
