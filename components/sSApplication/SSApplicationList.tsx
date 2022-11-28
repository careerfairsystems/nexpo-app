import React from 'react';
import { Text, Dimensions, FlatList, StyleSheet, View } from 'react-native';

import { SSApplicationDto } from '../../api/Applications';
import Colors from '../../constants/Colors';
import { SSListItem } from './SSsApplicationListItem';

type ApplicationsListProps = {
  applications: SSApplicationDto[] | null;
  onPress: (application: SSApplicationDto) => void;
}

const { width, height } = Dimensions.get('window')

export function ApplicationsList ({ applications, onPress }: ApplicationsListProps) {
  if(applications?.length == 0 || applications == null) {
    return (
      <Text style={styles.text}> No applications </Text>
    )
  }
  applications.sort((a, b) => a.studentFirstName.localeCompare(b.studentFirstName))
  applications.sort((a, b) => a.status - b.status)

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={applications}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item: application }) => 
        <View style={styles.ssBox}>
          <SSListItem
            key={application.id}
            application={application} 
            onPress={() => onPress(application)} />
        </View>
      }
    />
  )
  
}
const styles = StyleSheet.create({
  ssBox: {
    width: width * 0.95,
  },
  text: {
    paddingTop: 40,
    fontFamily: 'main-font-bold',
    fontSize: 24,
    color: Colors.darkBlue,
  },
});
