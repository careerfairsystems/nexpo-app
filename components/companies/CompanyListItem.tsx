import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors'

import { PublicCompanyDto } from '../../api/companies';
import { ArkadText } from '../StyledText';

type CompanyListItemProps = {
  company: PublicCompanyDto;
  onPress: () => void;
}

export const CompanyListItem = ({ company, onPress }: CompanyListItemProps) => 
  <Pressable onPress={onPress} style={styles.container}>
    <View style={styles.row}>
      <ArkadText text={company.name} style={styles.companyName}/>
      <Image 
        source={company.logoUrl ? {uri: company.logoUrl} : require('../../assets/images/adaptive-icon.png')}
        style={styles.logo} />
    </View>
  </Pressable>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: Colors.darkBlue,
    padding: 16,
    borderRadius: 16,
  },
  row: {
    flex: 1,
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    flexDirection: 'row',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  companyName: {
    flex: 1,
    fontSize: 24,
    textAlign: 'left',
    padding: 12,
    marginHorizontal: 4,
    color: Colors.white,
  },
})
