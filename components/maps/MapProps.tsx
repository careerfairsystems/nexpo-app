export interface Map {
  name: string
  props: any
}

const folderPath = '../../assets/images/maps/';

export const FairMap: Map = {
  name: 'Fair', 
  props: {
    images: [{
      url: '',
      props: {
        source: require(folderPath + "oversikt.png")
      }
    },{
      url: '',
      props: {
        source: require(folderPath + "oversikt-list.png")
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
        source: require(folderPath + "Karhuset.png")
      }
    },{
      url: '',
      props: {
        source: require(folderPath + "Karhuset-list.png")
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
        source: require(folderPath + "E-huset.png")
      }
    },{
      url: '',
      props: {
        source: require(folderPath + "E-huset-list.png")
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
        source: require(folderPath + "Sc-1.png")
      }
    },{
      url: '',
      props: {
        source: require(folderPath + "Sc-1-list.png")
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
        source: require(folderPath + "Sc-2.png")
      }
    },{
      url: '',
      props: {
        source: require(folderPath + "Sc-2-list.png")
      }
    }]
  }
}