import React, { useEffect, useState } from "react";
import "./maps.css";
import Map from "ol/Map";
import View from "ol/View";
import { get, fromLonLat, toLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import Vector from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import Vectors from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import FullScreen from "ol/control/FullScreen";
import Select from "ol/interaction/Select";
import "ol/ol.css";
import { Draw, Modify, Snap } from "ol/interaction";
import axios from "axios";
import jgo from "../gho.json";
import fullJson from "../fullJson.json";
import Overlay from "ol/Overlay";
import { styleFunction, styleLineString } from "./function";
import CircularProgress from "@mui/material/CircularProgress";
import { Options } from "ol/interaction/Draw";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SplitButton from "./splitButton";
import { Type } from "ol/geom/Geometry";
import SelectInteraction from "./selectInteraction";
import ButtonSelectEvent from "./buttonSelectEvent";
import { Feature } from "ol";
import FeatureFormat from "ol/format/Feature";
import { useAppSelector } from "../store/hooks";
import { Features } from "../store/features/typeOfSlice";

const format = new GeoJSON({ featureProjection: "EPSG:3857" });

type IProps = {
  use: boolean;
  setUse: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppMap: React.FC = () => {
  const arrPoint: Number[] = [];

  const polygonFeatures: Feature[] = [];

  const [loading, setLoading] = useState(false);
  const [isDeleteGeometry, setIsDeletGeometry] = useState(false);

  let map = new Map();

  const extent: any = get("EPSG:3857")!.getExtent().slice();
  extent[0] += extent[0];
  extent[2] += extent[2];

  const source = new Vectors();

  const vector = new Vector({
    source: source,
    style: styleLineString,
  });
  let mapSource = new Vectors();

  function vectorLoader() {
    axios
      .get("http://localhost:5000/features")
      .then((res) => {
        console.log(25142, res.data);
        const features = format.readFeatures(res.data);
        mapSource.addFeatures(features);
      })
      .catch((error) => console.log(error));
  }

  let overlay: Overlay | null = null;

  let vectorLayer = new Vector();

  // const queryRefrechLayer = () => {
  //   useQuery("refrechLayer", refreachLayer, {
  //     enabled: false,
  //   });
  // };
  let eventSource = new Vectors();

  useEffect(() => {
    map = new Map({
      target: "map-container",
      view: new View({
        center: fromLonLat([34.84517762144668, 32.167921158434325]),
        zoom: 16,
        extent,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vector,
        vectorUse,
      ],
    });

    const tooltip: HTMLElement | null = document.getElementById("tooltip");
    const positioning = "bottom-left";

    overlay = new Overlay({
      element: tooltip!,
      offset: [10, 0],
      positioning: positioning,
    });



    map.on("click", function (event: any) {
      let point = map!.getCoordinateFromPixel(event.pixel);
      let lonLat = toLonLat(point);
      arrPoint.push(lonLat[0]);
      arrPoint.push(lonLat[1]);
      console.log(arrPoint[0], 0);
      console.log(arrPoint[1], 1);
      console.log(arrPoint[arrPoint.length - 2], 3);
      console.log(arrPoint[arrPoint.length - 1], 4);
    });

    map!.addOverlay(overlay);

    const fullscreen = new FullScreen();
    map!.addControl(fullscreen);

    function displayTooltip(evt: any) {
      const pixel = evt.pixel;

      const feature = map!.forEachFeatureAtPixel(
        pixel,
        function (feature: any) {
          return feature;
        }
      );
      tooltip!.style.display = feature ? "" : "none";

      if (feature) {
        if (feature.get("name") != undefined) {
          overlay!.setPosition(evt.coordinate);

          tooltip!.innerHTML = feature.get("name");
        } else {
          tooltip!.style.display = "none";
        }
      }
    }

    map.on("pointermove", displayTooltip);
    map.addInteraction(modify);

    console.log(map.getLayers().getArray()[1]);
  }, []);

  let draw: Draw | null = null;
  let snap: Snap | null = null;
  // global so we can remove it later
  function addInteractionUse(e: string) {
    select = new Select({
      layers: [vectorUse],
    });
    map.addInteraction(select);

    if (e !== "None") {
      console.log(e);

      draw = new Draw({
        source: sourceUse,
        type: e as Type,
      });

      map!.removeOverlay(overlay!);
      map.addInteraction(draw);
      snap = new Snap({ source: sourceUse });
      map.addInteraction(snap);
    } else {
      map!.addOverlay(overlay!);
    }
  }

  /**
   * Handle change event.
   */

  const selectTypeValue = (e: string) => {
    map.removeInteraction(draw!);
    map.removeInteraction(snap!);
    addInteractionUse(e);
  };

  const sourceUse = new Vectors({ wrapX: false, features: polygonFeatures });
  let vectorUse = new Vector({
    source: sourceUse,
    style: {
      "fill-color": "rgba(255, 255, 255, 0.2)",
      "stroke-color": "#ffcc33",
      "stroke-width": 2,
      "circle-radius": 7,
      "circle-fill-color": "#ffcc33",
    },
  });

  const modify = new Modify({ source: sourceUse });
  let select = new Select();

  const undoClick = () => {
    const selectedFeatures = select.getFeatures();
    // if (selectedFeatures.getLength() > 0) {
    console.log(121212, selectedFeatures);
    // }
    console.log(map.getLayers().getArray()[2]);
    console.log(map, "map");
    console.log(draw, "draw");
    map.removeInteraction(draw!);
    map!.addOverlay(overlay!);
    console.log(map, "map");
    console.log(map, "draw");
  };

  let featureIndex = new Vector({
    source: eventSource,
    style: styleFunction,
  });

  let featureOfIndex: Feature[] | null = null;

  const removEvent = () => {
    map!.removeLayer(featureIndex);
    return;
  };

  const playEvent = async (index: number, data: Features) => {
    if (index == null) {
      map!.removeLayer(featureIndex);
      return;
    }
    map!.removeLayer(featureIndex);
    eventSource.clear();

    featureOfIndex = format.readFeatures(data);
    eventSource.addFeatures(featureOfIndex);

    if (index > 0) {
      map!.addLayer(featureIndex);
    }
  };
  let selectedFeatures = select.getFeatures();

  const deletePolygon = () => {
    selectedFeatures = select.getFeatures();
    if (selectedFeatures.getLength() > 0) {
      console.log(121212, selectedFeatures);

      const selectedFeature = selectedFeatures.item(0);
      sourceUse.removeFeature(selectedFeature);
      polygonFeatures.splice(polygonFeatures.indexOf(selectedFeature), 1);
    }
  };

  return (
    <div className="map">
      <div
        style={{ height: "77vh", width: "100%" }}
        id="map-container"
        className="map-container"
      />

      <div id="tooltip" className="tooltip"></div>

      <div className="navButton">
        <Stack direction="row" justifyContent={"center"} spacing={2}>
          <SelectInteraction
            selectTypeValue={selectTypeValue}
            undoClick={undoClick}
            deletePolygon={deletePolygon}
          />

          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
              onClick={() => {
                const layers = map!.getLayers().getArray();
                if (layers.includes(vectorLayer)) {
                  console.log(layers, 25);
                  map!.removeLayer(vectorLayer);
                } else {
                  setLoading(true);

                  mapSource = new Vectors({
                    format: new GeoJSON(),
                    // url:"http://localhost:9000/geojson"
                    loader: vectorLoader!,
                  });
                  vectorLayer = new Vector({
                    source: mapSource,
                    style: styleFunction,
                  });
                  map!.addLayer(vectorLayer);
                  setLoading(false);
                }
              }}
            >
              הצג/מחק אתרים
            </Button>
          )}
        
          <div dir="rtl">
            <ButtonSelectEvent playEvent={playEvent} removEvent={removEvent} />
          </div>
        </Stack>
      </div>
    </div>
  );
};
export default AppMap;
