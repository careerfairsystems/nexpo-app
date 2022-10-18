import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { View } from '../../components/Themed';

import { API } from '../../api';
import { PublicCompanyDto } from '../../api/companies';
import { CompanyListItem } from '../../components/companies/CompanyListItem';
import { SSsStackParamlist } from "./SSsStudentNavigator";
import ScreenActivityIndicator from '../../components/ScreenActivityIndicator';
import { User } from '../../api/users';

type SSsNavigation = {
  navigation: StackNavigationProp<
    SSsStackParamlist,
    'SSsCompaniesScreen'
  >
};

export default function SSsCompaniesScreen({navigation}: SSsNavigation) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [companies, setCompanies] = useState<PublicCompanyDto[] | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const getCompanies = async () => {
    const companies = await API.studentSessions.getCompaniesWithTimeslots();
    setCompanies(companies);
  }
  const getUser = async () => {
    const user = await API.users.getMe();
    setUser(user);
  }

  const openCompanySSs = (companyId: number) => {
    navigation.navigate('SSsListScreen', { companyId });
  }

  useEffect(() => {
    setLoading(true);
    getCompanies();
    getUser();
    setLoading(false);
  }, []);
  
  if (isLoading || !user) {
    return (<View style={styles.container}>
      <ScreenActivityIndicator />
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
            onPress={() => openCompanySSs(company.id)} />
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
