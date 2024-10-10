import React, { useEffect } from "react";
import {
  Text,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  Pressable,
} from "react-native";

import { Event, getEvent } from "api/Events";
import Colors from "constants/Colors";
import { EventListItem } from "./EventListItem";
import { API } from "api/API";
import { ArkadText } from "components/StyledText";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import RBSheet from "react-native-raw-bottom-sheet";
import { ArkadButton } from "components/Buttons";
import { is } from "date-fns/locale";
import { getTicketForEvent, removeTicket, Ticket } from "api/Tickets";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";

type EventListProps = {
  events: Event[] | null;
  onPress: (id: number) => void;
  showTickets: boolean;
};

const { width, height } = Dimensions.get("window");

export function EventList({ events, onPress, showTickets }: EventListProps) {
  const [isYesButtonDisabled, setYesButtonDisabled] = React.useState(true);
  const refRBSheet = React.useRef<any>([]);
  const [reload, setReload] = React.useState(false); // State variable to trigger re-render
  const [chosenTicket, selectedTicket] = React.useState<Ticket | null>();

  if (events?.length == 0) {
    return <Text style={styles.text}>No upcoming events</Text>;
  }

  const getTicketsForEvent = async (event: Event) => {
    const ticket = await API.tickets.getTicketForEvent(event);
    const id = ticket?.eventId;
    if (id) return id;
    return null;
  };

  const oddEvent = (index: number) => {
    return index % 2 !== 0;
  };

  // Sort the events so that "Career Room" comes first
  const sortedEvents = events?.sort((a, b) => {
    if (a.name === "Career Room") return -1;
    if (b.name === "Career Room") return 1;
    return 0;
  });

  const handleCrossPress = (index:number) => {
    refRBSheet.current[index]?.open();
  };

  async function deregister(event: Event, index:number): Promise<void> {
    if (event?.id == undefined) {
      return;
    }

    const ticket: Ticket | null = await getTicketForEvent(event);
    if (ticket == null) {
      Toast.show({
        type: "error",
        text1: "You are not booked to the event: " + event?.name,
        visibilityTime: 5000,
      });
      return;
    }

    const success = await removeTicket(ticket.id);
    console.log("Success: ", success);
    if (success) {
      refRBSheet.current[index]?.close();
      Toast.show({
        type: "success",
        text1: "Successfully unregistered from event: " + event?.name,
        visibilityTime: 5000,
      });
      setReload(!reload); // Update the state variable to trigger re-render
    }
  }

  const handleQRPress = async (event: Event, index:number) => {
    refRBSheet.current[index]?.open();
    const ticket = getTicketForEvent(event);
    selectedTicket(await ticket);
  };

  useEffect(() => {
    null;
  }, [reload]);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={sortedEvents}
      extraData={reload} // Re-render the list when the state variable changes
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item: event, index }) => {
        // Get the ticket information for the current event
        const ticket_eventid = getTicketsForEvent(event);
        const qrIndex = 2*index;
        const crossIndex = 2*index+1;

        return (
          <View
            style={[
              styles.eventBox,
              showTickets && styles.eventBoxWithTickets, // Apply different styles when showTickets is true
            ]}
          >
            <View style={styles.eventItemContainer}>
              <EventListItem
                event={event}
                itemStyle={{}}
                onPress={() => onPress(event.id)}
                ticket_eventid={ticket_eventid}
                odd={oddEvent(index)}
              />
              <View>
                <ArkadText style={styles.eventText} text={event.name} />
              </View>
              <View style={styles.infoRow}>
                <MaterialIcons
                  name="date-range"
                  size={24}
                  color={
                    oddEvent(index) ? Colors.arkadOrange : Colors.arkadTurkos
                  }
                />
                <ArkadText
                  style={{
                    ...styles.infoText,
                    color: oddEvent(index)
                      ? Colors.arkadOrange
                      : Colors.arkadTurkos,
                    paddingRight: 10,
                  }}
                  text={API.events.formatTime(
                    event.date,
                    event.start,
                    event.end
                  )}
                />

                <FontAwesome name="cutlery" size={24} color={Colors.white} />
                <ArkadText
                  style={styles.infoText}
                  text={event.ticketCount + "/" + event.capacity}
                />
                {event.capacity === event.ticketCount && (
                  <ArkadText
                    style={styles.infoText}
                    text={"Food tickets sold out. Seats available"}
                  />
                )}
              </View>
            </View>

            {/* Extra 40% section for orange and light blue boxes */}
            {showTickets && (
              <View style={styles.ticketInfoContainer}>
                <View style={styles.QRBox}>
                  <Pressable onPress={() => handleQRPress(event, qrIndex)}>
                    <AntDesign
                      name="qrcode"
                      size={height * 0.08}
                      color={Colors.black}
                    />
                  </Pressable>
                </View>
                <View style={styles.unregisterBox}>
                  <Pressable onPress={() => handleCrossPress(crossIndex)}>
                    <Entypo name="cross" size={height * 0.08} color="black" />
                  </Pressable>
                </View>

                <RBSheet
                  ref={(ref) => (refRBSheet.current[qrIndex] = ref)}
                  useNativeDriver={true}
                  height={height * 0.6}
                  customStyles={{
                    draggableIcon: {
                      backgroundColor: "transparent",
                    },
                    container: {
                      backgroundColor: Colors.arkadNavy,
                    },
                  }}
                  customModalProps={{
                    animationType: "fade",
                    statusBarTranslucent: false,
                  }}
                  customAvoidingViewProps={{
                    enabled: false,
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.qrModalContainer}>
                      <QRCode
                        size={Dimensions.get("window").width * 0.65}
                        value={chosenTicket?.code}
                      />
                    </View>

                    <ArkadText
                      style={{ fontSize: 25, paddingTop: "2%" }}
                      text={`${event.name}`}
                    />
                    <ArkadText
                      style={{ fontSize: 15, fontStyle: "italic" }}
                      text={`Ticket ID: ${chosenTicket?.code}`}
                    />
                    <ArkadButton
                      onPress={() => {
                        refRBSheet.current[qrIndex]?.close();
                        selectedTicket(null);
                      }}
                      style={{
                        width: "75%",
                        backgroundColor: Colors.arkadTurkos,
                        paddingBottom: "2%",
                      }}
                    >
                      <ArkadText text="Close" />
                    </ArkadButton>
                  </View>
                </RBSheet>

                <RBSheet
                  ref={(ref) => (refRBSheet.current[crossIndex] = ref)}
                  useNativeDriver={true}
                  height={height * 0.3}
                  customStyles={{
                    draggableIcon: {
                      backgroundColor: "transparent",
                    },
                    container: {
                      backgroundColor: Colors.arkadNavy,
                    },
                  }}
                  customModalProps={{
                    animationType: "fade",
                    statusBarTranslucent: false,
                  }}
                  customAvoidingViewProps={{
                    enabled: false,
                  }}
                >
                  <View>
                    <ArkadText
                      style={{
                        color: Colors.white,
                        fontSize: 25,
                        fontFamily: "main-font-bold",
                        marginTop: "10%",
                      }}
                      text={`Do you want to unregister from ${event.name}?`}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "90%",
                        alignSelf: "center",
                      }}
                    >


                        <ArkadButton
                          onPress={() => deregister(event, crossIndex)}
                          style={{
                            backgroundColor: Colors.arkadTurkos,
                            width: "45%",
                          }}
                        >
                        <ArkadText text="Yes" /></ArkadButton>
                      <ArkadButton
                        onPress={() => refRBSheet.current[crossIndex]?.close()}
                        style={{ width: "45%" }}
                      >
                        <ArkadText text="Close" />
                      </ArkadButton>
                    </View>
                  </View>
                </RBSheet>
              </View>
            )}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  eventBox: {
    width: width * 0.95,
    height: height * 0.3,
    backgroundColor: Colors.arkadNavy,
    padding: 10, // Adjust padding to align the content
    flexDirection: "column", // Default to column layout when showTickets is false
  },
  eventBoxWithTickets: {
    flexDirection: "row", // Use row layout when showTickets is true
  },
  eventItemContainer: {
    flex: 1.0,
  },
  ticketInfoContainer: {
    flex: 0.4, // Take up 40% of the width
    justifyContent: "space-between", // Evenly space the boxes
    paddingLeft: 5, // Add some padding between the event info and the boxes
  },
  QRBox: {
    flex: 1,
    backgroundColor: Colors.arkadTurkos,
    borderColor: Colors.arkadTurkos,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 10,
    padding: 16,
    borderRadius: 16,
    borderWidth: 4,
  },
  unregisterBox: {
    flex: 1,
    backgroundColor: Colors.arkadOrange,
    borderColor: Colors.arkadOrange,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 10,
    padding: 16,
    borderRadius: 16,
    borderWidth: 4,
  },
  text: {
    paddingTop: 40,
    fontFamily: "main-font-bold",
    fontSize: 32,
    color: Colors.white,
  },
  eventText: {
    paddingLeft: 10,
    fontSize: 20,
    textAlign: "left",
    fontFamily: "main-font-bold",
    color: Colors.white,
    paddingTop: 10, // Space between event box and event name
  },
  infoRow: {
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    textAlign: "left",
    fontFamily: "main-font-bold",
    paddingLeft: 10, // Adjust padding to align text properly
  },
  qrModalContainer: {
    borderRadius: 5,
    borderWidth: 4,
    padding: 16,
    backgroundColor: Colors.white,
    borderColor: Colors.arkadTurkos,
  },
  qrContainer: {},
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
