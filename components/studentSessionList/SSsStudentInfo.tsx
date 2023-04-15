import React, { useEffect, useState } from "react";
import { Linking, ScrollView, StyleSheet } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";

import { API } from "api/API";
import ScreenActivityIndicator from "components/ScreenActivityIndicator";
import { Student } from "api/Students";
import StudentProfile from "components/profileScreen/StudentProfile";
import Colors from "constants/Colors";
import { SSApplication } from "api/Applications";
import { ArkadButton } from "components/Buttons";
import { ArkadText } from "components/StyledText";
import UserProfile from "components/profileScreen/UserProfile";
import { User } from "api/Users";
import { CardWithHeader } from "components/sSApplication/SSApplicationMsg";

export type SSsStudentInfoProps = {
  studentId: number;
};

export default function SSsStudentInfo({ studentId }: SSsStudentInfoProps) {
  const [application, setApplication] = useState<SSApplication | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function getAppAndStudent() {
    const sdnt = await API.students.getStudent(studentId);
    const app = await API.applications.getApplicationForStudent(sdnt.id);
    const user = await API.users.getUser(sdnt.userId);
    setApplication(app ?? null);
    setStudent(sdnt);
    setUser(user);
  }

  useEffect(() => {
    setLoading(true);
    getAppAndStudent();
    setLoading(false);
  }, []);

  if (loading || !student || !user || !application) {
    return <ScreenActivityIndicator />;
  }

  return (
    <>
      <UserProfile user={user as NonNullable<User>} />
      <StudentProfile student={student as NonNullable<Student>} />

      {user.hasCv && (
        <ArkadButton
          style={{ width: "45%", alignSelf: "center" }}
          onPress={() => API.users.downloadFile(user.id, ".pdf")}
        >
          <ArkadText text="Download CV" />
        </ArkadButton>
      )}
      <CardWithHeader msg={application.motivation} header={"Student Motivation"} />
    </>
  );
}
