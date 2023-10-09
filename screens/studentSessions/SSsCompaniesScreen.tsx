import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { View } from "components/Themed";
import Colors from "constants/Colors";
import { ArkadText } from "components/StyledText";
import { API } from "api/API";
import { PublicCompanyDto } from "api/Companies";
import { CompanyListItem } from "components/companies/CompanyListItem";
import { SSsStackParamlist } from "./SSsStudentNavigator";
import ScreenActivityIndicator from "components/ScreenActivityIndicator";
import { User } from "api/Users";

type SSsNavigation = {
  navigation: StackNavigationProp<SSsStackParamlist, "SSsCompaniesScreen">;
};

export default function SSsCompaniesScreen({ navigation }: SSsNavigation) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [companies, setCompanies] = useState<PublicCompanyDto[] | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const getCompanies = async () => {
    try {
      const companies = await API.studentSessions.getCompaniesWithTimeslots();
      setCompanies(companies);
    } catch (error) {
      setCompanies(null);
    }
  };

  const getUser = async () => {
    try {
      const user = await API.users.getMe();
      setUser(user);
    } catch (error) {
      // Handle the case where the user is not logged in
      setUser(null);
    }
  };

  const openCompanySSs = (companyId: number) => {
    navigation.navigate("SSsListScreen", { companyId });
  };

  useEffect(() => {
    setLoading(true);
    getUser();
    getCompanies();
    setLoading(false);
  }, []);

  if (isLoading) {
    return <ScreenActivityIndicator />;
  }

  if (user) {
    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.titleContainer}>
              <ArkadText
                text={"Welcome to \n Student Sessions!"}
                style={styles.title}
              />
              <ArkadText
                text={
                  "Make sure to book a session with your favorite companies below. A student session is a 30 minute one on one meeting with a company representative. A great way to stand out in a sea of work hungry students!"
                }
                style={styles.text}
              />
            </View>
          }
          style={styles.list}
          data={companies}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item: company }) => (
            <CompanyListItem
              company={company}
              onPress={() => openCompanySSs(company.id)}
            />
          )}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.titleContainerNoUser}>
        <ArkadText
          text={"Please log in to view which companies offer Student Sessions"}
          style={styles.title}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: 5,
    fontSize: 50,
    color: Colors.white,
  },
  text: {
    fontSize: 16,
    color: Colors.white,
  },
  titleContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    width: "90%",
    alignSelf: "center",
  },
  titleContainerNoUser: {
    paddingTop: 10,
    paddingBottom: 10,
    width: "90%",
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.arkadNavy,
  },
  list: {
    width: "100%",
  },
});
