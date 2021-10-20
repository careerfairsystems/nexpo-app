import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

import { PublicCompanyDto } from '../api/companies'
import { API } from '../api';
import ScreenActivityIndicator from '../components/ScreenActivityIndicator';

type CompanyDetailsScreenParams = {
  route: {
    params: {
      id: number;
    };
  };
}

export default function CompanyDetailsScreen({ route }: CompanyDetailsScreenParams) {
  const { id } = route.params;

  const [company, setCompany] = useState<PublicCompanyDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getCompany = async () => {
    setLoading(true);

    const company = await API.companies.getCompany(id);
    setCompany(company);

    setLoading(false);
  }

  useEffect(() => {
    getCompany();
  }, []);
  
  if (loading) {
    return (<ScreenActivityIndicator />)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{company?.name}</Text>
      <View style={styles.container}>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemContainer: {
    marginBottom: 2,
    backgroundColor: '#042657',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
  },
  title: {
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  listItem: {
    color: '#FFFFFF',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
