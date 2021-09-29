import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

import { Company } from '../api/companies'

type CompanyDetailsScreenParams = {
  route: {
    params: {
      company: Company
    };
  };
}

export default function CompanyDetailsScreen({ route }: CompanyDetailsScreenParams) {
  const { company } = route.params;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{company.name}</Text>
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
