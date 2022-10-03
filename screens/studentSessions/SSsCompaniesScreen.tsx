import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Text, View } from '../../components/Themed';

import { API } from '../../api';
import { PublicCompanyDto } from '../../api/companies';
import { CompanyListItem } from '../../components/companies/CompanyListItem';
import { SSsStackParamlist } from '../../navigation/BottomTabNavigator';
import { SSTimeslot } from '../../api/studentsessions';

type SSsNavigation = {
  navigation: StackNavigationProp<
    SSsStackParamlist,
    'SSsCompaniesScreen'
  >
};

export default function SSsCompaniesScreen({navigation}: SSsNavigation) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [companies, setCompanies] = useState<PublicCompanyDto[] | null>(null);

  const getCompanies = async () => {
    setLoading(true);
    const companies = await API.companies.getAll();
    var companiesWithTimeslots : PublicCompanyDto[] = [];
    for (let i = 0; i < companies.length; i++) {
      const ts = await API.studentSessions.getTimeslotsByCompanyId(companies[i].id);
      ts.length > 0 ? companiesWithTimeslots.push(companies[i]) : null;
    }
    setCompanies(companiesWithTimeslots);
    setLoading(false);
  }

  const openCompanySSs = (companyId: number, companyName: string) => {
    navigation.navigate('SSsListScreen', { companyId, companyName });
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
        data={companies} //den gamla raden om vi bara vill visa alla företag
        //data={companies?.filter(c => c.ssTimeslots == null ? false : c.ssTimeslots.length > 0)}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item: company }) => 
          <CompanyListItem
            company={company} 
            onPress={() => openCompanySSs(company.id, company.name)} />
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
