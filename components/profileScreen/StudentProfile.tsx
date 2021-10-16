import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { User } from "../../api/users/Users";
import { ArkadText } from "../StyledText";
import { BookedEventList } from "./BookedEventList";
import { EmptyEventItem } from "./EmptyEventItem";
import { Event } from '../../api/events';
import Colors from "../../constants/Colors";

type StudentProfileParams = {
  user: User;
  bookedEvents: Event[] | null;
  openEventDetails: (eventId: number) => void,
}

export const StudentProfile = 
    ({ user, bookedEvents, openEventDetails }: StudentProfileParams) =>
    <View style={styles.container}>
      <View style={styles.top}>
        <ArkadText 
          text={user.firstName + " " + user.lastName} 
          style={styles.name} />
      </View>
        <View style={styles.infoList}>
          <View style={styles.infoItem}>
            <Ionicons name="mail" size={16} color="black"/>
            <ArkadText text={user.email} style={styles.itemText} />
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="call" size={16} color="black"/>
            <ArkadText text={user.phoneNr ? user.phoneNr : '\u2013'} style={styles.itemText}/>
          </View>
        </View>
            
        <ArkadText text={"Booked events"} style={styles.header} />

        <View style={styles.eventList}> 
          {bookedEvents == undefined 
            ? <Text style={{flex: 1}}>Loading events...</Text>
            : bookedEvents.length == 0 
              ? <EmptyEventItem />
              : <BookedEventList
                  bookedEvents={bookedEvents}
                  onPress={openEventDetails} />
          }
      </View>
    </View>
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  top: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  name: {
    paddingTop: '2%',
    fontSize: 24,
    color: Colors.darkBlue,
  },
  infoList: {
    paddingTop: '2%',
  },
  infoItem: {
    paddingTop: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  itemText: {
    color: Colors.darkBlue,
    fontSize: 12,
    paddingHorizontal: 8,
    textAlign: 'center'
  },
  header: {
    paddingTop: '5%',
    paddingLeft: '4%',
    width: '100%',
    textAlign: 'left',
    fontSize: 16,
    color: Colors.darkBlue,
  },
  eventList: {
    paddingTop: '2%',
    alignItems: 'center',
    height: '30%',
    width: '100%',
  },
});
