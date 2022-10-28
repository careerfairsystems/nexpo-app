import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors'

import { PublicCompanyDto } from '../../api/companies';
import { ArkadText } from '../StyledText';
import { TagsList } from './TagsList';

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
      <TagsList company={company}/>
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
    backgroundColor: Colors.white,
    paddingTop: 12,
    borderRadius: 16,
    borderWidth: 4,
    borderColor: Colors.darkBlue
  },
  row: {
    flex: 1,
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    flexDirection: 'column',
  },
  logo: {
    width: '85%',
    height: 200,
    resizeMode: 'contain',
  },
  companyName: {
    flex: 1,
    fontSize: 24,
    textAlign: 'left',
    padding: 0,
    marginHorizontal: 4,
    color: Colors.darkBlue,
  },
})
