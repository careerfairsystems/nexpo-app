export interface Map {
  name: string
  props: any
}

export const FairMap: Map = {
  name: 'Fair', 
  props: {source: require("../../assets/images/maps/MapFair.png")}
}
export const KarhusetMap: Map = {
  name: 'Kårhuset', 
  props: {source: require("../../assets/images/maps/MapKarhuset.png")}
}
export const EMap: Map = {
  name: 'E-huset', 
  props: {source: require("../../assets/images/maps/MapE.png")}
}
export const SC1Map: Map = {
  name: 'Studiecentrum first floor', 
  props: {source: require("../../assets/images/maps/MapSC1.png")}
}
export const SC2Map: Map = {
  name: 'Studiecentrum first floor', 
  props: {source: require("../../assets/images/maps/MapSC2.png")}
}