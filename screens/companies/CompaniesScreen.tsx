import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutAnimation,
  StyleSheet,
  TextInput,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View } from "components/Themed";
import { API } from "api/API";
import { PublicCompanyDto } from "api/Companies";
import { CompanyStackParamList } from "./CompaniesNavigator";
import ScreenActivityIndicator from "components/ScreenActivityIndicator";
import Colors from "constants/Colors";
import CompaniesModal from "components/companies/CompaniesModal";
import { toggleAnimation } from "../../animations/toggleAnimation";
import { filterData } from "components/companies/filterCompanies";
import { SearchBar } from "components/SearchBar";
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

  const searchBarRef = useRef<TextInput | null>(null);

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

  const searchBarProps = {
    text: text,
    onChangeText: onChangeText,
    modalVisible: modalVisible,
    isFiltered: isFiltered,
    toggleFilter: toggleFilter,
    placeHolder: "Search comapny.."
  }

  useEffect(() => {
    getCompanies();
  }, []);

  useEffect(() => {
    navigation.setOptions({headerTitle: () => (<SearchBar {...searchBarProps} ref={searchBarRef}/>)})
  }, [searchBarProps]);

  if (isLoading) {
    return <ScreenActivityIndicator />;
  }

  const sortedCompanies = filterData(text, filteredCompanies)

  return (
    <View style={styles.container}>
      <CompaniesModal
        companies={companies ? companies : []}
        setFilteredCompanies={setFilteredCompanies}
        setIsFiltered={setIsFiltered}
        isVisable={modalVisible}
        filteredCompanies={filteredCompanies ?? []}
      />

      <CompaniesList onScrollBeginDrag={(event) => {if (modalVisible) {toggleFilter()}; if (searchBarRef.current) {searchBarRef.current.blur()}}} sortedCompanies={sortedCompanies} openCompanyDetails={openCompanyDetails}/>

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
});
