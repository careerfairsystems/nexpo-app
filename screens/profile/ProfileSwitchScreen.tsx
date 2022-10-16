import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "./ProfileNavigator";
import EditProfileScreen from "./templates/EditProfileScreen";
import TicketScreen from "./templates/TicketsScreen";

type ProfileSwitchScreenParams = {
  navigation: StackNavigationProp<
      ProfileStackParamList,
      'ProfileSwitchScreen'
    >;
  route: {
    params: {
      screen: string;
    };
  };
};

export default function SSsSwitchScreen({ navigation, route }: ProfileSwitchScreenParams) {
  const { screen } = route.params;
  switch (screen) {
    case 'tickets':{ return (EditProfileScreen(navigation)); }
    default: { return (TicketScreen(navigation)); }
  }
}
