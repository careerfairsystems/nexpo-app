import { StackNavigationProp } from "@react-navigation/stack";
import { SSsStackParamlist } from "./SSsCRepNavigator";
import SSsApplicationsListScreen from "./templates/SSsApplicationsListScreen";
import SSsApplicationScreen from "./templates/SSsApplicationSreen";
import SSsDetailsScreen from "./templates/SSsDetailsScreen";

type SSsSwitchScreenParams = {
  navigation: StackNavigationProp<SSsStackParamlist, "SSsSwitchScreen">;
  route: {
    params: {
      id: number;
      screen: string;
    };
  };
};

export default function SSsSwitchScreen({ navigation, route }: SSsSwitchScreenParams) {
  const { id, screen } = route.params;
  switch (screen) {
    case "applicationList": {
      return SSsApplicationsListScreen(navigation);
    }
    case "application": {
      return <SSsApplicationScreen companyId={id} />;
    }
    default: {
      return <SSsDetailsScreen timeslotId={id} />;
    }
  }
}
