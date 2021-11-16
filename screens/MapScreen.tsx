import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { MapPreview } from '../components/maps/MapPreview';
import { Map, EMap, FairMap, KarhusetMap, SC1Map, SC2Map } from '../components/maps/MapProps';
import { View } from '../components/Themed';
import { MapStackParamList } from '../navigation/BottomTabNavigator';

export type mapNavigation = {
  navigation: StackNavigationProp<MapStackParamList, 'MapScreen'>;
  map: Map;
};

export default function MapScreen({ navigation }: mapNavigation) {
  return (
    <View style={styles.scroller}>
      <ScrollView style={styles.scroller}>
        <View style={styles.container}>
          <View style={styles.row}> 
            <MapPreview navigation={navigation} map={FairMap} />
          </View>
          <View style={styles.row}> 
            <MapPreview navigation={navigation} map={KarhusetMap} />
            <MapPreview navigation={navigation} map={EMap} />
          </View>
          <View style={styles.row}> 
            <MapPreview navigation={navigation} map={SC1Map} />
            <MapPreview navigation={navigation} map={SC2Map} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  scroller: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2%'
  },
  row: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})