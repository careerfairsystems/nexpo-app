import { StackNavigationProp } from "@react-navigation/stack";
import { SSsStackParamlist } from "../../navigation/SSsCRepNavigator";
import SSsApplicationsListScreen from "../../screenTemplates/SSsApplicationsListScreen";
import SSsApplicationScreen from "../../screenTemplates/SSsApplicationSreen";
import SSsDetailsScreen from "../../screenTemplates/SSsDetailsScreen";

type SSsSwitchScreenParams = {
  navigation: StackNavigationProp<
      SSsStackParamlist,
      'SSsSwitchScreen'
    >;
  route: {
    params: {
      id: number;
      screen: string;
    };
  };
};

export default function SSsSwitchScreen({ navigation, route }: SSsSwitchScreenParams) {
  const {id, screen} = route.params;
  switch (screen) {
    case 'applicationList':{ return (SSsApplicationsListScreen(navigation)); }
    case 'application':{ return (SSsApplicationScreen(id));}
    default: { return (SSsDetailsScreen(id)); }
  }
}
