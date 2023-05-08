import React, { Component } from "react";
import Map from "ol/Map";
import View from "ol/View";
import {fromLonLat} from "ol/proj";
import TileLayer from "ol/layer/Tile";
import Vector from "ol/layer/Vector";
import Point from "ol/geom/Point";
import OSM from "ol/source/OSM";
import Vectors from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import FullScreen from "ol/control/FullScreen";
import "ol/ol.css";
import "./maps.css";
import Tile from "ol/layer/Tile";
import Stamen from "ol/source/Stamen";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import Icon from "ol/style/Icon";
import axios from "axios";
import jgo from "../src/fullJson.json";
import f from "ol/interaction/Draw"
import Overlay from "ol/Overlay";

// import { Feature } from 'ol';

export default class Maps extends Component<{}, any> {
  content: any;
  constructor(props: any) {
    super(props);
    this.state = {
      center: [],
      zoom: [],
      proj:[],
      src: [],
      anchor: [],
    };
  }

  componentDidMount() {
    // const format = new GeoJSON({ featureProjection: 'EPSG:3857' });
    // const features = format.readFeatures(fullGeoJSON)
    const format = new GeoJSON({ featureProjection: "EPSG:3857" });
    const features = format.readFeatures(jgo);

    // axios.get("http://localhost:9000/map")
    //     .then((response) => {
    //       const data = response.data;
    //       console.log(data)})

    const app = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([34.84517762144668, 32.167921158434325]),
        zoom: 16,
      }),
    });
    const raster = new Tile({
      source: new Stamen({
        layer: "toner",
      }),
    });

    const marker = new Vector({
      source: new Vectors({
        features,
      }),
      style: new Style({
        image: new Icon({
          src: "src/images/icons8-map-64.png",
          anchor: [0.5, 1],
         
        }),
        stroke: new Stroke({
          color: "blue",
          lineDash: [4],
          width: 3,
        }),
        fill: new Fill({
          color: "rgba(0, 0, 255, 0.1)",
        }),
      }),

     
    });
    const tooltip: any = document.getElementById("tooltip");
    const positioning: any = "bottom-left";

    const overlay = new Overlay({
      element: tooltip,
      offset: [10, 0],
      positioning: positioning,
    });

    app.addLayer(marker);

    app.addOverlay(overlay);

    const fullscreen = new FullScreen();
    app.addControl(fullscreen);
 

    function displayTooltip(evt:any) {
      const pixel = evt.pixel;

      const feature = app.forEachFeatureAtPixel(
        pixel,
        function (feature, layer) {
          return feature;
        }
      );
      tooltip.style.display = feature ? "" : "none";
      if (feature) {
        overlay.setPosition(evt.coordinate);

        tooltip.innerHTML = feature.get("name");
      }
    }

    app.on("pointermove", displayTooltip);
   
  }

  render() {
    return (
      // <div>
      //   <div
      //     style={{ height: "80vh", width: "100%" ,position: "relative"}}
      //     id="map-container"
      //     className="map-container"
      //   />
      //   <div className="tooltip" id="tooltip" title="overlay" data-tooltip={this.content} >
      //     <div className="too" id="too" title="overlay"/>
      //   </div>
      // </div>
      <div id="map" className="map">
        <div id="tooltip" className="tooltip"></div>
      </div>
    );
  }
}
