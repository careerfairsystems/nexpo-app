import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import Colors from "../constants/Colors";

import { API } from "../api";
import { bookedEvent, Event } from "../api/events";
import {
  CreateTicketDto,
  getTicketForEvent,
  removeTicket,
  Ticket,
} from "../api/tickets";

import { View } from "../components/Themed";
import ScreenActivityIndicator from "../components/ScreenActivityIndicator";
import { ArkadButton } from "../components/Buttons";
import { ArkadText, NoButton } from "../components/StyledText";
import QRCode from "react-native-qrcode-svg";

type EventDetailsScreenParams = {
  route: {
    params: {
      id: number;
    };
  };
};

export default function EventDetailsScreen({
  route,
}: EventDetailsScreenParams) {
  const { id } = route.params;

  const [event, setEvent] = useState<Event | null>(null);
  const [registered, setRegistered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [ticket, setTicket] = useState<Ticket | null>(null);

  const getEvent = async () => {
    const event = await API.events.getEvent(id);
    setEvent(event);
    const reg = event != null && (await bookedEvent(event));
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
        <View style={styles.titleContainer}>
          <ArkadText text={event.name} style={styles.title} />
        </View>
        <View style={styles.headerContainer}>
          <View style={[styles.subHeaderContainer, { flex: 0.7 }]}>
            <View style={styles.leftItem}>
              <Ionicons name="calendar" size={16} color="black" />
              <ArkadText
                text={API.events.formatTime(event.date, event.start, event.end)}
                style={styles.headerText}
              />
            </View>
            <View style={styles.leftItem}>
              <Ionicons name="map" size={16} color="black" />
              <ArkadText text={event.location} style={styles.headerText} />
            </View>
            <View style={styles.leftItem}>
              <MaterialCommunityIcons
                name="microphone"
                size={16}
                color="black"
              />
              <ArkadText text={event.host} style={styles.headerText} />
            </View>
          </View>
          <View style={[styles.subHeaderContainer, { flex: 0.3 }]}>
            <View style={styles.rightItem}>
              <Ionicons name="people" size={16} color="black" />
              <ArkadText
                text={event.ticketCount + "/" + event.capacity}
                style={styles.headerText}
              />
            </View>
            <View style={styles.rightItem}>
              <MaterialIcons name="language" size={16} color="black" />
              <ArkadText text={event.language} style={styles.headerText} />
            </View>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <ArkadText text={event.description} style={styles.description} />
        </View>

        {ticket && registered ? (
          <>
            {ticket.isConsumed ? <NoButton text="Ticket consumed!" style={styles.consumedText}/>
            :<ArkadButton
              onPress={() => deregister()}
              style={styles.bookedButton}
            >
              <ArkadText text="De-register from event" style={styles.title} />
            </ArkadButton>}
            <ArkadText text="Your ticket" style={styles.ticketTitle} />
            <Pressable
              style={styles.qrContainer}
              onPress={() => alert("Ticket to the event")}
            >
              <QRCode size={160} value={ticket.id.toString()} />
            </Pressable>
          </>
        ) : (
          <ArkadButton onPress={createTicket} style={styles.bookButton}>
            <ArkadText text="Register to event" style={styles.title} />
          </ArkadButton>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ticketTitle: {
    color: Colors.darkBlue,
    fontSize: 20,
    marginBottom: 10,
  },
  scrollView: {
    backgroundColor: Colors.white,
  },
  consumedText: {
    alignSelf: "center",
    backgroundColor: Colors.darkBlue,
    marginTop: 40,
    marginBottom: 20,
    fontSize: 16,
    padding: 22,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    width: '90%',
  },
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
  },
  titleContainer: {
    width: "90%",
    marginTop: 20,
    height: 100,
    backgroundColor: Colors.darkBlue,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: "center",
  },
  title: {
    justifyContent: "center",
    fontSize: 16,
  },
  headerContainer: {
    width: "90%",
    marginTop: 24,
    flexDirection: "row",
    alignContent: "center",
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
    color: Colors.black,
    fontSize: 12,
    paddingHorizontal: 8,
    textAlign: "left",
  },
  descriptionContainer: {
    marginTop: 40,
    width: "90%",
  },
  description: {
    color: Colors.black,
    fontSize: 14,
    textAlign: "left",
  },
  bookButton: {
    marginTop: 40,
    width: "90%",
    height: 60,
    padding: 8,
    marginBottom: 20,
    borderRadius: 12,
  },
  bookedButton: {
    backgroundColor: Colors.lightGreen,
    marginTop: 40,
    width: "90%",
    height: 60,
    padding: 8,
    marginBottom: 20,
    borderRadius: 12,
  },
  qrHeader: {
    marginTop: 24,
    fontFamily: "montserrat",
    fontSize: 24,
    color: Colors.darkBlue,
    marginBottom: 8,
  },
  qrContainer: {
    borderWidth: 3,
    borderColor: Colors.lightGray,
    borderRadius: 5,
    padding: 16,
    marginBottom: 60,
  },
});
