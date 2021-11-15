export interface Map {
  name: string
  props: any
}

const folderPath = 'nexpo-app/assets/images/maps2/';

export const FairMap: Map = {
  name: 'Fair', 
  props: {
    source: folderPath + "https://ibb.co/mDtRWxf",
  }
}
export const KarhusetMap: Map = {
  name: 'Kårhuset', 
  props: {
    source: folderPath + "Karhuset.png"
  }
}
export const EMap: Map = {
  name: 'E-huset', 
  props: {
    source: folderPath + "E-huset.png"
  }
}
export const SC1Map: Map = {
  name: 'Studiecentrum first floor', 
  props: {
    source: folderPath + "Sc-1.png"
  }
}
export const SC2Map: Map = {
  name: 'Studiecentrum first floor', 
  props: {
    source: folderPath + "Sc-2.png"
  }
}