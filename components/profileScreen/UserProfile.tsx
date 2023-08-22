import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { User } from "api/Users";
import ProfilePicture from "../ProfilePicture";
import { View, Text } from "../Themed";
import { StyleSheet } from "react-native";
import Colors from "constants/Colors";
import { Role } from "api/Role";
import Game from "easter_egg_minigame/Game";
import { ArkadButton } from "components/Buttons";

type UserProfileProps = {
  user: User;
};

export default function UserProfile({ user }: UserProfileProps) {
  const [increment, setIncrement] = React.useState<number>(0);

  function easter_egg(){
    setIncrement(increment + 1);
    console.log("Easter egg: " + increment);
    if (increment === 5) {
      /* Easter egg time */
      return (
        <View>
          <Game/>
          <ArkadButton style={styles.buttonContainer1} onPress={() => {
            setIncrement(0);
          }}>
            <Text style={styles.buttonText}>
              Exit Game
            </Text>
          </ArkadButton>
        </View>
      );
    }
  }

  if (increment === 5){
    return (
      <View>
        <Game/>
        <ArkadButton style={styles.buttonContainer1} onPress={() => {
          setIncrement(0);
        }}>
          <Text style={styles.buttonText}>
            Exit Game
          </Text>
        </ArkadButton>
      </View>
    );
  } else {
    return (
      <>
        <View style={styles.container}>
          <ProfilePicture url={user.profilePictureUrl} />
          <Text
            style={styles.nameLabel}
          >{`${user.firstName} ${user.lastName}`}</Text>
          {Role[user.role] === "Volunteer" ? (
            <Text style={styles.accountTypeText}>ARKAD Volunteer</Text>
          ) : (
            <Text style={styles.accountTypeText}>{Role[user.role]}</Text>
          )}

          <View style={styles.contactInfoContainer}>
            <Ionicons name="mail" size={16} color={Colors.white} />
            <Text style={styles.contactInfoText}>{user.email}</Text>
          </View>
          <View style={styles.contactInfoContainer}>
            <Ionicons name="call" size={16} color={Colors.white} />
            <Text style={styles.contactInfoText}>
              {user.phoneNr ? user.phoneNr : "\u2013"}
            </Text>
          </View>
          <View style={styles.contactInfoContainer}>
            <Ionicons name="restaurant" size={16} color={Colors.white} onPress={easter_egg}/>
            <Text style={styles.contactInfoText}>
              {user.foodPreferences ? user.foodPreferences : "\u2013"}
            </Text>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: Colors.arkadNavy,
  },
  nameLabel: {
    paddingTop: 8,
    fontSize: 32,
    fontFamily: "main-font-bold",
    color: Colors.white,
  },
  contactInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 4,
  },
  contactInfoText: {
    fontSize: 20,
    paddingLeft: 8,
    fontFamily: "main-font-bold",
    color: Colors.white,
  },
  accountTypeText: {
    paddingBottom: 16,
    fontFamily: "main-font-bold",
    color: Colors.white,
    fontSize: 24,
  },
  buttonText: {
    fontFamily: "main-font-bold",
    textAlign: "center",
    fontSize: 20,
    color: Colors.white,
  },
  buttonContainer1: {
    alignSelf: "center",
    padding: "4%",
    marginBottom: "2%",
    width: "45%",
    marginTop: 30
  },
});
