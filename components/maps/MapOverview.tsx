import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Colors from '../../constants/Colors';
import { ArkadButton } from '../Buttons';


export function MapOverview() {
    const [selectedAreaId, setSelectedAreaId] = useState("");


    return (
        <ImageBackground
        source={imageSource}
        >
            <View>
                <ArkadButton onPress={function (): void {
                    throw new Error('Function not implemented.');
                } }> </ArkadButton>
                <Text>×</Text>
            </View>
        </ImageBackground>
    );

}










const imageSource = require('../../assets/images/maps/oversikt.png');
const MAPPING = [
    {
      id: '0',
      name: 'First Area Name',
      shape: 'rectangle',
      width: 30,
      height: 40,
      x1: 80,
      y1: 500,
      prefill: 'red',
      fill: 'blue'
    },
    {
      id: '1',
      name: 'Second Area Name',
      shape: 'rectangle',
      x2: 155,
      y2: 540,
      x1: 125,
      y1: 500
    },
  ]

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    previewContainer: {
      flex: 1,
      backgroundColor: Colors.darkBlue,
      borderRadius: 10,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    previewText: {
      paddingBottom: 10,
    },
    img: {
      width: 120,
      height: 100,
      resizeMode: 'center'
    }
  })

function onAnyAreaPress(item: any, idx: any, event: any) {
    console.log('Not implemented yet');
}
