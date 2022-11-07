export interface Map {
  name: string
  props: any
}

export const FairMap: Map = {
  name: 'Fair', 
  props: {
    images: [{
      url: '',
      props: {
        source: require("../../assets/images/maps/oversikt.png")
      }
    }]
  }
}
export const KarhusetMap: Map = {
  name: 'Kårhuset', 
  props: {
    images: [{
      url: '',
      props: {
        source: require("../../assets/images/maps/Karhuset.png")
      }
    }]
  }
}
export const EMap: Map = {
  name: 'E-huset', 
  props: {
    images: [{
      url: '',
      props: {
        source: require("../../assets/images/maps/E-huset.png")
      }
    }]
  }
}
export const SC1Map: Map = {
  name: 'Studiecentrum first floor', 
  props: {
    images: [{
      url: '',
      props: {
        source: require("../../assets/images/maps/Sc-1.png")
      }
    }]
  }
}
export const SC2Map: Map = {
  name: 'Studiecentrum second floor', 
  props: {
    images: [{
      url: '',
      props: {
        source: require("../../assets/images/maps/Sc-2.png")
      }
    }]
  }
}