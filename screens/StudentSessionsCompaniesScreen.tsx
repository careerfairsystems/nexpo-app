import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Text, View } from '../components/Themed';

import { API } from '../api';
import { PublicCompanyDto } from '../api/companies';
import { CompanyListItem } from '../components/companies/CompanyListItem';
import { StudentSessionsStackParamlist } from '../navigation/BottomTabNavigator';

type StudentSessionsNavigation = {
  navigation: StackNavigationProp<
    StudentSessionsStackParamlist,
    'StudentSessionsCompaniesScreen'
  >
};

export default function CompaniesScreen({navigation}: StudentSessionsNavigation) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [companies, setCompanies] = useState<PublicCompanyDto[] | null>(null);

  const getCompanies = async () => {
    setLoading(true);
    const companies = await API.companies.getAll();
    setCompanies(companies);
    setLoading(false);
  }

  const openCompanyStudentSessions = (id: number) => {
    navigation.navigate('StudentSessionsListScreen', { id });
  }

  useEffect(() => {
    getCompanies();
  }, []);
  
  if (isLoading) {
    return (<View style={styles.container}>
      <Text>Loading...</Text>
    </View>)
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={companies}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item: company }) => 
          <CompanyListItem
            company={company} 
            onPress={() => openCompanyStudentSessions(company.id)} />
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
});
