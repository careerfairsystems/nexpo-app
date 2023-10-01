import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { ArkadButton } from "components/Buttons";
import { GameEngine } from "react-native-game-engine";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import Food from "./Food";
import Head from "./Head";
import Tail from "./Tail";
import Constants from "./Constants";
import GameLoop from "./systems/GameLoop";
import Colors from "constants/Colors";

export default function Game() {
  const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
  const engine = useRef(null);
  const [isGameRunning, setIsGameRunning] = useState(true);
  const randomPositions = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const resetGame = () => {
    engine.current.swap({
      head: {
        position: [0, 0],
        size: Constants.CELL_SIZE,
        updateFrequency: 10,
        nextMove: 10,
        xspeed: 0,
        yspeed: 0,
        renderer: <Head />,
      },
      food: {
        position: [
          randomPositions(0, Constants.GRID_SIZE - 1),
          randomPositions(0, Constants.GRID_SIZE - 1),
        ],
        size: Constants.CELL_SIZE,
        updateFrequency: 10,
        nextMove: 10,
        xspeed: 0,
        yspeed: 0,
        renderer: <Food />,
      },
      tail: {
        size: Constants.CELL_SIZE,
        elements: [],
        renderer: <Tail />,
      },
    });
    setIsGameRunning(true);
  };
  return (
    <ScrollView style={styles.container}>
        <View style={styles.canvas}>
        <GameEngine
            ref={engine}
            style={{
            width: BoardSize,
            height: BoardSize,
            flex: null,
            backgroundColor: Colors.white,
            borderColor: Colors.arkadOrange,
            borderWidth: 5,
            }}
            entities={{
            head: {
                position: [0, 0],
                size: Constants.CELL_SIZE,
                updateFrequency: 10,
                nextMove: 10,
                xspeed: 0,
                yspeed: 0,
                renderer: <Head />,
            },
            food: {
                position: [
                randomPositions(0, Constants.GRID_SIZE - 1),
                randomPositions(0, Constants.GRID_SIZE - 1),
                ],
                size: Constants.CELL_SIZE,
                renderer: <Food />,
            },
            tail: {
                size: Constants.CELL_SIZE,
                elements: [],
                renderer: <Tail />,
            },
            }}
            systems={[GameLoop]}
            running={isGameRunning}
            onEvent={(e) => {
            switch (e) {
                case "game-over":
                Toast.show({
                    type: "error",
                    text1: "Game over!",
                    visibilityTime: 5000,
                    });
                setIsGameRunning(false);
                return;
            }
            }}
        />
        <View style={styles.controlContainer}>
            <View style={styles.controllerRow}>
            <TouchableOpacity onPress={() => engine.current.dispatch("move-up")}>
                <View style={styles.controlBtn} />
            </TouchableOpacity>
            </View>
            <View style={styles.controllerRow}>
            <TouchableOpacity
                onPress={() => engine.current.dispatch("move-left")}
            >
                <View style={styles.controlBtn} />
            </TouchableOpacity>
            <View style={[styles.controlBtn, { backgroundColor: null }]} />
            <TouchableOpacity
                onPress={() => engine.current.dispatch("move-right")}
            >
                <View style={styles.controlBtn} />
            </TouchableOpacity>
            </View>
            <View style={styles.controllerRow}>
            <TouchableOpacity
                onPress={() => engine.current.dispatch("move-down")}
            >
                <View style={styles.controlBtn} />
            </TouchableOpacity>
            </View>
        </View>
        {!isGameRunning && (
            <TouchableOpacity onPress={resetGame}>
              <ArkadButton style={styles.buttonContainer1}>
                <Text style={styles.buttonText}>
                  Start new game
                </Text>
              </ArkadButton>
            </TouchableOpacity>
        )}
        </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.arkadNavy
  },
  canvas: {
    flex: 1,
    backgroundColor: Colors.arkadNavy,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  controlContainer: {
    marginTop: 10,
  },
  controllerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  controlBtn: {
    backgroundColor: Colors.arkadTurkos,
    width: 75,
    height: 75,
  },
  buttonText: {
    fontFamily: "main-font-bold",
    fontSize: 20,
    color: Colors.white,
  },
  buttonContainer1: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: -20,
    backgroundColor: Colors.arkadGreen
  },
});