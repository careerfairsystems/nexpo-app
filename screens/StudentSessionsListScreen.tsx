import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { API } from '../api';
import { StudentSessionTimeslot } from '../api/studentSessions';
import { TimeslotList } from '../components/studentSessionList/StudentSessionList';
import { StudentSessionsStackParamlist } from '../navigation/BottomTabNavigator';

type StudentSessionsNavigation = {
  navigation: StackNavigationProp<
    StudentSessionsStackParamlist,
    'StudentSessionsListScreen'
  >;
};

export default function StudentSessionsListScreen({navigation}: StudentSessionsNavigation, {id} : {id: number}) {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [studentSessionTimeslots, setTimeslots] = React.useState<StudentSessionTimeslot[] | null>(null);
  
  const getTimeslots = async () => {
    setLoading(true);
    const studentSessionTimeslots = await API.studenSessions.getAllTimeslots(); 
    //const studentSessionTimeslots = await API.studenSessions.getTimeslotsByCompanyId(id); will soon be implemented
    setTimeslots(studentSessionTimeslots);
    setLoading(false);
  }

  const openStudentSessionDetails = (id: number) => {
    navigation.navigate('StudentSessionsDetailsScreen', { id });
  }
  
  React.useEffect(() => {
    getTimeslots();
  }, []);
    
  return (
    <View style={styles.container}>
      {isLoading 
        ? <Text>Loading...</Text>
        : <View style={styles.container}>
            <TimeslotList 
              timeslots={studentSessionTimeslots}
              onPress={openStudentSessionDetails} />
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
