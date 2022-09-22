import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import Colors from "../constants/Colors";

import { API } from "../api";
import { StudentSessionTimeslot, updateTimeslot } from "../api/studentSessions";

import { View } from "../components/Themed";
import ScreenActivityIndicator from "../components/ScreenActivityIndicator";
import { ArkadButton } from "../components/Buttons";
import { ArkadText } from "../components/StyledText";
import StudentSessionsCompInfo from '../components/studentSessionList/StudentSessionCompInfo';
import { Props } from "react-native-image-zoom-viewer/built/image-viewer.type";


type StudentSessionsDetailsScreenParams = {
  route: {
    params: {
      companyId: number;
      timeslotId: number;
    };
  };
};

export default function StudentSessionsDetailsScreen({
  route,
}: StudentSessionsDetailsScreenParams) {
  const { timeslotId, companyId} = route.params;

  const [timeslot, setTimeslot] = useState<StudentSessionTimeslot | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getTimeslot = async () => {
    const timeslot = await API.studenSessions.getTimeslot(timeslotId);
    setTimeslot(timeslot);

  };

  const bookTimeslot = async () => {
    setLoading(true);
    if (timeslot?.id == undefined) {
      return;
    }
    const ts = await API.studenSessions.updateTimeslot(timeslot.id, 1);
    if (ts) {
      alert("Registered to student session " + timeslot?.start.toLocaleDateString());
      getTimeslot();
    } else {
      alert("Could not register to student session " + timeslot?.start.toLocaleDateString());
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
      alert("You are not booked to student session " + timeslot?.start.toLocaleDateString());
      return;
    }

    const success = await updateTimeslot(timeslot.id, null);

    if (success) {
      alert(
        "Successfully de-registered from student session " + timeslot?.start.toLocaleDateString()
      );
      getTimeslot();
    } else {
      alert("Could not de-register from student session " + timeslot?.start.toLocaleDateString());
    }

    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getTimeslot();
    setLoading(false);
  }, []);

  if (loading || !timeslot) {
    return <ScreenActivityIndicator />;
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <ArkadText text={"Student session"} style={styles.title} />
        </View>
        <View style={styles.headerContainer}>
          <StudentSessionsCompInfo
            route.params.id={companyId}
          />
        </View>
        <View style={styles.headerContainer}>
          <View style={[styles.subHeaderContainer, { flex: 0.7 }]}>
            <View style={styles.leftItem}>
              <Ionicons name="calendar" size={16} color="black" />
              <ArkadText
                text={API.studenSessions.formatTime(timeslot.start, timeslot.end)}
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
              <ArkadText text={"1"} style={styles.headerText} />
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

        {timeslot.studentId ? (
          <>
            <ArkadButton
              onPress={() => deregister()}
              style={styles.bookedButton}
            >
              <ArkadText text="De-register from timeslot" style={styles.title} />
            </ArkadButton>
            <Pressable
              style={styles.qrContainer}
              onPress={() => alert("Ticket to the timeslot")}
            >
            </Pressable>
          </>
        ) : (
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
