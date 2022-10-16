import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TextInput } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

import { API } from '../../../api'
import { Role, UpdateUserDto, User } from '../../../api/users';
import { Event } from '../../../api/events';
import { Company, UpdateCompanySelfDto } from '../../../api/companies';
import { ProfileStackParamList } from "../ProfileNavigator";

import ScreenActivityIndicator from '../../../components/ScreenActivityIndicator';
import { Text, View } from '../../../components/Themed';
import { ArkadText } from '../../../components/StyledText';
import { AuthContext } from '../../../components/AuthContext';
import { EditProfileButton, LogoutButton, ScanQRButton, TicketsButton } from '../../../components/profileScreen/Buttons';
import { EmptyEventItem } from '../../../components/profileScreen/EmptyEventItem';
import { BookedEventList } from '../../../components/profileScreen/BookedEventList';
import QRCode from 'react-native-qrcode-svg';
import UserProfile from '../../../components/profileScreen/UserProfile';
import { Student, UpdateStudentDto } from '../../../api/students';
import StudentProfile from '../../../components/profileScreen/StudentProfile';
import CompanyProfile from '../../../components/profileScreen/CompanyProfile';
import EditUserProfile from '../../../components/profileScreen/EditUserProfile';
import { ArkadButton } from '../../../components/Buttons';
import EditStudentProfile from '../../../components/profileScreen/EditStudentProfile';
import EditCompanyProfile from '../../../components/profileScreen/EditCompanyProfile';

export type EditStatus = {
  ok: boolean;
  message: string | null;
};

export default function EditProfileScreen(navigation: StackNavigationProp<ProfileStackParamList, 'ProfileSwitchScreen'>) {
  const [loading, setLoading] = useState<boolean>(false);

  const [user, setUser] = useState<User | null>(null);
  const [updateUserDto, setUpdateUserDto] = useState<UpdateUserDto | null>(null);
  const [userEditStatus, setUserEditStatus] = useState<EditStatus>({ok: true, message: null});

  const [student, setStudent] = useState<Student | null>(null);
  const [updateStudentDto, setUpdateStudentDto] = useState<UpdateStudentDto | null>(null);
  const [studentEditStatus, setStudentEditStatus] = useState<EditStatus>({ok: true, message: null});

  const [company, setCompany] = useState<Company | null>(null);
  const [updateCompanyDto, setUpdateCompanyDto] = useState<UpdateCompanySelfDto | null>(null);
  const [companyEditStatus, setCompanyEditStatus] = useState<EditStatus>({ok: true, message: null});

  async function getUser() {
    setLoading(true);

    const user = await API.users.getMe();
    if(user.role === Role.CompanyRepresentative) {
      const company = await API.companies.getMe();
      setCompany(company);
    }
    if (user.role === Role.Student) {
      const student = await API.students.getMe();
      setStudent(student);
    }

    setUser(user);

    setLoading(false);
  }

  const saveChanges = async () => {
    if (!userEditStatus.ok) {
      alert(userEditStatus.message);
      return;
    }
    if (!studentEditStatus.ok) {
      alert(studentEditStatus.message);
      return;
    }
    if (!companyEditStatus.ok) {
      alert(companyEditStatus.message);
      return;
    }

    if (updateUserDto !== null) {
      const user = await API.users.updateMe(updateUserDto);
      setUser(user);
    }
    if (updateStudentDto !== null) {
      const student = await API.students.updateMe(updateStudentDto);
      setStudent(student);
    }
    if (updateCompanyDto !== null) {
      const company = await API.companies.updateMe(updateCompanyDto);
      setCompany(company);
    }

    // Navigate back if possible, otherwise navigate explicitly
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
    else {
      navigation.replace('ProfileScreen')
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  if (loading || !user) {
    return (
      <View style={styles.container}>
        <ScreenActivityIndicator />
      </View>
    );
  }
  
  return <>
    <ScrollView style={styles.container}>
      <EditUserProfile user={user} setUpdateUserDto={setUpdateUserDto} setEditStatus={setUserEditStatus} />
      {student && <EditStudentProfile student={student} setUpdateStudentDto={setUpdateStudentDto} setEditStatus={setStudentEditStatus}/>}
      {company && <EditCompanyProfile company={company} setUpdateCompanyDto={setUpdateCompanyDto} setEditStatus={setCompanyEditStatus} />}


      <ArkadButton onPress={saveChanges} style={{}}>
        <ArkadText text="Save" style={{}}/>
      </ArkadButton>
    </ScrollView>
  </>;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingVertical: 24,
    backgroundColor: Colors.white,
  },
});
