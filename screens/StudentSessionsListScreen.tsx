import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { API } from '../api';
import { StudentSessionTimeslot } from '../api/studentSessions';
import { EventList } from '../components/studentSessionList/StudentSessionList';
import { EventStackParamlist } from '../navigation/BottomTabNavigator';
import { UpcomingButton } from '../components/studentSessionList/UpcomingButton';

type EventsNavigation = {
  navigation: StackNavigationProp<
    EventStackParamlist,
    'EventListScreen'
  >;
};

export default function CompaniesScreen({navigation}: EventsNavigation) {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [studentSessionTimeslots, setTimeslots] = React.useState<StudentSessionTimeslot[] | null>(null);
  
  const getTimeslots = async () => {
    setLoading(true);
    const studentSessionTimeslots = await API.studenSessions.getAllTimeslots();
    setTimeslots(studentSessionTimeslots);
    setLoading(false);
  }

  const openEventDetails = (id: number) => {
    navigation.navigate('EventDetailsScreen', { id });
  }
  
  React.useEffect(() => {
    getTimeslots();
  }, []);
    
  return (
    <View style={styles.container}>
      {isLoading 
        ? <Text>Loading...</Text>
        : <View style={styles.container}>
            <EventList 
              timeslots={studentSessionTimeslots}
              onPress={openEventDetails} />
          </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
});
