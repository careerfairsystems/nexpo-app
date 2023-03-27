import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Linking } from 'react-native';

import { Text, View } from '../components/Themed';

import { PublicCompanyDto } from '../api/companies'
import { API } from '../api';
import ScreenActivityIndicator from '../components/ScreenActivityIndicator';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

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
  
  if (loading || company == null) {
    return (<ScreenActivityIndicator />)
  }

  return (
    <View style={styles.outerContainer}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image 
              source={company.logoUrl 
                ? {uri: company.logoUrl}
                : require('../assets/images/icon.png')}
              defaultSource={require('../assets/images/icon.png')}
              style={styles.logo} />
          </View>

          <Text style={styles.title}>{company?.name}</Text>

          <View style={styles.contactInfoContainer}>
            <Ionicons name="link" size={16} color={Colors.darkBlue} />
            <Text 
              style={styles.contactInfoText}
              onPress={() => { if (company.website) { Linking.openURL(company.website) }}}>
              { company.website ? company.website.replace(/^https?:\/\//, '') : '\u2013'}
            </Text>
          </View>

          <Text style={styles.descHeader}>About us</Text>
          <Text style={styles.desc}>{ company.description ? company.description : '\u2013'}</Text>
        </View>
      </ScrollView> 
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    display: 'flex',
    flex: 1,
    padding: '8%',
    alignItems: 'center',
  },
  logoContainer: {
    paddingTop: 20,
    height: 120,
    width: '100%',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    marginTop: 24,
    paddingBottom: 8,
    fontSize: 24,
    fontFamily: 'montserrat',
    color: Colors.darkBlue,
  },
  contactInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 4,
  },
  contactInfoText: {
    fontSize: 14,
    paddingLeft: 8,
    fontFamily: 'montserrat',
    color: Colors.darkBlue,
  },
  descHeader: {
    alignSelf: 'flex-start',
    textDecorationLine: 'underline',
    paddingTop: 16,
    fontSize: 18,
    fontFamily: 'montserrat',
    color: Colors.darkBlue,
  },
  desc: {
    paddingTop: 6,
    fontSize: 14,
    fontFamily: 'montserrat',
    color: Colors.darkBlue,
  },
});
