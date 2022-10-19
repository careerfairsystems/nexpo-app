import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, View } from '../../components/Themed';
import { API } from '../../api';
import { PublicCompanyDto } from '../../api/companies';
import { CompanyListItem } from '../../components/companies/CompanyListItem';
import { CompanyStackParamList } from "./CompaniesNavigator";
import ScreenActivityIndicator from '../../components/ScreenActivityIndicator';
import Colors from '../../constants/Colors';
import CompaniesModal from '../../components/companies/CompaniesModal';
import { ArkadButton } from '../../components/Buttons';
import { ArkadText } from '../../components/StyledText';

type companiesNavigation = {
  navigation: StackNavigationProp<
    CompanyStackParamList,
    'CompaniesScreen'
  >
};

export default function CompaniesScreen({navigation}: companiesNavigation) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [companies, setCompanies] = useState<PublicCompanyDto[] | null>(null);
  const [filteredCompanies, setFilteredCompanies] = useState<PublicCompanyDto[] | null>(null);
  const [text, onChangeText] = React.useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const getCompanies = async () => {
    setLoading(true);
    const companies = await API.companies.getAll();
    setFilteredCompanies(companies);
    setCompanies(companies);
    setLoading(false);
  }

  const openCompanyDetails = (id: number) => {
    navigation.navigate('CompanyDetailsScreen', { id });
  }

  useEffect(() => {
    getCompanies();
  }, []);

  if (isLoading) {
    return (<ScreenActivityIndicator />)
  }

  return (
    <View style={styles.container}>
      <CompaniesModal 
        companies={companies ? companies : []}
        setFilteredCompanies={setFilteredCompanies}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      /> 
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder={"Search for a company!"}
        />
        <ArkadButton style={styles.filterbutton} onPress={() => setModalVisible(true)} >
          <ArkadText text = "Filter" />
        </ArkadButton>  
      </View>
      <FlatList
        style={styles.list}
        data={API.companies.filterData(text, filteredCompanies)}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item: company }) =>
          <CompanyListItem
            company={company}
            onPress={() => openCompanyDetails(company.id)} />
        } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    width: '100%',
  },
  input: {
    borderColor: Colors.darkBlue,
    borderWidth: 3,
    color: Colors.darkBlue,
    padding: '0.1%',
    height: 45,
    borderRadius: 7,
    margin: 10,
    fontSize: 15,
    fontFamily: 'montserrat',
    paddingHorizontal: 10,
    width: '80%',
  },
  filterbutton: {
    height: 45,
  },
  searchContainer: {
    flexDirection: 'row',
    width: '93%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },

  label: {
    marginBottom: 7,
    marginStart: 10,
  },

  placeholderStyles: {
    color: "grey",
  },
  dropdown: {
    marginHorizontal: 10,
    width: "80%",
    marginBottom: 15,
  },
});
