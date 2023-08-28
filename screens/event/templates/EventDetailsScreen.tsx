import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Switch,
  Text,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import Colors from "constants/Colors";

import { API } from "api/API";
import { bookedEvent, Event } from "api/Events";
import {
  CreateTicketDto,
  getTicketForEvent,
  removeTicket,
  Ticket,
} from "api/Tickets";

import { View } from "components/Themed";
import ScreenActivityIndicator from "components/ScreenActivityIndicator";
import { ArkadButton } from "components/Buttons";
import { ArkadText, NoButton } from "components/StyledText";
import QRCode from "react-native-qrcode-svg";
import { format, subDays } from "date-fns";
import { Picker } from "@react-native-picker/picker";

export default function EventDetailsScreen(id: number) {
  const [event, setEvent] = useState<Event | null>(null);
  const [registered, setRegistered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [wantTakeaway, setWantTakeaway] = useState(false);
  const initialTimeValue = "12:00:00";
  const [selectedTime, setSelectedTime] = useState(initialTimeValue);

  const lunchTimes = [
    { label: "11:00", value: "11:00:00" },
    { label: "11:15", value: "11:15:00" },
    { label: "12:00", value: "12:00:00" },
    { label: "13:00", value: "13:00:00" },
  ];

  const handleTimeChange = (value: string) => {
    setSelectedTime(value);
  };

  const eventStopSellingDate = () => {
    if (!event?.start) return "N/A";
    const eventTime = new Date(event.date);
    const stopSellingDate = subDays(eventTime, 2);
    return format(stopSellingDate, "d LLL") + " - " + event.start;
  };
  const getEvent = async () => {
    const event = await API.events.getEvent(id);
    setEvent(event);
    const reg = await bookedEvent(event);
    setRegistered(reg);
    if (reg) {
      const ticket = await getTicketForEvent(event);
      setTicket(ticket);
    }
  };

  const createTicket = async () => {
    setLoading(true);

    if (event?.id == undefined) {
      return;
    }

    const ticketRequest: CreateTicketDto = {
      eventId: event.id,
      photoOk: true,
      wantTakeaway: wantTakeaway,
    };

    const ticket = await API.tickets.createTicket(ticketRequest);

    if (ticket) {
      alert("Registered to " + event?.name + " " + event?.date);
      alert(
        "If you have any allergies or food preferences, please update your profile to contain it."
      );

      getEvent();
    } else {
      alert("Could not register to " + event?.name + " " + event?.date);
      getEvent();
    }

    setLoading(false);
  };

  async function deregister(): Promise<void> {
    setLoading(true);
    if (event?.id == undefined) {
      return;
    }

    const ticket: Ticket | null = await getTicketForEvent(event);
    if (ticket == null) {
      alert("You are not booked to " + event?.name + " " + event?.date);
      return;
    }

    const success = await removeTicket(ticket.id);
    if (success) {
      alert(
        "Successfully de-registered from " + event?.name + " " + event?.date
      );
      getEvent();
    } else {
      alert("Could not de-register from " + event?.name + " " + event?.date);
    }
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getEvent();
    setLoading(false);
  }, []);

  if (loading || !event) {
    return <ScreenActivityIndicator />;
  }
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <QrModal />
        <View style={styles.titleContainer}>
          <ArkadText text={event.name} style={styles.title} />
        </View>
        <View style={styles.headerContainer}>
          <View style={[styles.subHeaderContainer, { flex: 0.7 }]}>
            <View style={styles.leftItem}>
              <Ionicons name="calendar" size={16} color="white" />
              <ArkadText
                text={API.events.formatTime(event.date, event.start, event.end)}
                style={styles.headerText}
              />
            </View>
            <View style={styles.leftItem}>
              <Ionicons name="map" size={16} color="white" />
              <ArkadText text={event.location} style={styles.headerText} />
            </View>
            <View style={styles.leftItem}>
              <MaterialCommunityIcons
                name="microphone"
                size={16}
                color="white"
              />
              <ArkadText text={event.host} style={styles.headerText} />
            </View>
          </View>
          <View style={[styles.subHeaderContainer, { flex: 0.3 }]}>
            <View style={styles.rightItem}>
              <Ionicons name="people" size={16} color="white" />
              <ArkadText
                text={event.ticketCount + "/" + event.capacity}
                style={styles.headerText}
              />
            </View>
            <View style={styles.rightItem}>
              <MaterialIcons name="language" size={16} color="white" />
              <ArkadText text={event.language} style={styles.headerText} />
            </View>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <ArkadText text={event.description} style={styles.description} />
        </View>
        {ticket && registered && ticket.event.type === 1 && (
          <View style={styles.takeawayContainer}>
            <ArkadText text="Takeaway " style={styles.title} />
            <Switch
              value={wantTakeaway}
              onValueChange={(value) => setWantTakeaway(value)}
            />
          </View>
        )}
        {wantTakeaway && (
          <View>
            <Text style={styles.timePickerLabel}>Select Pickup Time:</Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedTime}
              onValueChange={(value) => handleTimeChange(value)}
            >
              {lunchTimes.map((timeOption, index) => (
                <Picker.Item
                  key={index}
                  label={timeOption.label}
                  value={timeOption.value}
                />
              ))}
            </Picker>
          </View>
        )}

        {/* ticket.eventType !== EventType.Lunch && ticket.event.eventType !== EventType.Banquet */}
        {ticket && registered ? (
          <>
            {ticket.isConsumed ? (
              <NoButton text="Ticket consumed!" style={styles.consumedText} />
            ) : ticket.event.type !== 1 && ticket.event.type !== 2 ? (
              <View>
                <ArkadButton
                  onPress={() => deregister()}
                  style={styles.bookedButton}
                >
                  <ArkadText
                    text="De-register from event"
                    style={styles.title}
                  />
                </ArkadButton>

                <ArkadText
                  text={`Last date to de-register to this event is: ${eventStopSellingDate()}`}
                  style={{ color: Colors.arkadNavy }}
                />
              </View>
            ) : null}

            <ArkadText text="Your ticket" style={styles.ticketTitle} />
            <Pressable
              style={[
                styles.qrContainer,
                {
                  backgroundColor: Colors.white,
                  borderColor: Colors.arkadTurkos,
                  borderWidth: 4,
                  borderRadius: 14,
                },
              ]}
              onPress={() => setModalVisible(true)}
            >
              <QRCode size={160} value={ticket.code} />
            </Pressable>
          </>
        ) : event.capacity === event.ticketCount ? (
          <NoButton text="No tickets Left :-(" style={styles.consumedText} />
        ) : (
          <>
            <ArkadButton onPress={createTicket} style={styles.bookButton}>
              <ArkadText text="Register to event" style={styles.title} />
            </ArkadButton>
            <ArkadText
              text={`Last date to register to this event is: ${eventStopSellingDate()}`}
              style={{ color: Colors.arkadNavy }}
            />
          </>
        )}
      </View>
    </ScrollView>
  );

  function QrModal() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        style={{ backgroundColor: "transparent" }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View
            style={[
              styles.qrModalContainer,
              {
                backgroundColor: ticket?.isConsumed
                  ? Colors.darkRed
                  : Colors.white,
              },
            ]}
          >
            {ticket && (
              <QRCode
                size={Dimensions.get("window").width * 0.75}
                value={ticket.code}
              />
            )}
          </View>
          <ArkadButton onPress={() => setModalVisible(!modalVisible)}>
            <ArkadText text={"Close"} />
          </ArkadButton>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  ticketTitle: {
    color: Colors.arkadNavy,
    fontSize: 26,
    marginBottom: 10,
    paddingTop: "2rem",
  },
  scrollView: {
    backgroundColor: Colors.arkadNavy,
  },
  consumedText: {
    alignSelf: "center",
    backgroundColor: Colors.darkRed,
    borderRadius: 14,
    borderWidth: 4,
    borderColor: Colors.darkRed,
    marginTop: 40,
    marginBottom: 20,
    fontSize: 20,
    padding: 22,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    width: "90%",
  },
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: Colors.arkadNavy,
    borderColor: Colors.white,
    borderWidth: 4,
    borderRadius: 14,
  },
  titleContainer: {
    width: "90%",
    marginTop: 20,
    height: 100,
    backgroundColor: Colors.arkadTurkos,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: "center",
    borderColor: Colors.arkadTurkos,
    borderWidth: 4,
    borderRadius: 14,
  },
  title: {
    justifyContent: "center",
    fontSize: 24,
    color: Colors.white,
  },
  headerContainer: {
    width: "90%",
    marginTop: 24,
    flexDirection: "row",
    alignContent: "center",
    backgroundColor: Colors.arkadNavy,
  },
  subHeaderContainer: {
    flex: 1,
    flexDirection: "column",
    alignContent: "space-around",
  },
  leftItem: {
    marginTop: 16,
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
  },
  rightItem: {
    marginTop: 16,
    flexDirection: "row-reverse",
    alignSelf: "flex-end",
    alignItems: "center",
  },
  headerText: {
    color: Colors.white,
    fontSize: 16,
    paddingHorizontal: 8,
    textAlign: "left",
  },
  descriptionContainer: {
    marginTop: 40,
    width: "90%",
  },
  description: {
    fontSize: 18,
    textAlign: "left",
    color: Colors.white,
  },
  bookButton: {
    width: "90%",
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: Colors.lightGreen,
  },
  bookedButton: {
    backgroundColor: Colors.darkRed,
    marginTop: 40,
    width: "90%",
    marginBottom: 20,
  },
  qrHeader: {
    marginTop: 24,
    fontSize: 30,
    color: Colors.white,
    marginBottom: 8,
  },
  qrContainer: {
    borderWidth: 3,
    borderColor: Colors.arkadTurkos,
    borderRadius: 5,
    padding: 16,
    marginBottom: 60,
  },
  qrModalContainer: {
    borderRadius: 5,
    padding: 16,
    backgroundColor: Colors.arkadNavy,
  },
  modalOverlay: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  takeawayContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.arkadOrange,
    borderRadius: 10,
  },

  timePickerLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    padding: 10,
  },
  picker: {
    width: "85%",
    maxWidth: 400,
    padding: 10,
    borderRadius: 4,
    borderColor: Colors.white,
    margin: 12,
    backgroundColor: Colors.arkadNavy,
    color: Colors.white,
  },
});
