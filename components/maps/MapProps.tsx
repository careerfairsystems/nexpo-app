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
          source: 'https://cvfiler.s3.eu-north-1.amazonaws.com/OVERVIEW.png',
          defaultSource: require("../../assets/images/adaptive-icon.png"),
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
          source: 'https://cvfiler.s3.eu-north-1.amazonaws.com/UNION1.png',
          defaultSource: require("../../assets/images/adaptive-icon.png"),
        },
      },
      {
        url: "",
        props: {
          source: 'https://cvfiler.s3.eu-north-1.amazonaws.com/UNION2.png',
          defaultSource: require("../../assets/images/adaptive-icon.png"),
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
          source: 'https://cvfiler.s3.eu-north-1.amazonaws.com/EHUS.png',
          defaultSource: require("../../assets/images/adaptive-icon.png"),
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
          source: 'https://cvfiler.s3.eu-north-1.amazonaws.com/SC1.png',
          defaultSource: require("../../assets/images/adaptive-icon.png"),
        },
      },
      {
        url: "",
        props: {
          source: 'https://cvfiler.s3.eu-north-1.amazonaws.com/SC2.png',
          defaultSource: require("../../assets/images/adaptive-icon.png"),
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
          source: 'https://cvfiler.s3.eu-north-1.amazonaws.com/TENT.png',
          defaultSource: require("../../assets/images/adaptive-icon.png"),
        },
      },
    ],
  },
};
