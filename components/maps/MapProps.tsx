export interface Map {
  name: string;
  props: any;
}

export const FairMap: Map = {
  name: "Fair",
  props: {
    images: [
      {
        url: "",
        props: {
          source: require("../../assets/images/maps/overview.png"),
        },
      },
    ],
  },
};
export const KarhusetMap: Map = {
  name: "Kårhuset",
  props: {
    images: [
      {
        url: "",
        props: {
          source: require("../../assets/images/maps/union1.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../assets/images/maps/union2.png"),
        },
      },
    ],
  },
};
export const EMap: Map = {
  name: "E-huset",
  props: {
    images: [
      {
        url: "",
        props: {
          source: require("../../assets/images/maps/e.png"),
        },
      },
    ],
  },
};
export const SCMap: Map = {
  name: "Studiecentrum first floor",
  props: {
    images: [
      {
        url: "",
        props: {
          source: require("../../assets/images/maps/sc1.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../assets/images/maps/sc2.png"),
        },
      },
    ],
  },
};
export const TentMap: Map = {
  name: "Tent",
  props: {
    images: [
      {
        url: "",
        props: {
          source: require("../../assets/images/maps/sc1.png"),
        },
      },
      {
        url: "",
        props: {
          source: require("../../assets/images/maps/sc2.png"),
        },
      },
    ],
  },
};
