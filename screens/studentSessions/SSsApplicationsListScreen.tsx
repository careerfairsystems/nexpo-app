import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { API } from '../../api';
import { SSTimeslot } from '../../api/studentsessions';
import { TimeslotList } from '../../components/studentSessionList/SSList';
import { ApplicationsList } from '../../components/sSApplicationList/SSApplicationList';
import { SSsStackParamlist } from '../../navigation/BottomTabNavigator';
import { ArkadButton } from '../../components/Buttons';
import { ArkadText } from '../../components/StyledText';
import { PublicCompanyDto } from '../../api/companies/Companies';
import { ScrollView } from 'react-native-gesture-handler';
import { getMe, User } from '../../api/users/Users';
import { sendApplication } from '../../api/studentsessions';
import ScreenActivityIndicator from '../../components/ScreenActivityIndicator';
import { SSApplication } from '../../api/sSApplications';

type SSsNavigation = {
    navigation: StackNavigationProp<
      SSsStackParamlist,
      'SSsApplicationsListScreen'
    >;
};



export default function SSsApplicationsListScreen({navigation}: SSsNavigation) {
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [applications, setApplications] = React.useState<SSApplication[] | null>(null);
    
    const getApplications = async () => {
      setLoading(true);
      const applications = await API.sSApplications.getApplications();
      setApplications(applications);
      setLoading(false);
    }
  
    React.useEffect(() => {
      getApplications();
    }, []);

    const openApplicationDetails = () => {
          //navigation.navigate('SSsApplicationDetailsScreen');
    }

    if(isLoading){
        return <ScreenActivityIndicator/>
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <ApplicationsList
            applications={applications}
            onPress={openApplicationDetails}
          />
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
