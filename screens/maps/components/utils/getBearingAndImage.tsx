export const getImageAndBearing = (placeName: string | undefined, floorNbr: number) => {
  switch (placeName) {
    case 'E-huset':
      return { image: require("assets/images/Buildings/E0.png"), bearing: 0 };
    case 'Kårhuset':
      return floorNbr === 1
        ? { image: require("assets/images/Buildings/K2.png"), bearing: 0 }
        : { image: require("assets/images/Buildings/K1.png"), bearing: 0 };
    case 'Studiecentrum, LTH':
      return floorNbr === 1
        ? { image: require("assets/images/Buildings/SC2.png"), bearing: 0 }
        : { image: require("assets/images/Buildings/SC1.png"), bearing: 0 };
    case "X-Lab":
      return { image: require("assets/images/Buildings/X1.png"), bearing: 0 };
    default:
      return { image: null, bearing: 0 };
  }
};