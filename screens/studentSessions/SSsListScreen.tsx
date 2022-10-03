import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { API } from '../../api';
import { SSTimeslot } from '../../api/studentsessions';
import { TimeslotList } from '../../components/studentSessionList/SSList';
import SSCompInfo from '../../components/studentSessionList/SSCompInfo';
import { SSsStackParamlist } from '../../navigation/BottomTabNavigator';
import { ArkadButton } from '../../components/Buttons';
import { ArkadText } from '../../components/StyledText';
import { PublicCompanyDto } from '../../api/companies/Companies';
import { ScrollView } from 'react-native-gesture-handler';

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
  const [company, setCompany] = React.useState< PublicCompanyDto | null>(null);

  const getTimeslotsAndCompany = async () => {
    setLoading(true);
    const ssTimeslots = await API.studentSessions.getTimeslotsByCompanyId(companyId);
    const company = await API.companies.getCompany(companyId);
    setCompany(company)
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
    getTimeslotsAndCompany();
  }, []);
    
  return (
    <View style={styles.container}>
      <ScrollView>
        {company == null ? <Text>Loading...</Text> : <SSCompInfo company={company}/>}
        <ArkadButton style={styles.button} onPress={() => openSSsApplicaion()}>
          <ArkadText text = "Apply for a session!" />
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
      </ScrollView>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    width: '60%',
    alignSelf: 'center',
  },
});
