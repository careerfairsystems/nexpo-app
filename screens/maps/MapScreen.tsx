import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, ScrollView, ImageBackground, Text } from 'react-native';
import { MapPreview } from '../../components/maps/MapPreview';
import { Map, EMap, FairMap, KarhusetMap, SC1Map, SC2Map } from '../../components/maps/MapProps';
import { View } from '../../components/Themed';
import { MapStackParamList } from "./MapNavigator";
import { ArkadButton } from '../../components/Buttons';

export type mapNavigation = {
  navigation: StackNavigationProp<MapStackParamList, 'MapScreen'>;
  map: Map;
};

export default function MapScreen({ navigation }: mapNavigation) {
  const imageSource = require('../../assets/images/maps/oversikt.png');

  return (
    <View style={styles.container}>
      <ImageBackground source={imageSource} style={styles.image}>

            <ArkadButton style={styles.karbutton} onPress={function (): void {
                alert("Go to kårhuset");
              } }>
                <Text>Kårhuset</Text>
              </ArkadButton>
            <ArkadButton style={styles.studiebutton} onPress={function (): void {
                alert("Go to studiec");
              } }>
                <Text>Studiec</Text>
              </ArkadButton>
              <ArkadButton style={styles.ebutton} onPress={function (): void {
                alert("Go to ehuset");
              } }>
                <Text>E-building</Text>
            </ArkadButton>




      </ImageBackground>
    </View>
  );

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

  image: {
    flex: 1,
    width: 650,
    resizeMode: 'cover',
    justifyContent: "center",
    zIndex: 1,
    opacity: 1,
    padding: '2%',
  },

  karbutton: {
    position: "absolute",
    width: 120,
    height: 120,
    opacity: 0.7,
    right: 300,
    bottom: 320,
    margin: 0,
  },

  studiebutton: {
    position: "absolute",
    width: 100,
    height: 120,
    opacity: 0.7,
    margin: 0,
    left: 210,
    bottom: 200,
  },

  ebutton: {
    position: "absolute",
    width: 100,
    height: 120,
    opacity: 0.7,
    margin: 0,
    left: 290,
    bottom: 150

  }
})