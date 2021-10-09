import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors'

import { Company } from '../../api/companies';
import { ArkadText } from '../StyledText';

type CompanyListItemProps = {
  company: Company;
  onPress: () => void;
}

export const CompanyListItem = ({ company, onPress }: CompanyListItemProps) => 
  <Pressable onPress={onPress} style={styles.container}>
    <View style={styles.row}>
      <Image 
        source={{uri:company.logo_url}}
        style={styles.logo} 
        defaultSource={require('../../assets/images/adaptive-icon.png')} />
        <ArkadText text={company.name} style={styles.companyName}/>
    </View>
  </Pressable>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
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
  },
  companyName: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
    padding: 12,
    marginHorizontal: 4,
    color: Colors.white,
  },
})
