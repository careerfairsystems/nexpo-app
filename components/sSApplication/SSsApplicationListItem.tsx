import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { SSApplicationDto } from 'api/Applications';
import { ArkadText } from '../StyledText';
import Colors from 'constants/Colors';
import { Programme } from 'api/Students';

type ListedApplicationProps = {
  application: SSApplicationDto;
  onPress: () => void;
}

export const SSListItem = ({ application, onPress }: ListedApplicationProps) => 
  <Pressable onPress={onPress} style={[styles.container]}>
    <View style={styles.left}>
      <ArkadText
        style={styles.studentName}
        text={`${application.studentFirstName} ${application.studentLastName}`}/>
      {application.studentProgramme && <ArkadText 
        style={styles.programAndYear}
        text={Programme[application.studentProgramme].replace("_" , " ").replace("_", " ").replace("_", " ").replace("_", " ")} />}
      {application.studentYear && <ArkadText 
        style={styles.programAndYear}
        text={`Year ${application.studentYear}`} />}
    </View>
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
  </Pressable>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: Colors.darkBlue,
    padding: 16,
    borderRadius: 16,
  },
  left: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headerContainer: {
    flex: 1,
  },
  studentName: {
    flex: 1,
    fontSize: 18,
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
  programAndYear: {
    paddingTop: 2,
    fontSize: 16,
    textAlign: 'left',
    paddingVertical: 4,
    color: Colors.white,
    paddingBottom: 0,
  },
  applicationStatusContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-end',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applicationStatusText: {
    fontSize: 16,
    color: Colors.white,
  },
})
