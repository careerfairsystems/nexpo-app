import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Text, View } from '../components/Themed';
import { CompaniesParamList } from '../types';

import { API } from '../api';
import { Company } from '../api/companies';
import { CompanyListItem } from '../components/companies/CompanyListItem';

type companiesNavigation = {
  navigation: StackNavigationProp<
    CompaniesParamList,
    'CompaniesScreen'
  >
};

export default function CompaniesScreen({navigation}: companiesNavigation) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [companies, setCompanies] = useState<Company[] | null>(null);

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
  
  return (
    <View style={styles.container}>
      {isLoading 
        ? <Text>Loading...</Text>
        : <View style={styles.listContainer}>
            <FlatList
              data={companies}
              keyExtractor={({ id }) => id.toString()}
              renderItem={({ item: company }) => 
                <CompanyListItem
                  company={company} 
                  onPress={() => openCompanyDetails(company.id)} />
              } />
          </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: {
    flex: 1,
    width: '90%',
  },
});
