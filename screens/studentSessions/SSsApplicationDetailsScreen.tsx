import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import { API } from '../../api'
import { Company } from '../../api/companies';
import { ProfileStackParamList, SSsStackParamlist } from '../../navigation/BottomTabNavigator';

import ScreenActivityIndicator from '../../components/ScreenActivityIndicator';
import { View } from '../../components/Themed';
import { Guild, Student } from '../../api/students';
import StudentProfile from '../../components/profileScreen/StudentProfile';
import Colors from '../../constants/Colors';
import { getApplication, SSApplication, UpdateApplicationDto } from '../../api/sSApplications';
import { ArkadButton } from '../../components/Buttons';
import { ArkadText } from '../../components/StyledText';
import { getActionFromState } from '@react-navigation/native';

export type SSsApplicationDetailsScreenParams = {
  navigation: StackNavigationProp<SSsStackParamlist, 'SSsApplicationDetailsScreen'>
  route: {
    params: {
      application: SSApplication;
    };
  };
};


export default function SSsApplicationDetailsScreen({ navigation, route}: SSsApplicationDetailsScreenParams) {
  const [application, setApplication] = useState<SSApplication>(route.params.application);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function getStudent() {
    const sdnt = await API.students.getStudent(application.studentId);
    setStudent(sdnt);
  }
  async function getApplication() {
    const app = await API.sSApplications.getApplication(application.id);
    setApplication(app);
  }
  async function accept() {
    API.sSApplications.changeApplication(application.id, {status: 1} as UpdateApplicationDto)
    setLoading(true);
    const app = await API.sSApplications.getApplication(application.id);
    setApplication(app);
    setLoading(false);
  }
  async function reject() {
    API.sSApplications.changeApplication(application.id, {status: 0} as UpdateApplicationDto)
    setLoading(true);
    const app = await API.sSApplications.getApplication(application.id);
    setApplication(application);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getStudent();
    getApplication();
    setLoading(false);
  }, []);
  
  if (loading || !student) {
    return (
      <View style={styles.container}>
        <ScreenActivityIndicator />
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container}>
      <StudentProfile student={student as NonNullable<Student>} />
      <ArkadText text={application.status ? "Accepted!" : "Not accepted"} style={styles.acceptedText}/>
      <ArkadButton onPress={application.status ? reject : accept }>
        <ArkadText text={application.status ? 'Reject Application ' : 'Accept application'}/>
      </ArkadButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  acceptedText:{
    color: Colors.darkBlue,
  },
  container: {
    display: 'flex',
    paddingVertical: 24,
    backgroundColor: Colors.white,
  },
  header: {
    paddingTop: '10%',
    paddingLeft: '4%',
    width: '100%',
    textAlign: 'left',
    fontSize: 20,
    color: Colors.darkBlue,
  },
  eventList: {
    paddingTop: '2%',
    alignItems: 'center',
    width: '100%',
  },
});
