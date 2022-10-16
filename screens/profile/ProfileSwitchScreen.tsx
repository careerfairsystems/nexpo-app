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

export default function ProfileSwitchScreen({ navigation, route }: ProfileSwitchScreenParams) {
  const { screen } = route.params;
  switch (screen) {
    case 'tickets':{ return (TicketScreen(navigation)); }
    default: { return (EditProfileScreen(navigation)); }
  }
}
