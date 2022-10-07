import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import { API } from '../../api'
import { SSsStackParamlist } from '../../navigation/BottomTabNavigator';

import ScreenActivityIndicator from '../../components/ScreenActivityIndicator';
import { View } from '../../components/Themed';
import { Student } from '../../api/students';
import StudentProfile from '../../components/profileScreen/StudentProfile';
import Colors from '../../constants/Colors';
import { SSApplication, UpdateApplicationDto } from '../../api/sSApplications';
import { ArkadButton } from '../../components/Buttons';
import { ArkadText } from '../../components/StyledText';
import UserProfile from '../../components/profileScreen/UserProfile';
import { User } from '../../api/users';

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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function getUser() {
    //TODO this should get the student user and not the company user when its implemented in the backend
    const user = await API.users.getMe();
    setUser(user);
  }
  async function getStudent() {
    const sdnt = await API.students.getStudent(application.studentId);
    setStudent(sdnt);
  }
  async function getApplication() {
    const app = await API.sSApplications.getApplication(route.params.application.id);
    setApplication(app);
  }
  async function accept() {
    setLoading(true);
    await API.sSApplications.changeApplication(application.id, {status: 1} as UpdateApplicationDto)
    await getApplication();
    setLoading(false);
  }
  async function reject() {
    setLoading(true);
    await API.sSApplications.changeApplication(application.id, {status: 2} as UpdateApplicationDto)
    await getApplication();
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getApplication();
    getStudent();
    getUser();
    setLoading(false);
  }, []);
  
  if (loading || !student || !user) {
    return (
      <View style={styles.container}>
        <ScreenActivityIndicator />
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container}>
      <UserProfile user={user as NonNullable<User>} />
      <StudentProfile student={student as NonNullable<Student>} />
      <ArkadText text={application.status === 1 ? "Accepted!" : "Not accepted"} style={styles.acceptedText}/>
      {application.status !== 1 &&
      <>
        <ArkadButton style={styles.accepted} onPress={ accept }>
          <ArkadText text={'Accept application'}/>
        </ArkadButton>
        {application.status !== 2 &&
        <ArkadButton style={styles.notAccepted} onPress={ reject }>
          <ArkadText text={'Reject Application '}/>
        </ArkadButton>
        }
      </>
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  accepted: {
    backgroundColor: Colors.lightGreen,
  },
  notAccepted: {
    backgroundColor: Colors.darkRed,
  },
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
