
export type Appearance = {
    division:string
    force_type:string;
    ock:string;
    reality:string;
    unit:string;
  }
  export type PointTuple = [number, number];
 
  export type PointExpression = PointTuple;

  
  
  
  export type Icon = {
    iconAnchor: PointExpression | undefined;
    iconSize?: PointExpression | undefined;
    iconUrl: string;
    popupAnchor: Array<string>;
  }
  
  export type Popup = {
    battery_status:string
    coordinates:string;
    location_name:string;
  }
  
  
  
  
  export type DataApi = {
    appearance: Appearance;
    coordinateId:string;

    icon:Icon;
    marker_data:string;
    popup:Popup;
  
  }
  export type SearchArgument = {
    query: string;
  }