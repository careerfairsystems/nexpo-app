import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { API } from '../../api';
import { SSTimeslot } from '../../api/studentsessions';
import { TimeslotList } from '../../components/studentSessionList/SSList';
import { SSsStackParamlist } from '../../navigation/BottomTabNavigator';
import { ArkadButton } from '../../components/Buttons';
import { ArkadText } from '../../components/StyledText';

type SSsNavigation = {
  navigation: StackNavigationProp<
    SSsStackParamlist,
    'SSsListScreen'
  >;
  route: {
    params: {
      companyId: number;
      companyName: string;
      timeslotId: number;
    };
  };
};

export default function SSsListScreen({navigation, route}: SSsNavigation) {
  const companyId = route.params.companyId;
  const companyName = route.params.companyName;
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [ssTimeslots, setTimeslots] = React.useState<SSTimeslot[] | null>(null);
  
  const getTimeslots = async () => {
    setLoading(true);
    //const ssTimeslots = await API.studentSessions.getAllTimeslots(); 
    const ssTimeslots = await API.studentSessions.getTimeslotsByCompanyId(companyId);
    setTimeslots(ssTimeslots);
    setLoading(false);
  }

  const openSSDetails = (timeslotId: number) => {
    navigation.navigate('SSsDetailsScreen',{companyId , companyName, timeslotId});
  }

  const openSSsApplicaion = () => {
    navigation.navigate('SSsApplicationScreen',{companyId , companyName});
  }

  
  React.useEffect(() => {
    getTimeslots();
  }, []);
    
  return (
    <View style={styles.container}>
      <ArkadButton onPress={() => openSSsApplicaion()}>
        <ArkadText text = "Apply for a session" />
      </ArkadButton>
      <View>
        {isLoading 
          ? <Text>Loading...</Text>
          : <View style={styles.container}>
              <TimeslotList 
                timeslots={ssTimeslots}
                onPress={openSSDetails} />
            </View>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
});
