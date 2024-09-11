import React, { useEffect, useState } from "react";
import { getAllPlaces, ReactCombainLocation, ReactPlace } from "react-native-ai-navigation-sdk";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ArkadButton } from "components/Buttons";
import Colors from "constants/Colors";
export default function ViewAllBuildingsScreen() {
  const [allBuildings, setAllBuildings] = useState<Array<ReactPlace>>([]);

  useEffect(() => {
    fetchBuildings();
  }, []);

  const fetchBuildings = async () => {
    const places = await getAllPlaces();
    setAllBuildings(places);
  };

  const routeToPlace = async (place:ReactPlace)=> {
    const route = await routeToPlace(place)
  }

  return (
    <View style={styles.allBuildingsContainer}>
      <Text style={styles.titleText}>All Buildings</Text>
      <FlatList
        data={allBuildings}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.buildingItem} onPress={()=>routeToPlace}>
            <Text style={styles.buildingText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.buildingId.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFF',
  },
  allBuildingsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.arkadNavy,
    color: '#FFF',

  },
  buildingItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buildingText: {
    fontSize: 18,
    color: '#FFF',

  },
})