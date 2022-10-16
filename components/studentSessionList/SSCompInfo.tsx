import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Linking } from 'react-native';

import { Text, View } from '../Themed';

import { PublicCompanyDto } from '../../api/companies'
import { API } from '../../api';
import ScreenActivityIndicator from '../ScreenActivityIndicator';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

type CompanyDetailsScreenProps= {
  company: PublicCompanyDto;
}

export default function SSCompInfo({ company }: CompanyDetailsScreenProps) {

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            source={company.logoUrl 
              ? {uri: company.logoUrl}
              : require('../../assets/images/icon.png')}
            defaultSource={require('../../assets/images/icon.png')}
            style={styles.logo} />
        </View>

        <Text style={styles.title}>{company?.name}</Text>

        <Text style={styles.descHeader}>About us</Text>
        <Text style={styles.desc}>{ company.description ? company.description : '\u2013'}</Text>
      </View>
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
    alignSelf: 'center',
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

