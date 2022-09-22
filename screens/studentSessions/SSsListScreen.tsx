import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { API } from '../../api';
import { SSTimeslot } from '../../api/studentsessions';
import { TimeslotList } from '../../components/studentSessionList/SSList';
import { SSsStackParamlist } from '../../navigation/BottomTabNavigator';

type SSsNavigation = {
  navigation: StackNavigationProp<
    SSsStackParamlist,
    'SSsListScreen'
  >;
  route: {
    params: {
      companyId: number;
      timeslotId: number;
    };
  };
};

export default function SSsListScreen({navigation, route}: SSsNavigation) {
  const companyId = route.params.companyId;
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [ssTimeslots, setTimeslots] = React.useState<SSTimeslot[] | null>(null);
  
  const getTimeslots = async () => {
    setLoading(true);
    //const ssTimeslots = await API.studenSessions.getAllTimeslots(); 
    const ssTimeslots = await API.studenSessions.getTimeslotsByCompanyId(companyId);
    setTimeslots(ssTimeslots);
    setLoading(false);
  }

  const openSSDetails = (timeslotId: number) => {
    navigation.navigate('SSsDetailsScreen',{companyId , timeslotId});
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
              timeslots={ssTimeslots}
              onPress={openSSDetails} />
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
