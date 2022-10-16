import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { API } from '../../api';
import { SSTimeslot } from '../../api/studentsessions';
import { TimeslotList } from '../../components/studentSessionList/SSList';
import SSCompInfo from '../../components/studentSessionList/SSCompInfo';
import { SSsStackParamlist } from "../../navigation/SSsStudentNavigator";
import { ArkadButton } from '../../components/Buttons';
import { ArkadText } from '../../components/StyledText';
import { PublicCompanyDto } from '../../api/companies/Companies';
import { FlatList } from 'react-native-gesture-handler';
import { getMe, Role, User } from '../../api/users/Users';
import ScreenActivityIndicator from '../../components/ScreenActivityIndicator';
import { ApplicationAcceptedDto, SSApplication } from '../../api/sSApplications';
import { Student } from '../../api/students';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

type SSsNavigation = {
  navigation: StackNavigationProp<
    SSsStackParamlist,
    'SSsListScreen'
  >;
  route: {
    params: {
      companyId: number;
    };
  };
};

export default function SSsListScreen({navigation, route}: SSsNavigation) {
  const companyId = route.params.companyId;
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [ssTimeslots, setTimeslots] = React.useState<SSTimeslot[] | null>(null);
  const [company, setCompany] = React.useState< PublicCompanyDto | null>(null);
  const [user, setUser] = React.useState< User | null>(null);
  const [student, setStudent] = React.useState< Student | null>(null);
  const [accepted, setAccepted] = React.useState< ApplicationAcceptedDto | null>(null);

  const getTimeslotsAndCompany = async () => {
    const ssTimeslots = await API.studentSessions.getTimeslotsByCompanyId(companyId);
    const company = await API.companies.getCompany(companyId);
    const user = await getMe();
    const acc = user.role === Role.Student ? await API.sSApplications.getApplicationAccepted(companyId): null;
    const stdnt = user.role === Role.Student ? await API.students.getMe(): null;
    setStudent(stdnt);
    setAccepted(acc);
    setUser(user);
    setCompany(company);
    setTimeslots(ssTimeslots);
  }

  const openSSDetails = (timeslotId: number) => {
    user?.role === Role.CompanyRepresentative || accepted?.accepted ? navigation.navigate('SSsDetailsScreen',{timeslotId}) : 
    alert('You must first send an application and get it accepted to be able to book a time');
  }

  const openSSsApplicaion = () => {
    navigation.navigate(user?.role === Role.Student ? 'SSsApplicationScreen' : 'SSsApplicationsListScreen', {companyId});
  }

  useFocusEffect(useCallback(() => {
    setLoading(true);
    getTimeslotsAndCompany();
    setLoading(false);
  }, []));

  if (isLoading || company == null || user == null) {
    return(
      <View style={styles.container}>
        <ScreenActivityIndicator />
      </View>
    )
  }
  
  return (
    <View style={styles.container}  >
      <FlatList
        data={null} 
        renderItem={null}
        ListHeaderComponent={
          <>
            <SSCompInfo 
              company={company}
            />
            {!accepted?.accepted && <ArkadButton 
              style={styles.button} 
              onPress={ () => openSSsApplicaion()}
            >
              <ArkadText text= {user.role === Role.CompanyRepresentative ? " See applications!" : "Apply here!"}/>
            </ArkadButton>}     
          </>
        } 
        ListFooterComponent={  
          <View style={styles.container}>
            <TimeslotList 
              timeslots={ssTimeslots}
              student={student}              
              onPress={openSSDetails} 
            />
          </View>
        } 
      >
      </FlatList>
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
