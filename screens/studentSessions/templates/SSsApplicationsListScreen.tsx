import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from 'components/Themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { API } from "api/API";
import { ApplicationsList } from 'components/sSApplication/SSApplicationList';
import { SSsStackParamlist } from "../SSsCRepNavigator";
import ScreenActivityIndicator from 'components/ScreenActivityIndicator';
import { SSApplicationDto } from 'api/Applications';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { ArkadText } from 'components/StyledText';
import Colors from 'constants/Colors';

export default function SSsApplicationsListScreen(navigation: StackNavigationProp<SSsStackParamlist,'SSsSwitchScreen'>) {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [applications, setApplications] = React.useState<SSApplicationDto[] | null>(null);
  
  const getApplications = async () => {
    setLoading(true);
    const applications = await API.applications.getApplications();
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
      <View style={styles.statsContainer}>
        <ArkadText  style={{...styles.statsText, color: Colors.darkYellow}} text={`${applications?.filter((application) => application.status === 0).length}`}/>
        <ArkadText  style={{...styles.statsText, color: Colors.darkBlue}} text={`/`}/>
        <ArkadText  style={{...styles.statsText, color: Colors.lightGreen}} text={`${applications?.filter((application) => application.status === 1).length}`}/>
        <ArkadText  style={{...styles.statsText, color: Colors.darkBlue}} text={`/`}/>
        <ArkadText  style={{...styles.statsText, color: Colors.darkRed}} text={`${applications?.filter((application) => application.status === 2).length}`}/>
      </View>
      <ApplicationsList
        applications={applications}
        onPress={openApplicationDetails}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  statsText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    width: '60%',
    alignSelf: 'center',
  },
});
