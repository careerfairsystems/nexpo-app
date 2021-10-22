import { Ionicons } from "@expo/vector-icons";
import React, { useImperativeHandle, forwardRef } from "react";
import { Image, StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import { ArkadText, ArkadTextInput } from "../StyledText";
import Colors from "../../constants/Colors";
import { Company } from '../../api/companies';

type HostProfileParams = {
  company: Company;
  editingProfile: boolean;
  ref: React.Ref<unknown> | undefined;
}

/* Currently an unused component. In the future it would be nice to
 * refer to this component from the profile screen it improve 
 * readability since the profile screen is quite messy.
 */

export const HostProfile = ({ company, editingProfile }: HostProfileParams, 
  ref: React.Ref<unknown> | undefined) => {
  useImperativeHandle(ref, () => ({
    // methods connected to `ref`
    updateUser: () => { updateUser() }
  }))

  async function updateUser () {
    console.log("Hello")
  }

  return (
    <View style={styles.container}>
      <Image 
        source={company.logoUrl 
          ? {uri: company.logoUrl}
          : require('../../assets/images/adaptive-icon.png')}
        style={styles.logo} 
        defaultSource={require('../../assets/images/adaptive-icon.png')} />
      <ArkadTextInput
        text={company.name}
        style={styles.companyName}
        editable={false} />

      <View style={styles.infoItem}>
        <Ionicons name="link" size={16} color="black"/>
        <ArkadTextInput 
          text={company.website != null ? company.website : "www.example.com"}
          style={styles.itemText} 
          editable={editingProfile} />
      </View>

      <ArkadText text={"About us"} style={styles.header} />
      <View style={styles.descriptionContainer}>
        <ArkadTextInput
          text={company.description != null ? company.description : "Company description"}
          style={styles.description} 
          editable={editingProfile} />
      </View>
        
      <ArkadText text={"About me"} style={styles.header} />

      <ArkadTextInput 
        text={company.hostName != null ? company.hostName : "Host name"} 
        style={styles.name} 
        editable={false} />

      <View style={styles.infoItem}>
        <Ionicons name="mail" size={16} color="black"/>
        <ArkadTextInput 
          text={company.hostEmail != null ? company.hostEmail : "host@example.com"}
          style={styles.itemText} 
          editable={false} />
      </View>
      <View style={styles.infoItem}>
        <Ionicons name="call" size={16} color="black" />
        <ArkadTextInput
          text={company.hostPhone ? company.hostPhone : '\u2013'}
          style={styles.itemText}
          editable={false} />
      </View>
    </View>
  )
  
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
  infoItem: {
    width: 200,
    paddingTop: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  itemText: {
    flex: 1,
    color: Colors.darkBlue,
    fontSize: 12,
    paddingHorizontal: 8,
  },
  header: {
    paddingTop: '10%',
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
    color: Colors.black,
    width: '100%',
    fontSize: 14,
    textAlign: 'left'
  },
});
