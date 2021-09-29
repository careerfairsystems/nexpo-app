import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Text, View } from '../components/Themed';
import { CompaniesParamList } from '../types';

import { API } from '../api';
import { Company } from '../api/companies';
import { CompanyListItem } from '../components/ComanyListItem';

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

  useEffect(() => {
    getCompanies();
  }, []);
  
  return (
    <View style={styles.container}>
      {isLoading 
        ? <Text>Loading...</Text>
        : <FlatList
            data={companies}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => 
              <CompanyListItem
                company={item} 
                onPress={() => navigation.navigate('CompanyDetailsScreen', item)} />
              } />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
