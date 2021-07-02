import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Text, View } from '../components/Themed';
import { CompaniesParamList, companyData } from '../types';

type companiesNavigation = {
  navigation: StackNavigationProp<
    CompaniesParamList,
    'CompaniesScreen'
  >
};

export default function CompaniesScreen({navigation}: companiesNavigation) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<String>("");
  const [compData, setCompData] = useState<companyData[] | null>(null);

  // Temporary solution to get login creds. In the future we should 
  // firstly refer to the login page which should use this fetch.
  // Then we should store the .jwt using this: 
  // https://docs.expo.io/versions/latest/sdk/securestore/
  const login = async() => {
    const response = await fetch('https://nexpo.marfor.io/api/login', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'email': 'admin@test.com',
        'password': 'password',
      })
    })
    const responseJson = await response.json();
    setToken(responseJson.data.jwt)
    console.log("JWT KEY: " + responseJson.data.jwt)
  }

  // Retrieves a json with all companies, requires a login jwt
  const getCompanyData = async() => {
    if(token == "") {
      return;
    }
    const response = await fetch('https://nexpo.marfor.io/api/companies', {
      method: 'GET',
      headers: { 
        'Accept': '*/*',
        'Authorization': 'Bearer ' + token
      }
    })
    const responseJson = await response.json();
    setCompData(responseJson.data)
    console.log("COMPANY DATA: " + JSON.stringify(responseJson.data))
  }
  
  // Perform login
  useEffect(() => {
    login()
  }, [])

  // Get companies AFTER token has been updated from null
  useEffect(() => {
    getCompanyData()
    .finally(() => setLoading(false))
  }, [token])
  
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Companies</Text>
      <View style={styles.container}>
        {isLoading ? <Text>Loading...</Text> : 
          <FlatList
            data={compData}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => (
              <TouchableHighlight onPress={() => {
                navigation.navigate('CompanyDetailsScreen', item)
                }}>
                <View style={styles.listItemContainer}>
                <Text style={styles.listItem}>{item.id}, {item.website}</Text>
              </View>
              </TouchableHighlight>
            )}
          />
        }
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