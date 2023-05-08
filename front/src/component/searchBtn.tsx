import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import createCache from "@emotion/cache";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import { useEffect } from 'react';



const options = ['אירוע 1' , 'אירוע 2', 'אירוע 3', 'אירוע 4', 'אירוע 5','אירוע 6'];
const theme = createTheme({
    direction: 'rtl', // Both here and <body dir="rtl">

  });
  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });
  
  
export default function SearchBtn() {
  const [value, setValue] = React.useState<string | null>(options[0]);
  const [inputValue, setInputValue] = React.useState('');
// useEffect(()=>{
//     if(value != null){
//         console.log(value);
        
//     }

// },[value])

  return (
    <div style={{backgroundColor:"white"}}>
      {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div>
      <br /> */}
        <CacheProvider value={cacheRtl}>
   
   <ThemeProvider theme={theme} >
   <div dir="rtl">
    
  
      <Autocomplete 
      
      
        value={value}
       
        
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
          console.log(newValue);
          
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
     
        sx={{ width: 150 }}
      
        renderInput={(params) => 
        <TextField {...params} label="בחר מספר אירוע" 
    
        />}
      />

</div>
        </ThemeProvider>
       </CacheProvider>
    </div>
  );
}