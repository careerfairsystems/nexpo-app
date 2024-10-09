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
                text={"Welcome to \nStudent Sessions!"}
                style={styles.title}
              />
              <ArkadText
                text={
                  "Book a 30-minute one-on-one meeting with a company representative. This is a great way to stand out and connect with your favorite companies!"
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
          text={"Please log in to view available Student Sessions"}
          style={styles.title_nologin}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: 10,
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.arkadTurkos,
    textAlign: "center",
  },
  title_nologin: {
    paddingBottom: 5,
    fontSize: 28,
    color: Colors.arkadTurkos,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: Colors.white,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 24,
  },
  titleContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    width: "90%",
    alignSelf: "center",
    backgroundColor: Colors.arkadNavy,
    borderRadius: 10,
    padding: 20,
  },
  titleContainerNoUser: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: Colors.arkadNavy,
  },
  list: {
    width: "100%",
    paddingTop: 20,
  },
});