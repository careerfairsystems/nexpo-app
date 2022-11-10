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
        source: require("../../assets/images/maps/overview.png")
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
        source: require("../../assets/images/maps/gasque1.png")
      }
    }, {
      url: '',
      props: {
        source: require("../../assets/images/maps/gasque2.png")
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
        source: require("../../assets/images/maps/e_new.png")
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
        source: require("../../assets/images/maps/sc1_new.png")
      }
    }, {
      url: '',
      props: {
        source: require("../../assets/images/maps/sc2.png")
      }
    }]
  }
}