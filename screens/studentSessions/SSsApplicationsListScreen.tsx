import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { API } from '../../api';
import { ApplicationsList } from '../../components/sSApplication/SSApplicationList';
import { SSsStackParamlist } from "../../navigation/SSsStudentNavigator";
import { ScrollView } from 'react-native-gesture-handler';
import ScreenActivityIndicator from '../../components/ScreenActivityIndicator';
import { SSApplication, SSApplicationDto } from '../../api/sSApplications';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

type SSsNavigation = {
    navigation: StackNavigationProp<
      SSsStackParamlist,
      'SSsApplicationsListScreen'
    >;
};



export default function SSsApplicationsListScreen({navigation}: SSsNavigation) {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [applications, setApplications] = React.useState<SSApplicationDto[] | null>(null);
  
  const getApplications = async () => {
    setLoading(true);
    const applications = await API.sSApplications.getApplications();
    setApplications(applications);
    setLoading(false);
  }

  useFocusEffect(useCallback(() => {
    getApplications();
  }, []));

  const openApplicationDetails = (application: SSApplicationDto) => {
    const applicationId = application.id;
    navigation.navigate('SSsApplicationDetailsScreen', {applicationId});
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
