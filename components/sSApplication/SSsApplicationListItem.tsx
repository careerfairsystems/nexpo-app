import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';

import { SSApplication } from '../../api/sSApplications';
import { ArkadText } from '../StyledText';
import Colors from '../../constants/Colors';
import { API } from '../../api';

type ListedApplicationProps = {
  application: SSApplication;
  onPress: () => void;
}

export const SSListItem = ({ application, onPress }: ListedApplicationProps) => 
  <Pressable onPress={onPress} style={[styles.container]}>
    <View style={styles.headerContainer}>
      <ArkadText style={styles.studentName} text={"student name"}/>
    </View>
    <View style={styles.footerContainer}>
      <ArkadText 
        style={styles.guildAndYear}
        text={"Guild: D, Year 4"} />

      {/* Color of box changes depending on status */}
      {application.status === 1 ? 
      <View 
        style={[
          styles.applicationStatusContainer, 
          {backgroundColor: Colors.lightGreen} ]}>
        <ArkadText 
          style={styles.applicationStatusText}
          text="Accepted" />
      </View> :
      <View style={[
        styles.applicationStatusContainer, 
        application.status === 2
          ? {backgroundColor:Colors.darkRed}
          : {backgroundColor:Colors.darkYellow}
        ]}
      >
        <ArkadText 
          style={styles.applicationStatusText}
          text={application.status === 2 ? "Rejected" : "Pending"} />
      </View>
      }
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
  headerContainer: {
    flex: 1,
  },
  studentName: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
    color: Colors.white,
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    /* Footer is pushed to bottom since header
      has flex: 1. */
    paddingBottom: 4,
  },
  guildAndYear: {
    paddingTop: 4,
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 4,
    paddingRight: 16,
    color: Colors.white,
  },
  applicationStatusContainer: {
    paddingTop: 4,
    alignSelf: 'flex-end',
    borderRadius: 10,
  },
  applicationStatusText: {
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 16,
    color: Colors.white,
  },
})
