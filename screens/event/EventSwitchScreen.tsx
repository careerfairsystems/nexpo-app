import { StackNavigationProp } from "@react-navigation/stack";
import { EventStackParamlist } from "./EventsNavigator";
import EventDetailsScreen from "./templates/EventDetailsScreen";
import EventParticipantsScreen from "./templates/EventParticipantsScreen";

type ProfileSwitchScreenParams = {
  navigation: StackNavigationProp<EventStackParamlist, "EventSwitchScreen">;
  route: {
    params: {
      id: number;
      screen: string;
    };
  };
};

export default function EventSwitchScreen({ navigation, route }: ProfileSwitchScreenParams) {
  const { id, screen } = route.params;
  switch (screen) {
    case "participatians": {
      return EventParticipantsScreen(navigation, id);
    }
    default: {
      return EventDetailsScreen(id);
    }
  }
}
