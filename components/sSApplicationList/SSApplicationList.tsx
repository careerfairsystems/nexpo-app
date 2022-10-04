import React from 'react';
import { Text, Dimensions, FlatList, StyleSheet, View } from 'react-native';

import { SSApplication } from '../../api/sSApplications';
import Colors from '../../constants/Colors';
import { SSListItem } from './SSsApplicationListItem';

type ApplicationsListProps = {
  applications: SSApplication[] | null;
  onPress: (id: number) => void;
}

const { width, height } = Dimensions.get('window')

export function ApplicationsList ({ applications, onPress }: ApplicationsListProps) {
  if(applications?.length == 0 || applications == null) {
    return (
      <Text style={styles.text}>No applications </Text>
    )
  }

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
            onPress={() => onPress(application.id)} />
        </View>
      }
    />
  )
  
}
const styles = StyleSheet.create({
  ssBox: {
    width: width * 0.85,
    height: height * 0.12,
  },
  text: {
    paddingTop: 40,
    fontFamily: 'montserrat',
    fontSize: 20,
    color: Colors.darkBlue,
  },
});
