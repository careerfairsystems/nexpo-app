import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { View } from '../components/Themed';

import { API } from '../api';
import { PublicCompanyDto } from '../api/companies';
import { CompanyListItem } from '../components/companies/CompanyListItem';
import { CompanyStackParamList } from "../navigation/CompaniesNavigator";
import ScreenActivityIndicator from '../components/ScreenActivityIndicator';
import Colors from '../constants/Colors';

type companiesNavigation = {
  navigation: StackNavigationProp<
    CompanyStackParamList,
    'CompaniesScreen'
  >
};

export default function CompaniesScreen({navigation}: companiesNavigation) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [companies, setCompanies] = useState<PublicCompanyDto[] | null>(null);
  const [text, onChangeText] = React.useState("");

  const getCompanies = async () => {
    setLoading(true);
    const companies = await API.companies.getAll();
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
    return (<View style={styles.container}>
      <ScreenActivityIndicator />
    </View>)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder={"Search for company here!"}
      />
      <FlatList
        style={styles.list}
        data={API.companies.filterData(text, companies)}
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
    width: '90%',
    borderColor: Colors.darkBlue,
    borderWidth: 3,
    color: Colors.darkBlue,
    padding: '0.1%',
    height: 45,
    borderRadius: 7,
    margin: 10,
    fontSize: 15,
    fontFamily: 'montserrat',
    paddingHorizontal: 10
  },
  
});
