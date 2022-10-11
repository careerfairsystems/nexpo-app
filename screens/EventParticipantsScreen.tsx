import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { API } from '../api';
import SSCompInfo from '../components/studentSessionList/SSCompInfo';
import { EventStackParamlist } from '../navigation/EventsNavigator';
import { PublicCompanyDto } from '../api/companies/Companies';
import { ScrollView } from 'react-native-gesture-handler';
import { getMe, Role, User } from '../api/users/Users';
import ScreenActivityIndicator from '../components/ScreenActivityIndicator';
import { ScanQRButton } from '../components/profileScreen/Buttons';
import { getAllTicketsForEvent, Ticket } from '../api/tickets/Tickets';
import { getEvent } from '../api/events/Events';


type EventNavigation = {
  navigation: StackNavigationProp<
    EventStackParamlist,
    'EventParticipantsScreen'
  >;
  route: {
    params: {
      eventId: number;
    };
  };
};

export default function EventParticipantsScreen({navigation, route}: EventNavigation) {
  const eventId = route.params.eventId;
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [company, setCompany] = React.useState< PublicCompanyDto | null>(null);
  const [user, setUser] = React.useState< User | null>(null);
  const [tickets, setTickets] = React.useState< Ticket[] | null>(null);
  const [event, setEvent] = React.useState< Event | null>(null);
  
  const getUser = async () => {
    const user = await getMe();
    setUser(user);
    setCompany(company);
  }

  const getTickets = async () => {
    const tickets = await getAllTicketsForEvent(eventId);
    setTickets(tickets);
    setLoading(false);
  }


  React.useEffect(() => {
    setLoading(true);
    getUser();
    getTickets();
    setLoading(false);
  }, []);

  if (isLoading || company == null || user == null) {
    return(
      <View style={styles.container}>
        <ScreenActivityIndicator />
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <SSCompInfo company={company}/>
        {<ScanQRButton onPress={() => navigation.navigate('QRScreen')} />}
        <View style={styles.container}>
            
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  button: {
    width: '60%',
    alignSelf: 'center',
  },
});
