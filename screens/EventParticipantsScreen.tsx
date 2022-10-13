import * as React from 'react';
import { StyleSheet } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { View } from '../components/Themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { EventStackParamlist } from '../navigation/EventsNavigator';
import { ScrollView } from 'react-native-gesture-handler';
import ScreenActivityIndicator from '../components/ScreenActivityIndicator';
import { ScanQRButton } from '../components/profileScreen/Buttons';
import { useCallback } from 'react';
import { TicketDto } from '../api/tickets';
import { API } from '../api';
import { StudentTicketList } from '../components/ticketList/studentTicketList';


type EventNavigation = {
  navigation: StackNavigationProp<
    EventStackParamlist,
    'EventParticipantsScreen'
  >;
  route: {
    params: {
      id: number;
    };
  };
};

export default function EventParticipantsScreen({navigation, route}: EventNavigation) {
  const { id } = route.params;
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [tickets, setTickets] = React.useState<TicketDto[] | null>(null);
  
  const getTickets = async () => {
    const tkts = await API.tickets.getAllTicketsForEvent(id);
    setTickets(tkts);
  }

  useFocusEffect(useCallback(() => {
    setLoading(true);
    getTickets();
    setLoading(false);
  }, []));

  if (isLoading || tickets == null) {
    return(
      <View style={styles.container}>
        <ScreenActivityIndicator />
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <ScanQRButton onPress={() => navigation.navigate('QRScreen', {id}) }/>
        <StudentTicketList tickets={tickets} />
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
