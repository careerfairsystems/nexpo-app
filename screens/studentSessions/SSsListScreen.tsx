import * as React from "react";
import { ActivityIndicator, Dimensions, Image, StyleSheet } from "react-native";
import { View } from "components/Themed";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "api/API";
import { SSTimeslot } from "api/StudentSessions";
import { TimeslotList } from "components/studentSessionList/SSList";
import SSCompInfo from "components/studentSessionList/SSCompInfo";
import { SSsStackParamlist } from "./SSsStudentNavigator";
import { ArkadButton } from "components/Buttons";
import { ArkadText, NoButton } from "components/StyledText";
import { PublicCompanyDto } from "api/Companies";
import { FlatList } from "react-native-gesture-handler";
import { getMe, User } from "api/Users";
import { Role } from "api/Role";
import ScreenActivityIndicator from "components/ScreenActivityIndicator";
import { ApplicationAcceptedDto } from "api/Applications";
import { Student } from "api/Students";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import Colors from "constants/Colors";
import Toast from "react-native-toast-message";
import { useWindowDimensions } from "react-native";

type SSsNavigation = {
  navigation: StackNavigationProp<SSsStackParamlist, "SSsListScreen">;
  route: {
    params: {
      companyId: number;
    };
  };
};

export default function SSsListScreen({ navigation, route }: SSsNavigation) {
  const id = route.params.companyId;
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [ssTimeslots, setTimeslots] = React.useState<SSTimeslot[] | null>(null);
  const [company, setCompany] = React.useState<PublicCompanyDto | null>(null);
  const [user, setUser] = React.useState<User | null>(null);
  const [student, setStudent] = React.useState<Student | null>(null);
  const [accepted, setAccepted] = React.useState<ApplicationAcceptedDto | null>(
    null
  );
  const [toggleMap, setToggleMap] = React.useState<boolean>(false);
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const { height, width } = useWindowDimensions();

  const getTimeslotsAndCompany = async () => {
    const ssTimeslots = (await API.studentSessions.getTimeslotsByCompanyId(id))
    .filter(obj => new Date(obj.end) > new Date());
    const company = await API.companies.getCompany(id);
    const user = await getMe();
    const acc =
      user.role === Role.Student
        ? await API.applications.getApplicationAccepted(id)
        : null;
    const stdnt =
      user.role === Role.Student ? await API.students.getMe() : null;
    setStudent(stdnt);
    setAccepted(acc);
    setUser(user);
    setCompany(company);
    setTimeslots(ssTimeslots);
  };

  const openSSDetails = (id: number) => {
    user?.role === Role.CompanyRepresentative || accepted?.accepted
      ? navigation.navigate("SSsSwitchScreen", {
          id: id,
          screen: "DetailsScreen",
        })
      : Toast.show({
          type: "info",
          text1:
            "You must first send an application and get it accepted to be able to book a time",
          visibilityTime: 5000,
        });
  };

  const openSSsApplicaion = () => {
    const screen =
      user?.role == Role.Student || user?.role == Role.Volunteer
        ? "application"
        : "applicationList";
    navigation.navigate("SSsSwitchScreen", { id: id, screen: screen });
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getTimeslotsAndCompany();
      setLoading(false);
    }, [])
  );

  function handleImageLoad() {
    setIsImageLoaded(true);
  }

  if (isLoading || company == null || user == null) {
    return <ScreenActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={null}
        renderItem={null}
        ListHeaderComponent={
          <>
            {user.role !== Role.CompanyRepresentative && (
              <SSCompInfo company={company} />
            )}
            {!accepted?.accepted ? (
              <ArkadButton
                style={styles.button}
                onPress={() => openSSsApplicaion()}
              >
                <ArkadText
                  text={
                    user.role === Role.CompanyRepresentative
                      ? "See applications!"
                      : "Apply here!"
                  }
                />
              </ArkadButton>
            ) : (
              <NoButton
                style={styles.accepted}
                text={"You have been accepted! \n Book a timeslot below."}
              />
            )}
            {accepted?.accepted && (
              <ArkadButton
                onPress={() => {
                  setToggleMap(!toggleMap);
                }}
                style={styles.map}
              >
                <ArkadText
                  text={toggleMap ? "Hide map" : "See map for Student Sessions"}
                />
              </ArkadButton>
            )}
            {toggleMap && (
              <View style={styles.container}>
                {isImageLoaded && toggleMap ? null : (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={Colors.white} />
                    <ArkadText text="Loading..." style={styles.loadingText} />
                  </View>
                )}
                <Image
                  source={{
                    uri: "https://cvfiler.s3.eu-north-1.amazonaws.com/SSMap.png",
                  }}
                  style={{
                    ...styles.image,
                    height: width * 1.2,
                    width: width * 0.95,
                  }}
                  onLoad={handleImageLoad}
                  onError={(error) => {
                    console.error("Image loading error: ", error);
                  }}
                  resizeMode="contain"
                ></Image>
              </View>
            )}
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
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  accepted: {
    color: Colors.lightGreen,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  image: {
    alignSelf: "center",
  },
  container: {
    alignItems: "center",
    backgroundColor: Colors.arkadNavy,
  },
  loadingContainer: {
    marginTop: "10%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "3%",
  },
  loadingText: {
    paddingTop: 15,
    color: Colors.white,
    fontSize: 32,
  },
  button: {
    width: "60%",
    alignSelf: "center",
    backgroundColor: Colors.arkadOrange,
    borderRadius: 55,
    justifyContent: "center",
  },
  map: {
    width: "65%",
    alignSelf: "center",
    marginBottom: 10,
  },
});
