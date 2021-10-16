import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import { ArkadText } from "../StyledText";
import Colors from "../../constants/Colors";
import { Company } from '../../api/companies';

type HostProfileParams = {
  company: Company;
}

export const HostProfile = ({ company }: HostProfileParams) =>
    <View style={styles.container}>
      <View style={styles.top}>
        <Image 
          source={ company.logoUrl ? {uri: company.logoUrl} : require('../../assets/images/adaptive-icon.png')}
          style={styles.logo} 
          defaultSource={require('../../assets/images/adaptive-icon.png')} />
        <ArkadText text={company.name} style={styles.companyName}/>
      </View>

      <View style={styles.infoList}>
        <View style={styles.infoItem}>
          <Ionicons name="link" size={16} color="black"/>
          <ArkadText 
            text={company.website != null ? company.website : "www.example.com"}
            style={styles.itemText} />
        </View>
      </View>

      <ArkadText text={"Company details"} style={styles.header} />
      <View style={styles.descriptionContainer}>
        <ArkadText
          text={company.description != null ? company.description : "Company description"}
          style={styles.description} />
      </View>
      
      <ArkadText text={"Host details"} style={styles.header} />

      <ArkadText 
        text={company.hostName != null ? company.hostName : "Host name"} 
        style={styles.name} />

      <View style={styles.infoList}>
        <View style={styles.infoItem}>
          <Ionicons name="mail" size={16} color="black"/>
          <ArkadText 
            text={company.hostEmail != null ? company.hostEmail : "host@example.com"}
            style={styles.itemText} />
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="call" size={16} color="black"/>
          <ArkadText
            text={company.hostPhone ? company.hostPhone : '\u2013'}
            style={styles.itemText} />
        </View>
      </View>
    </View>
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  top: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    // TODO: Make adaptive
    width: 120,
    height: 120,
  },
  companyName: {
    paddingTop: '2%',
    fontSize: 24,
    color: Colors.darkBlue,
  },
  name: {
    paddingTop: '2%',
    fontSize: 20,
    color: Colors.darkBlue,
  },
  infoList: {
    paddingTop: '2%',
  },
  infoItem: {
    paddingTop: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  itemText: {
    color: Colors.darkBlue,
    fontSize: 12,
    paddingHorizontal: 8,
    textAlign: 'center'
  },
  header: {
    paddingTop: '5%',
    paddingLeft: '4%',
    width: '100%',
    textAlign: 'left',
    fontSize: 16,
    color: Colors.darkBlue,
  },
  descriptionContainer: {
    marginTop: 8,
    width: '90%',
  },
  description: {
    flex: 1,
    color: Colors.black,
    width: '100%',
    fontSize: 14,
    textAlign: 'left'
  },
  eventList: {
    paddingTop: '2%',
    alignItems: 'center',
    height: '30%',
    width: '100%',
  },
});
