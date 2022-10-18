import { StackNavigationProp } from "@react-navigation/stack";
import EventDetailsScreen from "../event/templates/EventDetailsScreen";
import { ProfileStackParamList } from "./ProfileNavigator";
import EditProfileScreen from "./templates/EditProfileScreen";


type ProfileSwitchScreenParams = {
  navigation: StackNavigationProp<
      ProfileStackParamList,
      'ProfileSwitchScreen'
    >;
  route: {
    params: {
      screen: string;
      id: number;
    };
  };
};

export default function ProfileSwitchScreen({ navigation, route }: ProfileSwitchScreenParams) {
  const { screen, id } = route.params;
  switch (screen) {
    case 'details':{ return (EventDetailsScreen(id)); }
    default: { return (EditProfileScreen(navigation)); }
  }
}
