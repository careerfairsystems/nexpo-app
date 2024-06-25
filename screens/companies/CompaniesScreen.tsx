import React, { useEffect, useRef, useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import {
  Animated,
  LayoutAnimation,
  Linking,
  StyleSheet,
  TextInput,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text } from "components/Themed";
import { API } from "api/API";
import { PublicCompanyDto } from "api/Companies";
import { CompanyListItem } from "components/companies/CompanyListItem";
import { CompanyStackParamList } from "./CompaniesNavigator";
import ScreenActivityIndicator from "components/ScreenActivityIndicator";
import Colors from "constants/Colors";
import CompaniesModal from "components/companies/CompaniesModal";
import { ArkadButton } from "components/Buttons";
import { toggleAnimation } from "../../animations/toggleAnimation";
import { ArkadText } from "components/StyledText";
import { filterData } from "components/companies/filterCompanies";
// import { SearchBar } from "components/SearchBar";
import CompaniesList from "components/companies/CompaniesList";


type companiesNavigation = {
  navigation: StackNavigationProp<CompanyStackParamList, "CompaniesScreen">;
};

export default function CompaniesScreen({ navigation }: companiesNavigation) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [companies, setCompanies] = useState<PublicCompanyDto[] | null>(null);
  const [filteredCompanies, setFilteredCompanies] = useState<
    PublicCompanyDto[] | null
  >(null);
  const [text, onChangeText] = React.useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const animnationController = useRef(new Animated.Value(0)).current;

  const toggleFilter = () => {
    LayoutAnimation.configureNext(toggleAnimation);
    setModalVisible(!modalVisible);
  };

  const getCompanies = async () => {
    setLoading(true);
    const companies = await API.companies.getAll();
    setFilteredCompanies(companies);
    setCompanies(companies);
    setLoading(false);
  };

  const openCompanyDetails = (id: number) => {
    navigation.navigate("CompanyDetailsScreen", { id });
  };

  useEffect(() => {
    getCompanies();
  }, []);

  if (isLoading) {
    return <ScreenActivityIndicator />;
  }

  const sortCompanies = (
    companies: PublicCompanyDto[] | null
  ): PublicCompanyDto[] | null => {
    if (companies === null) {
      return null;
    }
    return companies.sort((a, b) => {
      if (a.name === "Accenture") return -1;
      if (b.name === "Accenture") return 1;
      return 0;
    });
  };

  const sortedCompanies = sortCompanies(
    filterData(text, filteredCompanies)
  );



  /* TODO:
      - Ändra list items så de är pure components
      - OnBeginScrollDrag??

  */
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        {/* <SearchBar
          placeholder="Sök efter företag..."
        /> */}
        {/* <SearchBar
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder={"Search for a company..."}
          placeholderTextColor={Colors.lightGray}
        /> */}
      
        <ArkadButton style={styles.filterbutton} onPress={() => toggleFilter()}>
          {modalVisible ? (
            <Entypo name="chevron-thin-up" size={24} color="white" />
          ) : (
            <AntDesign name="filter" size={24} color="white" />
          )}
          {isFiltered && <View style={styles.filterBadge} />}
        </ArkadButton>
      </View>
      <CompaniesModal
        companies={companies ? companies : []}
        setFilteredCompanies={setFilteredCompanies}
        setIsFiltered={setIsFiltered}
        isVisable={modalVisible}
      />

      <CompaniesList onBeginScrollDrag={(event) => {modalVisible ? () => toggleFilter() : () => { }}} sortedCompanies={sortedCompanies} navigation={navigation}/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.arkadNavy,
  },
  input: {
    borderColor: Colors.white,
    borderWidth: 2,
    color: Colors.white,
    height: 48,
    borderRadius: 7,
    marginRight: 12,
    fontSize: 20,
    fontFamily: "main-font-bold",
    paddingHorizontal: 10,
    flexGrow: 1,
  },
  filterbutton: {
    height: 45,
    padding: 10,
    margin: 0,
  },
  filterBadge: {
    position: "absolute",
    top: -1,
    left: -1,
    backgroundColor: Colors.arkadTurkos,
    borderRadius: 50,
    width: 15,
    height: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    justifyContent: "space-between",
    paddingTop: 5,
    marginBottom: 16,
    zIndex: 1,
    backgroundColor: Colors.arkadNavy,
  },
});
