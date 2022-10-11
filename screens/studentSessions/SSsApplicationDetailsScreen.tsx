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
import { ApplicationsMsg } from '../../components/sSApplication/SSApplicationMsg';

export type SSsApplicationDetailsScreenParams = {
  navigation: StackNavigationProp<SSsStackParamlist, 'SSsApplicationDetailsScreen'>
  route: {
    params: {
      applicationId: number;
    };
  };
};


export default function SSsApplicationDetailsScreen({ navigation, route}: SSsApplicationDetailsScreenParams) {
  const applicationId = route.params.applicationId;
  const [application, setApplication] = useState<SSApplication | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function getAppAndStudent() {
    const app = await API.sSApplications.getApplication(applicationId);
    const sdnt = await API.students.getStudent(app.studentId);
    const user = await API.users.getUser(sdnt.userId);
    setApplication(app);
    setStudent(sdnt);
    setUser(user);
  }
  async function accept() {
    setLoading(true);
    await API.sSApplications.changeApplication(applicationId, {status: 1} as UpdateApplicationDto)
    await getAppAndStudent();
    setLoading(false);
  }
  async function reject() {
    setLoading(true);
    await API.sSApplications.changeApplication(applicationId, {status: 2} as UpdateApplicationDto)
    await getAppAndStudent();
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getAppAndStudent();
    setLoading(false);
  }, []);
  
  if (loading || !student || !user || !application) {
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
      <ApplicationsMsg msg={application.motivation} />
      { application.status === 1 && <ArkadText text={ "Accepted!" } style={styles.acceptedText}/>}
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
    alignSelf: 'center',
    marginBottom: 20,
    fontSize: 16,
    padding: 20,
    borderRadius: 5,
    width: '50%',
    backgroundColor: Colors.lightGreen,
    color: Colors.white,
    fontFamily: 'montserrat',
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
