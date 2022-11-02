import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import { API } from '@/api'
import { SSsStackParamlist } from "./SSsCRepNavigator"
import ScreenActivityIndicator from '@/components/ScreenActivityIndicator';
import { Student } from '@/api/students';
import Colors from '@/constants/Colors';
import { SSApplication, UpdateApplicationDto } from '@/api/Applications';
import { ArkadButton } from '@/components/Buttons';
import { ArkadText, NoButton } from '@/components/StyledText';
import { User } from '@/api/users';
import { View } from '@/components/Themed';
import SSsStudentInfo from '@/components/studentSessionList/SSsStudentInfo';

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
    return <ScreenActivityIndicator />
  }

  
  
  
  return (
    <ScrollView style={styles.container}>
      <SSsStudentInfo studentId={student.id} />
      <View style={styles.buttons}>
      { application.status === 1 && <NoButton text={ "Accepted!" } style={styles.acceptedText}/>}
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
      </View>
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
  buttons: {
    paddingBottom: 30,
    width: '80%',
    justifyContent:'center',
    alignSelf: 'center',
  },
  acceptedText:{
    alignSelf: 'center',
    marginBottom: 20,
    width: '50%',
    backgroundColor: Colors.darkBlue,
    borderRadius: 5,
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
    fontSize: 24,
    color: Colors.darkBlue,
  },
  eventList: {
    paddingTop: '2%',
    alignItems: 'center',
    width: '100%',
  },
});
