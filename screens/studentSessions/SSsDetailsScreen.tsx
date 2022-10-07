import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import Colors from "../../constants/Colors";

import { API } from "../../api";
import { SSTimeslot, unbookTimeslot, } from "../../api/studentsessions";

import { View } from "../../components/Themed";
import ScreenActivityIndicator from "../../components/ScreenActivityIndicator";
import { ArkadButton } from "../../components/Buttons";
import { ArkadText } from "../../components/StyledText";
import { Role, User } from "../../api/users";
import { ApplicationAcceptedDto } from "../../api/sSApplications";
import { Student } from "../../api/students";

type SSsDetailsScreenParams = {
  route: {
    params: {
      companyId: number;
      companyName: string;
      timeslotId: number;
    };
  };
};

export default function SSsDetailsScreen({ route }: SSsDetailsScreenParams) {
  const { timeslotId, companyName, companyId} = route.params;

  const [timeslot, setTimeslot] = useState<SSTimeslot | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();
  const [student, setStudent] = useState<Student | null>(null);
  const [accepted, setAccepted] = useState<ApplicationAcceptedDto | null>(null);


  const getTimeslot = async () => {
    const timeslot = await API.studentSessions.getTimeslot(timeslotId);
    setTimeslot(timeslot);
  };
  const getStudent = async () => {
    const student = user?.role === Role.Student ? await API.students.getMe(): null;
    if (user?.role === Role.Student) setStudent(student);
  };
  const getAccepted = async () => {
    const acc = user?.role === Role.Student ? await API.sSApplications.getApplicationAccepted(companyId) : null;
    if (user?.role === Role.Student) setAccepted(acc)
  };
  const getUser = async () => {
    const usr = await API.users.getMe();
    setUser(usr);
  };
  const bookTimeslot = async () => {
    if (timeslot?.id == undefined || user?.id == undefined || accepted?.accepted == undefined) {
      return;
    }
    if (timeslot.studentId != null) {
      alert("Timeslot is already booked");
      return;
    }
    if (accepted.booked){
      alert("You have already booked a timeslot");
      return;
    }
    setLoading(true);
    const ts = await API.studentSessions.bookTimeslot(timeslot.id);
    if (ts.id != undefined) {
      alert("Registered to student session " + API.studentSessions.formatTime(timeslot.start, timeslot.end));
      getTimeslot();
    } else {
      alert("Could not register to student session " + API.studentSessions.formatTime(timeslot.start, timeslot.end));
      getTimeslot();
    }
    setLoading(false);
  };

  async function deregister(): Promise<void> {
    setLoading(true);
    if (timeslot?.id == undefined) {
      return;
    }

    if (timeslot.studentId == null) {
      alert("You are not booked to student session " + API.studentSessions.formatTime(timeslot.start, timeslot.end));
      return;
    }

    const success = await unbookTimeslot(timeslot.id);

    if (success) {
      alert(
        "Successfully de-registered from student session " + API.studentSessions.formatTime(timeslot.start, timeslot.end)
      );
      getTimeslot();
    } else {
      alert("Could not de-register from student session " + API.studentSessions.formatTime(timeslot.start, timeslot.end));
    }
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getUser();
    getTimeslot();
    getAccepted();
    getStudent();
    setLoading(false);
  }, []);

  if (loading || !timeslot || !user || ((!accepted || !student) && user.role === Role.Student)) {
    getAccepted();
    getStudent();
    return <ScreenActivityIndicator />;
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <ArkadText text={"Student session Company"} style={styles.title} />
        </View>
        <View style={styles.headerContainer}>
          <View style={[styles.subHeaderContainer, { flex: 0.7 }]}>
            <View style={styles.leftItem}>
              <Ionicons name="calendar" size={16} color="black" />
              <ArkadText
                text={API.studentSessions.formatTime(timeslot.start, timeslot.end)}
                style={styles.headerText}
              />
            </View>
            <View style={styles.leftItem}>
              <Ionicons name="map" size={16} color="black" />
              <ArkadText text={timeslot.location} style={styles.headerText} />
            </View>
            <View style={styles.leftItem}>
              <MaterialCommunityIcons
                name="microphone"
                size={16}
                color="black"
              />
              <ArkadText text={companyName} style={styles.headerText} />
            </View>
          </View>
          <View style={[styles.subHeaderContainer, { flex: 0.3 }]}>
            <View style={styles.rightItem}>
              <Ionicons name="people" size={16} color="black" />
              <ArkadText
                text={timeslot.studentId ? "Booked" : "Available"}
                style={styles.headerText}
              />
            </View>
          </View>
        </View>
          { user.role === Role.Student && timeslot.studentId === student?.id ? (
            <ArkadButton
              onPress={deregister}
              style={styles.bookedButton}
            >
              <ArkadText text="De-register from timeslot" style={styles.title} />
            </ArkadButton>
          ) : user.role === Role.Student && timeslot.studentId === null && (
            <ArkadButton onPress={bookTimeslot} style={styles.bookButton}>
              <ArkadText text="Register to timeslot" style={styles.title} />
            </ArkadButton>
          )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
  },
  titleContainer: {
    width: "90%",
    marginTop: 20,
    height: 100,
    backgroundColor: Colors.darkBlue,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: "center",
  },
  title: {
    justifyContent: "center",
    fontSize: 16,
  },
  headerContainer: {
    width: "90%",
    marginTop: 24,
    flexDirection: "row",
    alignContent: "center",
  },
  subHeaderContainer: {
    flex: 1,
    flexDirection: "column",
    alignContent: "space-around",
  },
  leftItem: {
    marginTop: 16,
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
  },
  rightItem: {
    marginTop: 16,
    flexDirection: "row-reverse",
    alignSelf: "flex-end",
    alignItems: "center",
  },
  headerText: {
    color: Colors.black,
    fontSize: 12,
    paddingHorizontal: 8,
    textAlign: "left",
  },
  descriptionContainer: {
    marginTop: 40,
    width: "90%",
  },
  description: {
    color: Colors.black,
    fontSize: 14,
    textAlign: "left",
  },
  bookButton: {
    marginTop: 40,
    width: "90%",
    height: 60,
    padding: 8,
    marginBottom: 20,
    borderRadius: 12,
  },
  bookedButton: {
    backgroundColor: Colors.lightGreen,
    marginTop: 40,
    width: "90%",
    height: 60,
    padding: 8,
    marginBottom: 20,
    borderRadius: 12,
  },
  qrHeader: {
    marginTop: 24,
    fontFamily: "montserrat",
    fontSize: 24,
    color: Colors.darkBlue,
    marginBottom: 8,
  },
  qrContainer: {
    borderWidth: 3,
    borderColor: Colors.lightGray,
    borderRadius: 5,
    padding: 16,
    marginBottom: 60,
  },
});
