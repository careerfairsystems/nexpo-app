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
    const companies = await API.studentSessions.getCompaniesWithTimeslots();
    setCompanies(companies);
  };
  const getUser = async () => {
    const user = await API.users.getMe();
    setUser(user);
  };

  const openCompanySSs = (companyId: number) => {
    navigation.navigate("SSsListScreen", { companyId });
  };

  useEffect(() => {
    setLoading(true);
    getCompanies();
    getUser();
    setLoading(false);
  }, []);

  if (isLoading || !user) {
    return <ScreenActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.titleContainer}>
            <ArkadText text={"Welcome to \n Student Sessions!"} style={styles.title} />
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
          <CompanyListItem company={company} onPress={() => openCompanySSs(company.id)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: 5,
    fontSize: 50,
    color: Colors.arkadNavy,
  },
  text: {
    fontSize: 16,
    color: Colors.arkadNavy,
  },
  titleContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    width: "90%",
    alignSelf: "center",
  },
  container: {
    flex: 1,
  },
  list: {
    width: "100%",
  },
});
