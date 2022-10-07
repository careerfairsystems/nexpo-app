import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { API } from '../../api';
import { ApplicationsList } from '../../components/sSApplication/SSApplicationList';
import { SSsStackParamlist } from '../../navigation/BottomTabNavigator';
import { ScrollView } from 'react-native-gesture-handler';
import ScreenActivityIndicator from '../../components/ScreenActivityIndicator';
import { SSApplication } from '../../api/sSApplications';

type SSsNavigation = {
    navigation: StackNavigationProp<
      SSsStackParamlist,
      'SSsApplicationsListScreen'
    >;
    route: {
      params: {
        companyId: number;
        companyName: string;
      };
    };
};



export default function SSsApplicationsListScreen({navigation, route}: SSsNavigation) {
  const companyId = route.params.companyId
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

  const openApplicationDetails = (application: SSApplication) => {
        navigation.navigate('SSsApplicationDetailsScreen', {application});
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
