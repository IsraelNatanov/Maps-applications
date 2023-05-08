// import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField/TextField";
import axios from "axios";
import { Feature } from "ol";
import React, { useState } from "react";
import { Features } from "../store/features/typeOfSlice";
import { useAppSelector } from "../store/hooks";
import createCache from "@emotion/cache";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import './maps.css'
// const [dataFullFeatures, setDataFullFeatures] =  React.useState([]);

interface Iprops {
  playEvent: (index: number, data: Features) => void;
  removEvent: () => void;
}
export default function ButtonSelectEvent(props: Iprops) {
  const featuresOfStore = useAppSelector((state) => state.feature.features);
  console.log(featuresOfStore);

  const theme = createTheme({
    direction: "rtl", // Both here and <body dir="rtl">
  });
  // Create rtl cache
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <div dir="rtl" className="text-alin">
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Autocomplete 
      id="google-map-demo"
          disablePortal
    
          options={featuresOfStore}

          sx={{ width: 200, backgroundColor: "#1976d2", color: "white" }}
          onChange={async (event, value) => {
            if (value == null) {
              props.removEvent();
            } else {
              const data = featuresOfStore[value.id - 1];
              props.playEvent(value.id, data);
            }
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder="בחר אירוע" color="primary"   InputProps={{
                ...params.InputProps,
                style: { color: 'white' },
              }}/>
            
          )}
        />
      </ThemeProvider>
    </CacheProvider>
    </div>
  );
}
