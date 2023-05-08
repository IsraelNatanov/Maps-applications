import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { DataApi, PointExpression } from './tips';
import Maps from './maps';
import OpenLy from './component/appMap';
import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query';
import AppMap from './component/appMap';
import { fetchFature } from "./store/features/eventFeaturesSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useDispatch } from 'react-redux';

interface pointAdders{
  pointExpression: PointExpression
}






const App: React.FC = () => {


  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFature());
  });
  const [posAr, setPosAr] = useState([[31.7235293,34.7439036],[31.7233293,34.7437036]]);
  const queryClient = new QueryClient()
  // const featuresOfStore = useAppSelector((state) => state.feature.features);
  // console.log(featuresOfStore);

  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <AppMap/>
      
    </div>
    </QueryClientProvider>
  )
}

export default App
